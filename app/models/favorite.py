from .db import db, environment, SCHEMA, add_prefix_for_prod


class Favorite(db.Model):
    __tablename__ = 'favorites'

    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)

    # Relationships 
    user = db.relationship('User', back_populates='favorites')
    product = db.relationship('Product', back_populates='favorites')
    #it was "pproducts" before

    
    def to_dict(self, include_product=False):
        data = {
            'id': self.id,
            'product_id': self.product_id,
            'user_id': self.user_id,
        }
        if include_product:
            # Ensure the product dictionary has all relevant fields
            product_data = self.product.to_dict(include_details=True)
            data["product"] = product_data


        return data