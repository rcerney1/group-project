// Action Types
const LOAD_PRODUCTS = "products/loadProducts";
const LOAD_PRODUCT = "products/loadProduct";
const CREATE_PRODUCT = "products/createProduct";
const UPDATE_PRODUCT = "products/updateProduct";
const DELETE_PRODUCT = "products/deleteProduct";
const LOAD_PRODUCT_DETAILS = 'products/loadProductDetails';


// Action Creators
const loadProducts = (products) => ({
    type: LOAD_PRODUCTS,
    products
});

const loadProduct = (product) => ({
    type: LOAD_PRODUCT,
    product
});

const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    product
});

const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    product
});

const deleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    productId
});

const loadProductDetails = (product) => ({
    type: LOAD_PRODUCT_DETAILS,
    product
})

export const fetchProductDetails = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`)
    if (response.ok) {
        const product = await response.json();
        dispatch(loadProductDetails(product));
    }else {
        console.error("Failed to fetch product details");
    }
};

// Thunks
export const fetchProducts = () => async (dispatch) => {
    const response = await fetch("/api/products/");
    console.log("\nStep2\n")
    if (response.ok) {
        const data = await response.json();

        console.log(`\nFetched data: ${JSON.stringify(data)}\n`);

        dispatch(loadProducts(data.Products));
    } else {
        console.error("Failed to fetch products");
    }
};

export const fetchProductById = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`);
    if (response.ok) {
        const product = await response.json();
        dispatch(loadProduct(product));
    }
};

export const createNewProduct = (productData) => async (dispatch) => {
    const response = await fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    });

    if (response.ok) {
        const newProduct = await response.json();
        dispatch(createProduct(newProduct));
        return newProduct;
    }
};

export const updateProductById = (id, productData) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    });

    if (response.ok) {
        const updatedProduct = await response.json();
        dispatch(updateProduct(updatedProduct));
        return updatedProduct;
    }else {
        console.log('RESPONSE', response)
    }
};

export const deleteProductById = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteProduct(id));
    }else {
        const errorData = await response.json();
        return { errors : errorData.errors };
    }
};

// Initial State
const initialState = {
    allProducts: {},
    productDetails: null,
};

// Reducer
const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS: {
            const newState = { ...state, allProducts: {} };
            action.products.forEach((product) => {
                newState.allProducts[product.id] = product;
            });
            return newState;
        }
        case LOAD_PRODUCT_DETAILS:
            
            return {
                ...state,
                productDetails: action.product,
            };
        case LOAD_PRODUCT: {
            return {
                ...state,
                allProducts: {
                    ...state.allProducts,
                    [action.product.id]: action.product,
                },
            };
        }
        case CREATE_PRODUCT: {
            return {
                ...state,
                allProducts: {
                    ...state.allProducts,
                    [action.product.id]: action.product,
                },
            };
        }
        case UPDATE_PRODUCT: {
            return {
                ...state,
                allProducts: {
                    ...state.allProducts,
                    [action.product.id]: action.product,
                },
            };
        }
        case DELETE_PRODUCT: {
            const newState = { ...state };
            delete newState.allProducts[action.productId];
            return newState;
        }
        default:
            return state;
    }
};

export default productsReducer;