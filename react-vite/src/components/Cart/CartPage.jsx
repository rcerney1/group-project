
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link} from "react-router-dom";
import { getCartThunk,} from '../../redux/cart';


import "./CartPage.css";

function CartPage() {
  const dispatch = useDispatch();
  const cartObj = useSelector((state) => state.cart?.cartItems);

  const cartArr = cartObj ? Object.values(cartObj) : [];

  const user = useSelector((state) => state.session.user.username)


  useEffect(() => {
    // Load the cart when the component mounts
    dispatch(getCartThunk());
}, [dispatch]);



  if (cartArr.length === 0) {
    return (
      <main>
        <div>
          <h2>Your cart is empty</h2>
          <Link to="/">Discover products!</Link>
        </div>

        <div>
            <h1>cart item show here!</h1>
            <p>{user}</p>
        </div>

      </main>
    );
  }

}
export default CartPage;