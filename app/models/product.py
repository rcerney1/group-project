from .db import db, environment, SCHEMA, add_prefix_for_prod




class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    price = db.Column(db.Float, nullable=False)
    name = db.Column(db.String(45), nullable=False)
    description = db.Column(db.Text, nullable=False)

     # Relationships
    owner = db.relationship('User', back_populates='products')
    product_images = db.relationship('ProductImage', back_populates='products', cascade="all, delete-orphan")
    favorites = db.relationship('Favorite', back_populates='product', cascade="all, delete-orphan")
    cart_items = db.relationship('CartItem', back_populates='products', cascade="all, delete-orphan")
    reviews = db.relationship('Review', back_populates='products', cascade="all, delete-orphan")

    def to_dict(self, include_details=False, include_all_details=False):
        product_dict = {
            'id': self.id,
            'owner_id': self.owner_id,
            'price': self.price,
            'name': self.name,
            'description': self.description,
        }

        if include_details:
            avg_rating = (
            sum([review.stars for review in self.reviews]) / len(self.reviews)
            if self.reviews else 0
            )
            preview_image = next(
            (image.url for image in self.product_images if image.preview), None
            )
            product_dict.update({
            'avgRating': round(avg_rating, 1),
            'previewImage': preview_image
            })

        if include_all_details:
            product_dict.update({
                'numReviews': len(self.reviews),
                'ProductImages': [image.to_dict() for image in self.product_images],
                'Owner': {
                    'id': self.owner.id,
                    'firstName': self.owner.first_name,
                    'lastName': self.owner.last_name
                    }
            })

        return product_dict