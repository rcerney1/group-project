import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import'./ProductDetailsPage.css';
import OpenModalButton from '../OpenModalButton'
import CreateReviewModal from "../CreateReviewModal/CreateReviewModal.jsx";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal.jsx";
import { fetchProductDetails } from "../../redux/products.js";
import { fetchProductReviews } from "../../redux/reviews.js";


function ProductDetailsPage() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const productDetails = useSelector(state => state.products.productDetails);
    const reviews = useSelector(state => state.reviews.reviews);
    console.log('REVIEWS', reviews)
    const currentUser = useSelector(state => state.session.user);
    console.log('CurrentUser', currentUser)
    console.log('ProductDetails', productDetails)
    useEffect(() => {
        dispatch(fetchProductDetails(productId))
        dispatch(fetchProductReviews(productId))
    }, [dispatch, productId])


    if (!productDetails) return <div>Loading...</div>;

    const userHasPostedReview = reviews.some((review) => review.user_id === currentUser?.id);
    console.log("user has posted a review", userHasPostedReview)
    const isProductOwner = currentUser?.id === productDetails.Owner?.id;

    const handleAddtoCartClick = () => {
        alert("Feature Coming Soon..."); 
      };
    return (
        <div>
            <h2>{productDetails.name}</h2> 
            <div>
                <img
                    src={productDetails.ProductImages[0]?.url} 
                    alt={productDetails.name} 
                />
    
                <div>
                    {productDetails.ProductImages.slice(1).map((image) => (
                        <img 
                            key={image.id} 
                            className="thumbnail" 
                            src={image.url} 
                            alt="Product Thumbnail" 
                        />
                    ))}
                </div>
            </div>
            <div>
                <div>
                    <div>
                        Sold by {productDetails.Owner.firstName} {productDetails.Owner.lastName}
                    </div>
                    <div>{productDetails.description}</div>
                </div>
                <div>
                    <div>
                        <div>${productDetails.price}</div>
                        <div>
                            <div>
                                <span>★</span> 
                                {productDetails.avgRating ? productDetails.avgRating.toFixed(1) : 'New'} 
                                {productDetails.numReviews > 0 && (
                                    <>
                                        <span> · </span>
                                        {productDetails.numReviews === 1 ? "1 Review" : `${productDetails.numReviews} Reviews`}
                                    </>
                                )}
                            </div>
                        </div>
                        <button onClick={handleAddtoCartClick}>Add to Cart</button>
                    </div>
                </div>
            </div>
            <hr/>
    
            <div>
                <h3>Reviews</h3>
                <div>
                    <div>
                        <span>★</span> 
                        {productDetails.avgRating ? productDetails.avgRating.toFixed(1) : 'New'} 
                        {productDetails.numReviews > 0 && (
                            <>
                                <span> · </span>
                                {productDetails.numReviews === 1 ? "1 Review" : `${productDetails.numReviews} Reviews`}
                            </>
                        )}
                    </div>
                </div>
                <div>
                    {currentUser && !userHasPostedReview && !isProductOwner && (
                        <OpenModalButton
                            buttonText="Post Your Review"
                            modalComponent={<CreateReviewModal productId={productId} />}
                            onModalClose={() => {}}
                        />
                    )}
                </div>
    
                <div>
                    {Array.isArray(reviews) && reviews.length > 0 ? (
                    reviews
                    .slice() 
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
                    .map((review) => (
                    <div key={review.id}>
                        <div>
                            <div>{review.user?.first_name}</div>
                            <div>
                                {new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </div>
                        </div>
                        <div>{review.review}</div>
                            {currentUser?.id === review.user_id && (
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteReviewModal reviewId={review.id} productId={productId} />}
                                
                            />
                        )}
                    </div>
                 ))
        ) : ( 
            <div>Be the first to post a review!</div>
         )}
                </div>
            </div>
        </div>
    );
    }
    
    export default ProductDetailsPage;