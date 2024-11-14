import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProducts } from '../../redux/products';
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteProductModal from "../DeleteProductModal/DeleteProductModal";
import { FaStar } from 'react-icons/fa';
import './ManageProductsPage.css';

const ManageProductsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => Object.values(state.products.userProducts));


    useEffect(() => {
        dispatch(fetchUserProducts());
    }, [dispatch]);

    
    const handleProductDelete = () => {
        dispatch(fetchUserProducts());
    };

    return (
        <div className="products-container">
            {products.map((product) => (
                <div key={product.id} className="product-tile">
                    <div className="image-container">
                        <img
                            src={product?.previewImage || '/default-image.jpg'}
                            alt={product?.name}
                            className="product-image"
                        />
                    </div>
                    <div className="product-details">
                        <div className="product-details-wrapper">
                            <h3>{product.name}</h3>
                            <span className="product-rating">
                                {product.avgRating.toFixed(1)} <FaStar className="single-star" />
                            </span>
                        </div>
                        <div className="product-price">${product.price.toFixed(2)}</div>
                        <button onClick={() => navigate(`/products/${product.id}/edit`)} className="edit-button">Edit</button>
                        <OpenModalButton
                            modalComponent={<DeleteProductModal productId={product.id} onDelete={handleProductDelete} />}
                            buttonText="Delete"
                            className="delete-button"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ManageProductsPage;
