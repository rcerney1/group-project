import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getCartThunk,
  checkoutCartThunk,
  updateItemQuantityThunk,
  removeCartItemThunk,
} from "../../redux/cart";
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
    item_id: cartItem.id,
  }));

  const calculateTotal = () =>
    cartProducts.reduce(
      (total, item) => total + (item ? Number(item.price) * item.quantity : 0),
      0
    ).toFixed(2);
  

  useEffect(() => {
    dispatch(getCartThunk());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCheckout = () => {
    dispatch(checkoutCartThunk());
    navigate("/checkout");
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    dispatch(updateItemQuantityThunk(itemId, newQuantity));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeCartItemThunk(itemId));
  };

  if (cartArr.length === 0) {
    return (
      <main className="cart-page-empty">
        <div>
          <h2>Your cart is empty</h2>
          <Link to="/">Add a little super to your cart!📚</Link>
        </div>
      </main>
    );
  }

  if (!cartProducts) return <div>Loading...</div>;

  return (
    <main className="cart-page-container">
      <div>
        <h1>
          {cartArr.length === 1
            ? `1 item in your cart`
            : `${cartArr.length} items in your cart`}
        </h1>
      </div>

      {cartProducts.map((product) => (
        <div key={product.id} className="cart-item">
          <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
          </Link>
          <img src={product.previewImage} alt={product.name}  className="cart-item-img" />
          <p>Price: ${product.price}</p>
          <p>
            Quantity:
            <select
              value={product.quantity}
              onChange={(e) =>
                handleQuantityChange(product.item_id, Number(e.target.value))
              }
            >
              {[...Array(10).keys()].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </p>
          <button className="cart-item-remove" onClick={() => handleRemoveItem(product.item_id)}>
            Remove
          </button>
        </div>
      ))}

      <div className="cart-footer">
        <h2>Total: ${calculateTotal()}</h2>
        <button className="continue-button" onClick={() => navigate("/")}>Continue Shopping</button>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      </div>

    </main>
  );
}

export default CartPage;
