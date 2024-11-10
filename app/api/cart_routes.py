from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Cart, CartItem, Product


cart_routes = Blueprint('carts', __name__)


def get_cart():
    '''
    Helper function to get the current user's cart
    If the cart does not exist, create a new cart
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
    Increment quantity if item already exists in cart
    '''
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1) # default quantity is 1


    if not product_id:
        return {'message': 'Product ID is required'}, 400
    
    if quantity < 1:
        return {'message': 'Quantity must be greater than 0'}, 400
    
    product = Product.query.get(product_id)
    if not product:
        return {'message': 'Product not found'}, 404

    cart = get_cart()

    cart_item = CartItem.query.filter(
        CartItem.cart_id == cart.id,
        CartItem.product_id == product_id
    ).first()

    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = CartItem(cart_id=cart.id, product_id=product_id, quantity=quantity)
        db.session.add(cart_item)
    
    db.session.commit()
    return {'message': 'Item added to cart', 'cart': cart.to_dict()}, 201




@cart_routes.route('/items/<int:item_id>', methods=['PUT'])
@login_required
def update_item_quantity(item_id):
    '''
    Update cart item quantity
    '''
    cart = get_cart()
    cart_item = CartItem.query.get(item_id)
    
    if not cart_item:
        return {'message': 'Cart item not found'}, 404
    
    # check if the cart item belongs to the current user
    if cart_item.cart_id != cart.id:
        return {'message':'Forbidden'}, 403
    
    data = request.get_json()
    new_quantity = data.get('quantity')

    if new_quantity is None or new_quantity < 1:
        return {'message': 'Invalid quantity'}, 400
    
    cart_item.quantity = new_quantity
    db.session.commit()

    return {'message': 'Item quantity updated successfully', 'cart': cart.to_dict()}, 200



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
    if cart_item.carts.user_id != current_user.id:
        return {'message':'Forbidden'}, 403
    
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