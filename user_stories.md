# User Stories
# Users
# Sign Up
- As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
    - When I'm on the /signup page:
        - I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
        * I would like the website to log me in upon successful completion of the sign-up form.
            * So that I can seamlessly access the site's functionality
    - When I enter invalid data on the sign-up form:
        - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    - So that I can try again without needing to refill forms I entered valid data into.
- Log in
    - As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
        - When I'm on the /login page:
            - I would like to be able to enter my email and password on a clearly laid out form.
            - I would like the website to log me in upon successful completion of the log-in form.
                - So that I can seamlessly access the site's functionality
    - When I enter invalid data on the log-in form:
        - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
            - So that I can try again without needing to refill forms I entered valid data into.
- Demo User
    - As an unregistered and unauthorized user, I would like an easy to find and clear button on both the /signup and /login pages to allow me to visit the site as a guest without signing up or logging in.
        - When I'm on either the /signup or /login pages:
            - I can click on a Demo User button to log me in and allow me access as a normal user.
                - So that I can test the site's features and functionality without needing to stop and enter credentials.
- Log Out
    - As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
        - While on any page of the site:
            - I can log out of my account and be redirected to a page displaying products.
                - So that I can easily log out to keep my information secure.

# Products
# Create Products
    - As a registered user I should be able to create new products
# View Products
    - As a registered and unregistered user i should be able to view all products on the home screen:
        - Product List will have a category option to filter the products that are displayed:
            - Categories will include: (TBD)
        - Each product should be in a product tile that I can click that will direct me to the product detail page
            - Product tile will have:
                - Product Name
                - Review score
                - Price
# Update Products
    - As a registered user and owner of the product I should be able to update my products details:
        - price, images, description, product details such as name etc.
# Delete Products
    - As a registered user and owner of the product I should be able to delete my product

# Reviews
# Create Reviews
    - As an unregistered user, I will not be able to create reviews for a product
    - As a registered user, I can add reviews to all products that are not my own
    - Each user can add on review per product
    - on product detail page, under list of reviews:
        - When I have not submitted submited a review for a product, a submit review button should give me the option to write a review:
            - upon clicking option, a review module should display on screen: 
                - Includes title prompting review, atext area, stars 1-5 to give a rating, and a submit review button
                    - upon submit, a new review will be created

# View Reviews
    - As a registered and unregistered user, I will be able to see all reviews for a product on that products detail page:
        - There will be a heading for Ratings and Reviews with an average rating under
        - There will be a list of all reviews that show the rating, review, date reviewed, and username of the person who submitted the review
    - As a registered user:
        - If I do not own the product and have no submitted a review, under the list of reviews there should be a button to submit a review
        - If I own the product, have submitted a review before, or am not a registered user, there should be no option to submit a review
        - If I have a review submitted, there will be an option to delete or update the review
# Update Reviews
# (Option for now)
    - As a registered user, I will be able to update reviews on products that I have made:
        - On a products detail page, there will be a button to update reviews:
            - button will prompt an update module that is similar to create review module:
                - text area and rating will be autofilled as the current review
# Delete Reviews
    - As a registered user, I will be able to delete reviews on products that I have made
        - On a products detail page, there will be a button to delete reviews:
            - button will prompt an update module that will ask to confirm deletion.

# Shopping Cart
# View Products in Shopping Cart
    - As a registered user, I will be able to view all products in my shopping cart
        - When logged in, a shopping cart icon will display on navigation bar that will direct me to shopping cart.
            - Shopping cart page will list all items I have stored in my cart as a list of tiles:
                - tile will display name of product, an image, quantity, and price
                - there will be an option to change quantity or delete from cart.
            - Under tiles will be a total and a checkout option
# Adding/Removing from Shopping Cart
    - Add item to shopping cart:
        - As a registered user, each product will have an option to add to my cart on the product detail page: 
            - adding to cart will redirect to shopping cart page:
                - I will option to change the quantity and checkout item
    - Remove item from shopping cart:
        - On shopping cart page I will have the option to remove any items I have in my cart via a delete button:
            - delete button will prompt delete module that asks to confirm deletion
# Perform Transaction
    - As a registered user, I will be able to checkout items in my shopping cart:
        - checking out will redirect me to a page that confirms my purchase.


 
