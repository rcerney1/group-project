from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange



class ProductForm(FlaskForm):
    name = StringField('Name', validators=[
        DataRequired(message="Name is required"),
        Length(max=50, message="Name must be less than 50 characters")
    ])
    price = FloatField('Price', validators=[
        DataRequired(message="Price is required"),
        NumberRange(min=0.01, message="Price must be a positive number") 
    ])
    description = TextAreaField('Description', validators=[
        DataRequired(message="Description is required"),
    ])