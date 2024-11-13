import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProductById } from '../../redux/products';
import { fetchFavorites, deleteFavorite, addFavorite } from '../../redux/favorites';
import { NavLink } from 'react-router-dom';
import './Products.css';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { FaStar } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci"; 

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => Object.values(state.products.allProducts));  
    const favoriteIds = useSelector((state) => state.favorites.favoriteIds); // Favorite product IDs


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    
    useEffect(() => {                 
        dispatch(fetchProducts());
        dispatch(fetchFavorites()); // Load favorites when component mounts
    }, [dispatch]);

    const handleDelete = async () => {
        if (selectedProductId) {
            await dispatch(deleteProductById(selectedProductId));
            setIsModalOpen(false);
            setSelectedProductId(null);  // Clear selected product ID after delete
        }
    };


    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);  // Clear selected product ID on modal close
    };

    
    const handleFavoriteToggle = (e, productId) => {
        e.preventDefault(); // Prevents navigating to the product page on icon click
    
        if (favoriteIds.includes(productId)) {
            dispatch(deleteFavorite(productId)); // Remove from favorites if already favorited
        } else {
            dispatch(addFavorite(productId)); // Add to favorites if not favorited
        }
    };

    return (
        <div className="products-container">
            {products.map((product) => (
                <div key={product.id} className="product-tile">
                    <div className="image-container">
                        {/* Heart icon positioned in the top-right corner */}
                        <CiHeart
                            className={`favorite-icon ${favoriteIds.includes(product.id) ? 'favorited' : ''}`}
                            onClick={(e) => handleFavoriteToggle(e, product.id)}
                        />
                        {/* Wrap image with NavLink to make it clickable */}
                        <NavLink to={`/products/${product.id}`}>
                            <img
                                src={product?.previewImage || '/default-image.jpg'}
                                alt={product?.name}
                                className="product-image"
                            />                            
                        </NavLink>
                    </div>
                    <div className="product-info">
                        <NavLink to={`/products/${product.id}`} className="product-link">
                            <h3>{product?.name}</h3>
                        </NavLink>
                        <div className="product-details">
                            <span className="product-rating">
                                {product?.avgRating.toFixed(1)} <FaStar className="single-star" />
                            </span>
                            <div className="product-price">${product?.price}</div>
                        </div>
                    </div>
                </div>
            ))}
    
            {isModalOpen && (
                <ConfirmDeleteModal
                    onClose={closeDeleteModal}
                    onConfirm={handleDelete}
                    modalValue="product"
                />
            )}
        </div>
    );

}

export default Products;