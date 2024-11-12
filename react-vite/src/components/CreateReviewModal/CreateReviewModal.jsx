import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal.jsx'
import { thunkCreateReview } from "../../redux/reviews.js";
import './CreateReviewModal.css'

function CreateReviewModal({ productId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [hoveredStars, setHoveredStars] = useState(0);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        setReview("");
        setStars(0);
        setHoveredStars(0);
        setServerError(null);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError(null);

        const reviewData = {
            review,
            stars
        }

        const result = await dispatch(thunkCreateReview(productId, reviewData));
        if (result.errors) {
            console.log(result.errors)
            setServerError(result.errors)
        } else {
            closeModal();
        }
    };

    const isSubmitDisabled = review.length < 10 || stars === 0;

    
    

    return (
        <div className="review-modal-container">
            <h2>Share Your Thoughts</h2>
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

                <button type="submit" disabled={isSubmitDisabled}>Submit Review</button>
            </form>
        </div>
    );
}

export default CreateReviewModal;