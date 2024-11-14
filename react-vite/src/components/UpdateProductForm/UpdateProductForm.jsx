import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { fetchProductDetails, updateProductById, updateProductImageThunk } from "../../redux/products";


const UpdateProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    const productDetails = useSelector((state) => state.products.productDetails);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('')
    const [imageId, setImageId] = useState(null);
    const [errors, setErrors] = useState({});
  
    useEffect(() => {
      dispatch(fetchProductDetails(productId));
    }, [dispatch, productId]);
  
    useEffect(() => {
      if (productDetails) {
          setName(productDetails.name || '');
          setPrice(productDetails.price || '');
          setDescription(productDetails.description || '');
          if (productDetails.ProductImages?.length > 0) {
              setImageURL(productDetails.ProductImages[0].url || '');
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
    if (!imageURL) validationErrors.imageURL = "Product image is required.";
    

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    const updatedProduct = {
        name,
        price,
        description,
    };
    console.log(updatedProduct)

    const updateResult = await dispatch(updateProductById(productId, updatedProduct));
    
    if (updateResult.errors) {
        setErrors(updateResult.errors);
        return;
    }

    const imageResult = await dispatch(
        updateProductImageThunk(productId, imageId, {
            url: imageURL,
            preview: true,
        })
    );
    
    if (imageResult.errors) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            imageURL: imageResult.errors.url || "Invalid image URL",
        }));
        return;
    }

    await dispatch(fetchProductDetails(productId));
    navigate(`/products/${productId}`);
};
 
  
    if (!productDetails) return <div>Loading...</div>;
  
    return (
      <div className="update-product-form">
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
                  <label htmlFor="imageURL">Preview Image URL</label>
                  <input
                      id="imageURL"
                      type="text"
                      value={imageURL}
                      onChange={(e) => setImageURL(e.target.value)}
                      placeholder="Enter image URL"
                  />
                  {errors.imageURL && <p className="error">{errors.imageURL}</p>}
              </div>

              <button type="submit">Update Product</button>
          </form>
      </div>
    );
  };


export default UpdateProductForm;