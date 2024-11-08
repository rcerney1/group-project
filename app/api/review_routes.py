from flask import Blueprint, request
from app.models import db, Review, Product
from flask_login import login_required, current_user
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)


#Create a review
@review_routes.route('/products/<product_id>/reviews', methods=['POST'])
@login_required
def create_review(product_id):
    
    print('\n\n we are in the POST route')
    #check if product exists
    product = Product.query.get(product_id)
    if not product:
        return ({'message': "Product could't be found"})
    
    #check if user already has reviewed product
    existing_review = Review.query.filter_by(product_id=product_id, user_id=current_user.id).first()
    if existing_review:
        return {"message": "User already has a review for this product"}, 403
    
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review(
            product_id=product_id,
            user_id=current_user.id,
            review=form.data['review'],
            stars=form.data['stars'],
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 201
    return {'errors' : form.errors()}, 400

#Get all reviews for a product
@review_routes.route('/products/<product_id>/reviews', methods=['GET'])
def get_product_reviews(product_id):
    print('\n\n we are in the get reviews route\n\n')
    reviews = Review.query.filter_by(product_id=product_id).all()

    if not reviews:
        return {'message': "Product couldn't be found"}, 404
    
    return {'reviews': [review.to_dict() for review in reviews]}

#Update a review
@review_routes.route('/reviews/<review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        return {'message': "Review couldn't be found"}, 404
    
    if review.user_id != current_user.id:
        return {'errors': 'Unauthorized'}, 403
    
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.review = form.data['review']
        review.stars = form.data['stars']

        db.session.commit()
        return review.to_dict(), 200
    
    return {'errors': form.errors()}, 400

#Delete a review

@review_routes.route('/reviews/<review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        return {'message': "Review couldn't be found"}
    db.session.delete(review)
    db.session.commit()
    return {'message': 'Successfully deleted'}, 200

#Get all reviews of current user

@review_routes.route('reviews/current', methods=['GET'])
@login_required
def get_user_reviews():
    user_id = current_user.id
    reviews = Review.query.filter_by(user_id=user_id).all()
    return {'reviews': [review.to_dict() for review in reviews]}, 200