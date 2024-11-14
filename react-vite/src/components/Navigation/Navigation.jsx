import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import { MdFavorite } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



function Navigation() {
  const user = useSelector((store) => store.session.user);
  const navigate = useNavigate();
  return (
    <nav className='navigation-bar'>
      <ul className="nav-bar-elements">
        <li className='logo-container'>
          <NavLink to="/">
            <img src='/comic.png' alt="Logo" className="logo" />
            <span className="logo-text">Comic Cache</span>
          </NavLink>
        </li>

        {user && (
          <li>
            <button onClick={() => navigate("favorites")}>
              <MdFavorite />
            </button>
          </li>
        )}

        {user && (
          <li>
            <button onClick={() => navigate("cart")}>
              <FaShoppingCart />
            </button>
          </li>
        )}

        <li>
          <ProfileButton />
        </li>
      </ul>
    </nav>
    
    
  );
}

export default Navigation;
