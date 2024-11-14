from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        product_id=1,
        user_id=2,
        review="This was a great comic book!",
        stars=5,
    )
    review2 = Review(
        product_id=2,
        user_id=1,
        review="This was a terrible comic book!",
        stars=1,
    )
    review3 = Review(
        product_id=3,
        user_id=1,
        review="This was a fairly bad comic book!",
        stars=2,
    )
    review4 = Review(
        product_id=4,
        user_id=3,
        review="This was a decent comic book!",
        stars=3,
    )
    review5 = Review(
        product_id=5,
        user_id=1,
        review="This was a good comic book!",
        stars=4,
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
    
    db.session.commit()