import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal.jsx'
import { thunkDeleteReview } from "../../redux/reviews.js";
import './DeleteReviewModal.css'

function DeleteReviewModal({ reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    

    const handleDelete = async () => {
        const result = await dispatch(thunkDeleteReview(reviewId));
        
        closeModal();
    };


    return (
        <div className="delete-review-modal">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={handleDelete} className="confirm-delete">Yes, Delete</button>
            <button onClick={closeModal} className="cancel-delete">Cancel</button>
        </div>
    )
}

export default DeleteReviewModal;