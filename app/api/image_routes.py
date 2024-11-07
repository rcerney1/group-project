from flask import Blueprint, request
from app.models import db, Image
from app.forms import ImageForm
from flask_login import current_user, login_required
from app.api.aws_helper import (
    upload_file_to_s3, get_unique_filename)

image_routes = Blueprint("images", __name__)


@image_routes.route("/", methods=["POST"])
@login_required
def upload_image():
    
    form = ImageForm()
    print("COOKIE:", request.cookies["csrf_token"])
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
          
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return {"errors": [upload]}, 400

        url = upload["url"]
        new_image = Image(image= url)
        db.session.add(new_image)
        db.session.commit()
        return {"url":url}, 200

    if form.errors:
        print(form.errors)
        return form.errors, 400

    return {"message": "Success"}, 200