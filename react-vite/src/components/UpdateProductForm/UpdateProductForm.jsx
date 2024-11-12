import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { fetchProductDetails, updateProduct } from "../../redux/product";


const UpdateProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    console.log("Product ID from URL:", productId);
    const productDetails = useSelector((state) => state.products.productDetails);
    console.log("Product Details in Redux:", productDetails);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
  
    useEffect(() => {
      dispatch(fetchProductDetails(productId));
    }, [dispatch, productId]);
  
    useEffect(() => {
      if (productDetails) {
        setName(productDetails.name || '');
        setPrice(productDetails.price || '');
        setDescription(productDetails.description || '');
      }
    }, [productDetails]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const updatedProduct = {
        name,
        price,
        description,
      };
  
      setErrors({}); 
  
      try {
        const result = await dispatch(updateProduct(productId, updatedProduct));
  
        if (result.errors) {
          setErrors(result.errors); 
        } else {
          await dispatch(fetchProductDetails(productId));
          navigate(`/products/${productId}`); 
        }
      } catch (error) {
        console.error('Error updating product:', error);
      }
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
  
          <button type="submit">Update Product</button>
        </form>
      </div>
    );
  };


export default UpdateProductForm;