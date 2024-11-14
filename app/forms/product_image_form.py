from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, URL



class ProductImageForm(FlaskForm):
    url = StringField('URL', validators=[
        DataRequired(message="URL is required"),
        URL(message="Must be a valid URL")
    ])
    preview = BooleanField('Preview', default=True)