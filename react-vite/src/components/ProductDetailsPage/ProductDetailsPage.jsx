import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import'./ProductDetailsPage.css';
import OpenModalButton from '../OpenModalButton'
import CreateReviewModal from "../CreateReviewModal/CreateReviewModal.jsx";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal.jsx";
import { fetchProductDetails, fetchProducts } from "../../redux/products.js";
import { fetchProductReviews } from "../../redux/reviews.js";
import { addCartItemThunk} from "../../redux/cart.js";
import { clearProductDetails } from "../../redux/products.js";


function ProductDetailsPage() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const productDetails = useSelector(state => state.products.productDetails);
    const reviews = useSelector(state => state.reviews.reviews);
    console.log('REVIEWS', reviews)
    const currentUser = useSelector(state => state.session.user);
    console.log('CurrentUser', currentUser)
    console.log('ProductDetails', productDetails)
    const navigate = useNavigate();
       
    useEffect(() => {
        dispatch(fetchProductDetails(productId))
        dispatch(fetchProductReviews(productId))
        dispatch(fetchProducts());
        return () => {
            dispatch(clearProductDetails())
        }
    }, [dispatch, productId])


    if (!productDetails) return <div>Loading...</div>;

    const userHasPostedReview = reviews.some((review) => review.user_id === currentUser?.id);
    const isProductOwner = currentUser?.id === productDetails.Owner?.id;

    const handleAddtoCartClick = () => {
        // alert("Feature Coming Soon..."); 
        dispatch(addCartItemThunk(productId))
        .then(navigate('/cart'))
      };

    return (
        <div className="product-detail-content-container">
        <div className="product-detail-page-whole">
        <div className="product-detail-upper">
        <div className="product-detail-imgs">
            <div className="product-detail-img-wrapper">
                <img className="product-detail-preview-img"
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
        </div>    
            <div className="product-detail-info">
                    <h3>{productDetails.name}</h3> 
                    <div>Sold by {productDetails.Owner.firstName} {productDetails.Owner.lastName}</div>
                    <div>${productDetails.price}</div>
                    <div><button onClick={handleAddtoCartClick}>Add to Cart</button></div>
                    <div>{productDetails.description}</div>
            </div>
        </div>   
            <div>

                <h3>Ratings and Reviews</h3>
                
                <div>

                    <div>
                        
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
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) 
                    .map((review) => (
                    <div key={review.id}>
                        <div>
                            <div>{review.user?.first_name}</div>
                            <div>
                                {new Date(review.created_at).toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </div>
                        </div>
                        <div>{review.review}</div>
                            {currentUser?.id === review.user_id && (
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteReviewModal reviewId={review.id} productId={productId} />}
                                
                            />
                        )}
                        <hr />
                    </div>
                 ))
        ) : ( 
            <div>Be the first to post a review!</div>
         )}
                </div>
            </div>
        </div>
        </div>
    );
    }
    
    export default ProductDetailsPage;