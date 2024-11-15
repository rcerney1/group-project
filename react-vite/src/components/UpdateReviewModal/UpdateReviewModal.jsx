import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal.jsx';
import { editReview } from "../../redux/reviews.js";
import { fetchProductDetails } from '../../redux/products.js';
import './UpdateReviewModal.css';

function UpdateReviewModal({ productId, reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    
    const reviewDetails = useSelector(state =>
        state.reviews.reviews.find(review => review.id === reviewId)
    );
    const isLoading = !reviewDetails;

    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [hoveredStars, setHoveredStars] = useState(0);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        if (reviewDetails) {
            setReview(reviewDetails.review);
            setStars(reviewDetails.stars);
        }
    }, [reviewDetails]);

    if (isLoading) return <div>Loading...</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError(null);

        const reviewData = {
            review,
            stars,
            product_id: productId
        };

        const result = await dispatch(editReview(reviewId, reviewData));
        if (result.errors) {
            setServerError(result.errors);
        } else {
            await dispatch(fetchProductDetails(productId));
            closeModal();
        }
    };

    const isSubmitDisabled = review.length < 10 || stars === 0;

    return (
        <div className="review-modal-container">
            <h2>Update Your Review</h2>
            <form onSubmit={handleSubmit}>
                {serverError && (
                    <div className='error-messages'>
                        {serverError.map((error, index) => (
                            <p key={index} className="error">{error}</p>
                        ))}
                    </div>
                )}

                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here..."
                    required
                    minLength={10}
                />

                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onMouseEnter={() => setHoveredStars(star)}
                            onMouseLeave={() => setHoveredStars(0)}
                            onClick={() => setStars(star)}
                            className={star <= (hoveredStars || stars) ? 'filled' : 'empty'}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitDisabled}
                    className={isSubmitDisabled ? 'disabled' : ''}
                >
                    Update Review
                </button>
            </form>
        </div>
    );
}

export default UpdateReviewModal;
