import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./PurchaseConfirm.css";

export default function PurchasePage() {
  const user = useSelector((state) => state.session.user);
  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="checkout-complete">
      <img className="boom" src="/checkout.png" alt="boom" />
      <h2>Thank You for your Purchase!</h2>
      <Link to="/">
        <button>Return to Homepage</button>
      </Link>
    </div>
  );
}

