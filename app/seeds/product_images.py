from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_product_images():
    product_image_one = ProductImage(
        product_id=1 , url='https://m.media-amazon.com/images/I/71u3LnGdzJL._SL1154_.jpg',
        preview=True 
        )
    product_image_two = ProductImage(
        product_id=2 , url='https://m.media-amazon.com/images/I/71u3LnGdzJL._SL1154_.jpg',
        preview=True
        )
    product_image_three = ProductImage(
        product_id=3 , url='https://m.media-amazon.com/images/I/71u3LnGdzJL._SL1154_.jpg',
        preview=True
        )
    product_image_four = ProductImage(
        product_id=4 , url='https://m.media-amazon.com/images/I/71u3LnGdzJL._SL1154_.jpg',
        preview=True
        )
    product_image_five = ProductImage(
        product_id=5 , url='https://m.media-amazon.com/images/I/71u3LnGdzJL._SL1154_.jpg',
        preview=True
        )
    product_image_six = ProductImage(
        product_id=6 , url='https://m.media-amazon.com/images/I/71u3LnGdzJL._SL1154_.jpg',
        preview=True
        )

    db.session.add(product_image_one)
    db.session.add(product_image_two)
    db.session.add(product_image_three)
    db.session.add(product_image_four)
    db.session.add(product_image_five)
    db.session.add(product_image_six)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))
        
    db.session.commit()