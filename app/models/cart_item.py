from .db import db, environment, SCHEMA, add_prefix_for_prod



class CartItem(db.Model):
    __tablename__ ='cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)

    # Relationships
    carts = db.relationship("Cart", back_populates="cart_items")
    products = db.relationship("Product", back_populates="cart_items")


    def to_dict(self):
        return {
            "id": self.id,
            "quantity":self.quantity,
            "cart_id":self.cart_id,
            "product_id":self.product_id,
    }



class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
        table_args = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        nullable=False,
        unique=True
    )

    # Relationships
    user = db.relationship("User", back_populates="carts")
    cart_items = db.relationship(
        "CartItem", back_populates="cart", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "cart_items":[item.to_dict() for item in self.cart_items]
        }