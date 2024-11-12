export const LOAD_PRODUCT_DETAILS = 'products/LOAD_PRODUCT_DETAILS';
export const UPDATE_PRODUCT = 'products/UPDATE_PRODUCT'


const loadProductDetails = (product) => ({
    type: LOAD_PRODUCT_DETAILS,
    product
})

const updateProductAction = (product) => ({
    type: UPDATE_PRODUCT,
    product,
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

export const updateProduct = (productId, productData) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });

    if (response.ok) {
        const updatedProduct = await response.json();
        dispatch(updateProductAction(updatedProduct))
        return updatedProduct;
    }else {
        const errorData = await response.json();
        return { errors : errorData.errors };
    }
}

const initialState = {
    productDetails: null,
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRODUCT_DETAILS:
            console.log("Updating productDetails in state:", action.product);
            return {
                ...state,
                productDetails: action.product,
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                productDetails: action.product,
            };
        default:
            return state;

    }
};

export default productsReducer;