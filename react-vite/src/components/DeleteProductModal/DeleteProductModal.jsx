import { useDispatch } from "react-redux";
import { deleteProductById } from "../../redux/products";
import { useModal } from "../../context/Modal";
import './DeleteProductModal.css'

const DeleteProductModal = ({ productId, onDelete }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        await dispatch(deleteProductById(productId));
        if (onDelete) onDelete();  
        closeModal();              
    };

    return (
        <div className="delete-product-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <button onClick={handleDelete} className="confirm-delete">Yes, Delete</button>
            <button onClick={closeModal} className="cancel-delete">Cancel</button>
        </div>
    );
};

export default DeleteProductModal;
