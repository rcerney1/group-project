import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import'./ProductDetailsPage.css';
import OpenModalButton from '../OpenModalButton'
import { fetchProductDetails } from "../../redux/product";


function ProductDetailsPage() {
    const dispatch = useDispatch();
    const { productid } = useParams();
    const productDetails = useSelector(state => state.products.productDetails);
    // const reviews = useSelector();
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchProductDetails(productid))
    }, [dispatch, productid])


    if (!productDetails) return <div>Loading...</div>;

    // const userHasPostedReview = reviews.some((review) => review.userId === currentUser?.id);
    // const isProductOwner = currentUser?.id === productDetails.Owner?.id;

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
    
            {/* <div>
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
                            modalComponent={<CreateReviewForm productId={productid} />}
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
                            <div>{review.User?.firstName}</div>
                            <div>
                                {new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </div>
                        </div>
                        <div>{review.review}</div>
                            {currentUser?.id === review.userId && (
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteReviewModal reviewId={review.id} productId={productid} />}
                                
                            />
                        )}
                    </div>
                 ))
        ) : ( 
            <div>Be the first to post a review!</div>
         )}
                </div>
            </div> */}
        </div>
    );
    }
    
    export default ProductDetailsPage;