import { useDispatch } from "react-redux";
import { checkoutCartThunk } from "../../redux/cart";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './ConfirmCheckout.css'

const ConfirmCheckout= () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();


    const handleCheckout = () => {
        dispatch(checkoutCartThunk());
        closeModal()
        navigate("/checkout");
      };

    return (
        <div className="confirm-checkout-modal">
            <h2>Submit Order</h2>
            <p>Are you ready to submit your order?</p>
            <button onClick={handleCheckout} className="confirm-checkout">Yes, Submit</button>
            <button onClick={closeModal} className="cancel-delete">Cancel</button>
        </div>
    );
};

export default ConfirmCheckout;
