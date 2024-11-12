import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCartThunk, checkoutCartThunk } from "../../redux/cart";
import { fetchProducts } from "../../redux/products";
import "./CartPage.css";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart?.cartItems);
  const products = useSelector((state) => state.products?.allProducts);
  const cartArr = cartItems ? Object.values(cartItems) : [];
  const productsArr = products ? Object.values(products) : [];

  const cartProducts = cartArr.map((cartItem) => ({
    ...productsArr.find((product) => product.id === cartItem.product_id),
    quantity: cartItem.quantity,
  }));

  const calculateTotal = () => {
    return cartProducts
      .reduce((total, item) => {
        if (item) {
          return total + Number(item.price) * Number(item.quantity);
        }
        return total;
      }, 0)
      .toFixed(2);
  };

  useEffect(() => {
    dispatch(getCartThunk());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCheckout = () => {
    dispatch(checkoutCartThunk());
    navigate("/checkout");
  };

  if (cartArr.length === 0) {
    return (
      <main>
        <div>
          <h2>Your cart is empty</h2>
          <Link to="/">Discover products!</Link>
        </div>
      </main>
    );
  }

  if (!cartProducts) return <div>Loading...</div>;


  return (
    <main>
      <div>
        <h1>
          {cartArr.length === 1
            ? `1 item in your cart`
            : `${cartArr.length} items in your cart`}
        </h1>
      </div>

      {cartProducts.map((product) => (
        <div key={product.id} className="cart-item">
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      ))}

      <div>
        <h2>Total: ${calculateTotal()}</h2>
      </div>
      <button onClick={() => navigate("/products")}>Continue Shopping</button>
      <button onClick={handleCheckout}>Checkout</button>
    </main>
  );
}

export default CartPage;
