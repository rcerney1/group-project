//Action Types
const ADD_REVIEW = "reviews/addReview"
const DELETE_REVIEW = "reviews/deleteReview"
const LOAD_PRODUCT_REVIEWS ="reviews/LOAD_PRODUCT_REVIEWS"
const CLEAR_REVIEWS = 'reviews/clearReviews'

//Action Creators
const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review,
});

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId,
});

const loadProductReviews = (reviews) => ({
    type: LOAD_PRODUCT_REVIEWS,
    reviews,
})

export const clearReviews = () => ({
    type: CLEAR_REVIEWS
});

//Thunks

//Thunk to Load All Reviews for a Product
export const fetchProductReviews = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/reviews`)
    if (response.ok) {
        const data = await response.json();
        dispatch(loadProductReviews(data.reviews))
    }
}

//Thunk to create review
export const thunkCreateReview = (productId, reviewData) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(reviewData)
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(addReview(newReview));
        return newReview;
    } else if (response.status < 500) {
        const error = await response.json();
        return { errors: error.errors };
    } else {
        return { errors: ["Something went wrong. Please try again"] };
    }
};

//Thunk to delete a review
export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const message = await response.json();
        dispatch(deleteReview(reviewId));
        return message;
    } else {
        const error = await response.json();
        return {errors: error.errors}
    }
}

const initialState = {
    reviews: [],
};

//reducer
function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_REVIEW:
            return {...state, reviews: [...state.reviews, action.payload]};
        case DELETE_REVIEW:
            return {...state, reviews: state.reviews.filter(review => review.id !== action.payload)}
        case LOAD_PRODUCT_REVIEWS:
            return { ...state, reviews: action.reviews };
        case CLEAR_REVIEWS:
            return{...state, reviews: []}
        default:
            return state
    }
}

export default reviewsReducer

