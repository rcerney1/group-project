from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    product_one = Product(
        owner_id=1, price=25, name='The Amazing Spider-Man',
        description = 'A classic comic featuring Spider-Man in one of his first adventures.')
    product_two = Product(
        owner_id=2, price=30, name='The Dark Knight Returns',
        description='A gritty Batman story from Frank Miller that redefined the character.')
    product_three = Product(
        owner_id=1, price=40, name='X-Men #1', 
        description='The first issue of X-Men, featuring the original team of mutants created by Stan Lee and Jack Kirby.')
    product_four = Product(
        owner_id=2, price=45, name='Watchmen #1', 
        description='The start of the groundbreaking series by Alan Moore and Dave Gibbons.')
    product_five = Product(
        owner_id=3, price=20, name='Superman #75', 
        description='The famous issue where Superman faces off against Doomsday in the Death of Superman storyline.')
    product_six = Product(
        owner_id=3, price=30, name='Iron Man #1', 
        description='The first solo issue featuring Iron Man, a Marvel Comics classic.')

    db.session.add(product_one)
    db.session.add(product_two)
    db.session.add(product_three)
    db.session.add(product_four)
    db.session.add(product_five)
    db.session.add(product_six)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()