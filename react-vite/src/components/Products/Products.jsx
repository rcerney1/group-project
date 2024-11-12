import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProductById } from '../../redux/products';
import { fetchFavorites, toggleFavorite } from '../../redux/favorites';
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
        e.preventDefault(); // Prevents navigating to product page on icon click
        dispatch(toggleFavorite(productId));
    };


    return (
            <div className="products-container">
               
                {products.map((product) => (
                    <div key={product.id} className="product-tile">
                        <NavLink to={`/products/${product.id}`}>
                            <div className="image-container">
                                <img
                                    src={product?.previewImage || '/default-image.jpg'}
                                    alt={product?.name}
                                    className="product-image" 
                                />
                                <CiHeart
                                className={`favorite-icon ${favoriteIds.includes(product.id) ? 'favorited' : ''}`}
                                onClick={(e) => handleFavoriteToggle(e, product.id)}
                            />
                            </div>
                            <div className="product-details">
                                <div className="product-details-wrapper">
                                    <h3>
                                        {product?.name}
                                    </h3>
                                    <span className="product-rating">
                                        {product.avgRating ? product?.avgRating.toFixed(1) : 'New'} <FaStar className="single-star" />
                                        
                                    </span>
                                </div>
                                <div className="product-price">${product?.price}</div>
                            </div>
                        </NavLink>
                        
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
};

export default Products;