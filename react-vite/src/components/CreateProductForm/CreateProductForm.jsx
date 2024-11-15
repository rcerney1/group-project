import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewProduct, addProductImageThunk, fetchProductDetails, deleteProductById } from "../../redux/products";
import './CreateProductForm.css';


const CreateProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [previewImageURL, setPreviewImageURL] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationErrors = {};

        if (!name) validationErrors.name = "Name is required";
        if (!price || price <= 0) validationErrors.price = "Price must be a positive number";
        if (!description) validationErrors.description = "Description is required";
        if (!previewImageURL) validationErrors.previewImage = "Product image is required";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const productData = { name, price, description };
        const productResult = await dispatch(createNewProduct(productData));
        
        if (productResult.errors) {
            console.log(productResult.errors)
            setErrors(productResult.errors);
            return;
        }
        if (!previewImageURL){
            setErrors({...errors, previewImage: 'Product Image Required'})
            return;
        }
        if (previewImageURL) {
            const imageResult = await dispatch(
                addProductImageThunk(productResult.id, {
                    url: previewImageURL,
                    preview: true,
                })
            );

            if (imageResult.errors) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    previewImage: imageResult.errors.url || "Invalid image URL",
                }));
                await dispatch(deleteProductById(productResult.id))
                return;
            }
        }
        await dispatch(fetchProductDetails(productResult.id));
        navigate(`/products/${productResult.id}`);
    }
    return (
        <div className="product-form">
            <h1>Create a New Product</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter product name"
                        />
                    </label>
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div>
                    <label>
                        Price:
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter price (USD)"
                        />
                    </label>
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>

                <div>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product description"
                        ></textarea>
                    </label>
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>

                <div>
                    <label>
                        Preview Image URL:
                        <input
                            type="text"
                            value={previewImageURL}
                            onChange={(e) => setPreviewImageURL(e.target.value)}
                            placeholder="Enter image URL"
                            
                        />
                    </label>
                    {errors.previewImage && <p className="error">{errors.previewImage}</p>}
                </div>

                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default CreateProductForm;