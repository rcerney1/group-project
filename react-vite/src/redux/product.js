export const LOAD_PRODUCT_DETAILS = 'products/LOAD_PRODUCT_DETAILS';

const loadProductDetails = (product) => ({
    type: LOAD_PRODUCT_DETAILS,
    product
})


export const fetchProductDetails = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`)
    if (response.ok) {
        const product = await response.json();
        dispatch(loadProductDetails(product));
    }
};

const inititalState = {
    productDetails: null,
}

const productsReducer = (state = inititalState, action) => {
    switch (action.type) {
        case LOAD_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: action.product,
            };
        default:
            return state;

    }
};

export default productsReducer;