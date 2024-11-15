from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_product_images():
    product_image_one = ProductImage(
        product_id=1 , url='https://comiccachebucket.s3.amazonaws.com/SpiderMan.jpg',
        preview=True 
        )
    product_image_two = ProductImage(
        product_id=2 , url='https://comiccachebucket.s3.amazonaws.com/BatMan.jpg',
        preview=True
        )
    product_image_three = ProductImage(
        product_id=3 , url='https://comiccachebucket.s3.amazonaws.com/Xmen.jpg',
        preview=True
        )
    product_image_four = ProductImage(
        product_id=4 , url='https://comiccachebucket.s3.amazonaws.com/Watchmen.jpg',
        preview=True
        )
    product_image_five = ProductImage(
        product_id=5 , url='https://comiccachebucket.s3.amazonaws.com/Superman.jpg',
        preview=True
        )
    product_image_six = ProductImage(
        product_id=6 , url='https://comiccachebucket.s3.amazonaws.com/IronMan.jpg',
        preview=True
        )
    product_image_seven = ProductImage(
        product_id=7, url='https://comiccachebucket.s3.amazonaws.com/CaptainAmerica.jpg',
        preview=True
    )
    product_image_eight = ProductImage(
        product_id=8, url='https://comiccachebucket.s3.amazonaws.com/Hulk.jpg',
        preview=True
    )
    product_image_nine = ProductImage(
        product_id=9, url='https://comiccachebucket.s3.amazonaws.com/FantasticFour.jpg',
        preview=True
    )
    product_image_ten = ProductImage(
        product_id=10, url='https://comiccachebucket.s3.amazonaws.com/BatmanDetective.jpg',
        preview=True
    )
    product_image_eleven = ProductImage(
        product_id=11, url='https://comiccachebucket.s3.amazonaws.com/Flash.jpg',
        preview=True
    )
    product_image_twelve = ProductImage(
        product_id=12, url='https://comiccachebucket.s3.amazonaws.com/GreenLantern.jpg',
        preview=True
    )
    db.session.add_all([
        product_image_one, product_image_two, product_image_three, product_image_four, product_image_five,
        product_image_six, product_image_seven, product_image_eight, product_image_nine, product_image_ten,
        product_image_eleven, product_image_twelve,
    ])
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