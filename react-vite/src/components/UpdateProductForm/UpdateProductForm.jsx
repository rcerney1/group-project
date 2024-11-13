import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { fetchProductDetails, updateProductById, updateProductImageThunk } from "../../redux/products";


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
  console.log('IMAGEID', imageId)
    const handleSubmit = async (e) => {
      e.preventDefault();

      const updatedProduct = {
          name,
          price,
          description,
      };

      setErrors({});

      try {
          const result = await dispatch(updateProductById(productId, updatedProduct));

          if (result.errors) {
              setErrors(result.errors);
              return;
          }

          if (imageURL) {
              const imageResult = await dispatch(
                  updateProductImageThunk(productId, imageId, {
                      url: imageURL,
                      preview: true,
                  })
              );

              if (imageResult.errors) {
                  setErrors((prevErrors) => ({
                      ...prevErrors,
                      imageURL: imageResult.errors.url,
                  }));
                  return;
              }
          }

          await dispatch(fetchProductDetails(productId));
          navigate(`/products/${productId}`);
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