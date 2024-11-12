import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewProduct, addProductImageThunk, fetchProductDetails } from "../../redux/products";

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

        const productData = { name, price, description };
        const productResult = await dispatch(createNewProduct(productData));

        if (productResult.errors) {
            setErrors(productResult.errors);
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
                setErrors({ ...errors, previewImage: imageResult.errors.url });
                return;
            }
        }

        await dispatch(fetchProductDetails(productResult.id));
        navigate(`/products/${productResult.id}`);
    };

    return (
        <div className="create-product-form">
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