from flask import Blueprint, jsonify, request
from app.models import db, Product, Review, ProductImage
from flask_login import login_required, current_user


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
@product_routes.route('/', methods=['POST'])
@login_required
def create_product():
    print(request)
    data = request.get_json()

    errors = {}
    if not data.get('name') or len(data['name']) > 50:
        errors['name'] = "Name must be less than 50 characters"
    if not data.get('description'):
        errors['description'] = "Description is required"
    if not isinstance(data.get('price'), (int, float)) or data['price'] <= 0:
        errors['price'] = "Price must be a positive number"

    if errors:
        return jsonify({"message": "Bad Request", "errors": errors}), 400
    
    new_product = Product(
        owner_id=current_user.id,
        name=data['name'],
        description=data['description'],
        price=data['price'],
        )

    db.session.add(new_product)
    db.session.commit()

    return jsonify(new_product.to_dict()), 201 

#Edit a Product
@product_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def edit_product(product_id):

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product couldn't be found"}), 404
    
    if product.owner_id is not current_user.id:
        return jsonify({"message": "Unauthorized"}), 403
    
    data = request.get_json()

    errors= {}
    if not data.get('name') or len(data['name']) > 50:
        errors['name'] = "Name must be less than 50 characters"
    if not data.get('description'):
        errors['description'] = "Description is required"
    if not isinstance(data.get('price'), (int, float)) or data['price'] <= 0:
        errors['price'] = "Price must be a positive number"

    if errors:
        return jsonify({"message": "Bad Request", "errors": errors}), 400
    
    product.name = data['name']
    product.description = data['description']
    product.price = data['price']
    
    db.session.commit()

    return jsonify(product.to_dict()), 200

#Add a Product Image
@product_routes.route('/<int:product_id>/images', methods=['POST'])
@login_required
def add_product_image(product_id):

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product coudln't be found"}), 404
    
    if product.owner_id is not current_user.id:
        return jsonify({"message": "Unauthorized"}), 403
    
    data = request.get_json()

    if not data.get('url'):
        return jsonify({"message": "Bad Request", "errors": {"url": "URL is required"}})
    
    new_image = ProductImage(
        product_id=product_id,
        url=data['url'],
        preview=data['preview']
    )

    db.session.add(new_image)
    db.session.commit()

    return jsonify(new_image.to_dict()), 201

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