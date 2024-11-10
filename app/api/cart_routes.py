from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Cart, CartItem, Product


cart_routes = Blueprint('carts', __name__)


def get_cart():
    '''
    helper function to get the current user's cart
    if the cart does not exist, create a new cart
    '''
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    if not cart:
        cart = Cart(user_id=current_user.id)
        db.session.add(cart)
        db.session.commit()
    return cart




@cart_routes.route('/', methods=['GET'])
@login_required
def view_cart():
    '''
    Get all items in current user's cart
    '''
    cart = get_cart()
    return cart.to_dict()




@cart_routes.route('/items', methods=['POST'])
@login_required
def add_item():
    '''
    Add a new item to cart
    increment quantity if item already exists in cart
    '''




@cart_routes.route('/items/<int:item_id>', methods=['PUT'])
@login_required
def update_item(item_id):
    '''
    Update cart item quantity
    '''





@cart_routes.route('/items/<int:item_id>',methods=['DELETE'])
@login_required
def remove_item(item_id):
    '''
    Remove an item from cart
    '''
    cart = get_cart()
    cart_item = CartItem.query.get(item_id)
    
    if not cart_item:
        return {'message': 'Cart item not found'}, 404
    
    # check if the cart item belongs to the current user
    if not cart_item.carts.user_id == current_user.id:
        return {'message':'forbidden'}, 403
    
    db.session.delete(cart_item)
    db.session.commit()

    return {'message':'Item removed successfully', 'cart': cart.to_dict()}, 200



@cart_routes.route('/checkout', methods=['POST'])
@login_required
def checkout_cart():
    '''
    Complete purchase (clear all items from the cart)
    '''
    cart = get_cart()

    if not cart.cart_items:
        return {'message': 'Cart is empty'}, 400
    
    for item in cart.cart_items:
        db.session.delete(item)
    
    db.session.commit()

    return {'message': 'Purchase completed successfully'},200 