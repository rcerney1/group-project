import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { fetchProductDetails, fetchProductsByCategory, updateProductById, updateProductImageThunk } from "../../redux/products";


const UpdateProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    const productDetails = useSelector((state) => state.products.productDetails);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('')
    const [imageFile, setImageFile] = useState(null);
    const [imageId, setImageId] = useState(null);
    const [errors, setErrors] = useState({});

    const categories = [
        { id: 1, name: "Marvel" },
        { id: 2, name: "DC" },
    ];
  
    useEffect(() => {
      dispatch(fetchProductDetails(productId));
    }, [dispatch, productId]);
  
    useEffect(() => {
      if (productDetails) {
          setName(productDetails.name || '');
          setPrice(productDetails.price || '');
          setDescription(productDetails.description || '');
          setCategory(productDetails.category || '');
          if (productDetails.ProductImages?.length > 0) {
              setImageId(productDetails.ProductImages[0].id || null);
          }
      }
  }, [productDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!name) validationErrors.name = "Product name is required.";
    if (!price || price <= 0) validationErrors.price = "Price must be a positive number.";
    if (!description) validationErrors.description = "Description is required.";
    if (!category) validationErrors.category = "Category is required.";
    if (!imageFile) validationErrors.imageFile = "Product image is required.";

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    const updatedProduct = {
        name,
        price,
        description,
        category
    };

    const updateResult = await dispatch(updateProductById(productId, updatedProduct));
    
    if (updateResult.errors) {
        setErrors(updateResult.errors);
        return;
    }

    if (imageFile) {
        const imageResult = await dispatch(
            updateProductImageThunk(productId, imageId, {
                file: imageFile, // Pass the new file
                preview: true,
            })
        );

        if (imageResult.errors) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                imageFile: imageResult.errors.url || "Invalid image upload",
            }));
            return;
        }
    }

    await dispatch(fetchProductDetails(productId));
    navigate(`/products/${productId}`);

};

const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
};
 
  
    if (!productDetails) return <div>Loading...</div>;
  
    return (
      <div className="product-form">
          <h1>Update Your Product</h1>

          <form onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="name">Product Name</label>
                  <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter product name"
                  />
                  {errors.name && <p className="error">{errors.name}</p>}
              </div>

              <div>
                  <label htmlFor="price">Price</label>
                  <input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter price (USD)"
                  />
                  {errors.price && <p className="error">{errors.price}</p>}
              </div>

              <div>
                  <label htmlFor="description">Description</label>
                  <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter product description"
                  ></textarea>
                  {errors.description && <p className="error">{errors.description}</p>}
              </div>

              <div>
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="error">{errors.category}</p>}
                </div>

                    <label htmlFor="imageFile">Preview Image</label>
                    <input
                        id="imageFile"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {errors.imageFile && <p className="error">{errors.imageFile}</p>}
                </div>

              <button type="submit">Update Product</button>
          </form>
      </div>
    );
  };


export default UpdateProductForm;