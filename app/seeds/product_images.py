from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_product_images():
    product_image_one = ProductImage(
        product_id=1 , url='https://m.media-amazon.com/images/I/71u3LnGdzJL._SL1154_.jpg',
        preview=True 
        )
    product_image_two = ProductImage(
        product_id=2 , url='https://images-ext-1.discordapp.net/external/zzdvu5iJuPx3pFzjq2mzlD_OJjrU_YIZA4IbzrVIspw/%3Fv%3D1706292157%26width%3D600/https/hotoffthepresscomics.com/cdn/shop/products/202008-0000206277.jpg?format=webp&width=399&height=614',
        preview=True
        )
    product_image_three = ProductImage(
        product_id=3 , url='https://weirdsciencemarvelcomics.com/wp-content/uploads/2024/07/x-men-1-featured-image.jpg?w=960',
        preview=True
        )
    product_image_four = ProductImage(
        product_id=4 , url='https://m.media-amazon.com/images/I/41y5UwOsgmL._AC_UF1000,1000_QL80_.jpg',
        preview=True
        )
    product_image_five = ProductImage(
        product_id=5 , url='https://i.etsystatic.com/18403314/r/il/81de8c/3370251830/il_794xN.3370251830_54cy.jpg',
        preview=True
        )
    product_image_six = ProductImage(
        product_id=6 , url='https://cdn.marvel.com/u/prod/marvel/i/mg/1/c0/6467d294959d6/clean.jpg',
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