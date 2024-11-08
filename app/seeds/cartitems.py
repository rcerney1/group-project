from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cartItems():
    item1 = CartItem(
        cart_id=1,  
        product_id=1,  
        quantity=2,
    )
    item2 = CartItem(
        cart_id=1,
        product_id=2,
        quantity=1,
    )
    item3 = CartItem(
        cart_id=2,
        product_id=3,
        quantity=1,
    )
    item4 = CartItem(
        cart_id=2,
        product_id=4,
        quantity=1,
    )
    item5 = CartItem(
        cart_id=3,
        product_id=5,
        quantity=1,
    )
    item6 = CartItem(
        cart_id=3,
        product_id=6,
        quantity=1,
    )

    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.add(item4)
    db.session.add(item5)
    db.session.add(item6)

    db.session.commit()

def undo_cartItems():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_items"))
        
    db.session.commit()
