import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, deleteFavorite, addFavorite } from '../../redux/favorites';
import './Favorites.css';
import { NavLink } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';

const Favorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites?.favoriteIds || []); // Ensure favorites is an array
    useEffect(() => {
        dispatch(fetchFavorites()); // Fetch all favorites initially
    }, [dispatch]);


    const handleRemoveFavorite = (productId) => {
        dispatch(deleteFavorite(productId)); //  Remove from favorites
    };

    return (
        <div className="products-container">
            {favorites.length > 0 ? (
                favorites.map((favorite) => (
                    <div key={favorite.product?.id} className="product-tile">
                        <NavLink to={`/products/${favorite.product?.id}`}>
                            <div className="image-container">
                                <img
                                    src={favorite.product?.previewImage || '/default-image.jpg'}
                                    alt={favorite.product?.name}
                                    className="product-image" 
                                />
                                <div className="favorite-icon-container">
                                    <FaHeart
                                        className="favorite-icon favorited"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent navigation on click
                                            handleRemoveFavorite(favorite.product?.id);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="product-details">
                                <div className="product-details-wrapper">
                                    <h3>{favorite.product?.name}</h3>
                                    <span className="product-rating">
                                        {favorite.product?.avgRating?.toFixed(1)} <FaStar className="single-star" />
                                    </span>
                                </div>
                                <div className="product-price">${favorite.product?.price}</div>
                            </div>
                        </NavLink>
                    </div>
                ))
            ) : (
                <p>No favorites yet!</p>
            )}
        </div>
    );
};

export default Favorites;



