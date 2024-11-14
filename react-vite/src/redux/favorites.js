// Action Types
const LOAD_FAVORITES = "favorites/loadFavorites";
const ADD_FAVORITE = "favorites/addFavorite";
const REMOVE_FAVORITE = "favorites/removeFavorite";

// Action Creators
const loadFavorites = (favorites) => ({
    type: LOAD_FAVORITES,
    favorites,
});

const addFavoriteAction = (productId) => ({
    type: ADD_FAVORITE,
    productId,
});

const removeFavorite = (productId) => ({
    type: REMOVE_FAVORITE,
    productId,
});

// Thunk to Load Favorites
export const fetchFavorites = () => async (dispatch) => {
    const response = await fetch("/api/favorites/");
    if (response.ok) {
        const favorites = await response.json();
        dispatch(loadFavorites(favorites));
    } else {
        console.error("Failed to fetch favorites");
    }
};


// Thunk to Add Favorite
export const addFavorite = (product) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${product.id}`, { method: "POST" });
    if (response.ok) {
        dispatch(addFavoriteAction(product));        
    } else {
        console.error("Failed to add favorite to database");
    }
};


// Thunk to Remove Favorite
export const deleteFavorite = (productId) => async (dispatch) => {
    // Optimistically remove the favorite from the UI immediately
    dispatch(removeFavorite(productId));    

    // API call to delete the favorite from the database
    const response = await fetch(`/api/favorites/${productId}`, { method: "DELETE" });
    if (!response.ok) {
        console.error("Failed to delete favorite from database");
        
    }
};



// Initial State
const initialState = {
    favoriteIds: [], // Array of full favorite product objects
};

// Reducer
const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_FAVORITES:
            return {
                ...state,
                favoriteIds: action.favorites,
            };
        case ADD_FAVORITE:
            return {
                ...state,
                favoriteIds: state.favoriteIds.includes(action.productId)
                    ? state.favoriteIds // Do nothing if already in favorites
                    : [...state.favoriteIds, action.productId],
            };
        case REMOVE_FAVORITE:
            return {
                ...state,
                favoriteIds: state.favoriteIds.filter(fav => fav.product_id !== action.productId),
            };
        default:
            return state;
    }
};

export default favoritesReducer;