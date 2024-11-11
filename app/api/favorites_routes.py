from flask import Blueprint, jsonify, request
from app.models import db, Favorite, Product
from flask_login import current_user, login_required


favorites_routes = Blueprint('favorites', __name__)

#Get all Favorited Products
@favorites_routes.route('/', methods=['GET'])
@login_required
def get_all_favorites():
    print("\n Route reached!\n")
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()

    if not favorites:
        print("\nNo favorites found for the current user.\n")
        return jsonify([]), 200

    
    # Convert each favorite to a dictionary, including product details
    favorites_list = [favorite.to_dict(include_product=True) for favorite in favorites]

    print("\n favorites_list:  \n", favorites_list, "\n")
    return jsonify(favorites_list), 200



@favorites_routes.route('/<int:product_id>', methods=['POST'])
@login_required
def add_favorite(product_id):
    """Add a product to favorites for the current user."""
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    # Check if the product is already favorited by this user
    existing_favorite = Favorite.query.filter_by(user_id=current_user.id, product_id=product_id).first()
    if existing_favorite:
        return jsonify({"message": "Product is already in favorites"}), 400

    # Add new favorite for the current user
    new_favorite = Favorite(user_id=current_user.id, product_id=product_id)
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify(new_favorite.to_dict()), 201



@favorites_routes.route('/<int:favorite_id>', methods=['DELETE'])
@login_required
def delete_favorite(favorite_id):
    """Delete a favorite by ID for the current user."""
    favorite = Favorite.query.filter_by(id=favorite_id, user_id=current_user.id).first()
    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404

    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"message": "Favorite deleted"}), 200



#---------------------------------------------------------------------------
    # {
    #   "email": "demo@aa.io",
    #   "password": "password"
    # }