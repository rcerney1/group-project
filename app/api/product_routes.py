from flask import Blueprint, jsonify, request
from app.models import db, Product, ProductImage
from app.forms import ProductForm, ProductImageForm
from flask_login import login_required, current_user
from .aws_helpers import upload_file_to_s3, remove_file_from_s3


product_routes = Blueprint('products', __name__)

#Get all Products
@product_routes.route('/', methods=['GET'])
def get_all_products():
    """
    Fetch all products with their avgRating and previewImage
    """
    products = Product.query.all()
    return jsonify({"Products": [product.to_dict(include_details=True) for product in products]}), 200

#Get all Products owned by the Current User
@product_routes.route('/current', methods=['GET'])
@login_required
def get_current_user_products():
    products = Product.query.filter_by(owner_id=current_user.id).all()

    products_list = [product.to_dict(include_details=True) for product in products]

    return jsonify({"Products": products_list}), 200

#Get all Products by productId
@product_routes.route('/<int:product_id>', methods=['GET'])
def get_product_details(product_id):

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product couldn't be found"}), 404
    
    return jsonify(product.to_dict(include_details=True, include_all_details=True)), 200

#Create Product
@product_routes.route('', methods=['POST'])
@login_required
def create_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_product = Product(
            owner_id=current_user.id,
            name=form.name.data,
            description=form.description.data,
            price=form.price.data,
            category=form.category.data
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product.to_dict()), 201
    return jsonify({"message": "Bad Request", "errors": form.errors}), 400 

#Edit a Product
@product_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def edit_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product couldn't be found"}), 404
    if product.owner_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product.name = form.name.data
        product.description = form.description.data
        product.price = form.price.data
        product.category=form.category.data
        db.session.commit()
        return jsonify(product.to_dict()), 200

    return jsonify({"message": "Bad Request", "errors": form.errors}), 400

#Add a Product Image
@product_routes.route('/<int:product_id>/images', methods=['POST'])
@login_required
def add_product_image(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product couldn't be found"}), 404
    if product.owner_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    form = ProductImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        file = form.image.data
        upload_response = upload_file_to_s3(file)

        if "error" in upload_response:
            return jsonify({"message": "Error uploading file", "error": upload_response["error"]}), 400

        # Save the new image to the database
        new_image = ProductImage(
            url=upload_response["url"],
            product_id=product_id,
            preview=form.preview.data
        )
        db.session.add(new_image)
        db.session.commit()

        return jsonify(new_image.to_dict()), 201

    return jsonify({"message": "Bad Request", "errors": form.errors}), 400

#Update a Product Image
@product_routes.route('/<int:product_id>/images/<int:product_image_id>', methods=['PUT'])
@login_required
def update_product_image(product_id, product_image_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product not found"}), 404

    image = ProductImage.query.filter_by(id=product_image_id, product_id=product_id).first()
    if not image:
        return jsonify({"message": "Image not found"}), 404

    form = ProductImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        file = form.image.data
        upload_response = upload_file_to_s3(file)

        if "error" in upload_response:
            return jsonify({"message": "Error uploading file", "error": upload_response["error"]}), 400

        remove_file_from_s3(image.url)

        image.url = upload_response["url"]
        image.preview = form.preview.data
        db.session.commit()

        return jsonify(image.to_dict()), 200

    return jsonify({"message": "Bad Request", "errors": form.errors}), 400

#Delete a Product Image
@product_routes.route('/images/<int:product_image_id>', methods=['DELETE'])
@login_required
def delete_product_image(product_image_id):

    product_image = ProductImage.query.get(product_image_id)

    if not product_image:
        return jsonify({"message": "Product Image couldn't be found"}), 404
    
    product = Product.query.get(product_image.products.id)
    if not product or product.owner_id is not current_user.id:
        return jsonify({"message": "Unauthorized"}), 403
    
    remove_file_from_s3(product_image.url)

    db.session.delete(product_image)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"}), 200

#Delete a Product
@product_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def delete_product(product_id):

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product couldn't be found"}), 404
    
    if product.owner_id is not current_user.id:
        return jsonify({"message": "Unauthorized"}), 403
    
    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"}), 200

#Get product by category
@product_routes.route('/category/<int:category_id>', methods=['GET'])
def get_products_by_category(category_id):
    products = Product.query.filter_by(category=category_id).all()
    return jsonify({"Products": [product.to_dict(include_details=True) for product in products]}), 200
