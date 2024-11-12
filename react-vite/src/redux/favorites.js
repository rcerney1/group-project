// Action Types
const LOAD_FAVORITES = "favorites/loadFavorites";
const ADD_FAVORITE = "favorites/addFavorite";
const REMOVE_FAVORITE = "favorites/removeFavorite";

// Action Creators
const loadFavorites = (favorites) => ({
    type: LOAD_FAVORITES,
    favorites,
});

const addFavorite = (product) => ({
    type: ADD_FAVORITE,
    product,
});

const removeFavorite = (productId) => ({
    type: REMOVE_FAVORITE,
    productId,
});

// Thunks
export const fetchFavorites = () => async (dispatch) => {
    const response = await fetch("/api/favorites/");
    if (response.ok) {
        const favorites = await response.json();
        dispatch(loadFavorites(favorites));
    } else {
        console.error("Failed to fetch favorites");
    }
};


export const toggleFavorite = (product) => async (dispatch, getState) => {
    const state = getState();
    const isFavorited = state.favorites.favoriteIds.some(fav => fav.id === product.id);

    if (isFavorited) {
        const response = await fetch(`/api/favorites/${product.id}`, { method: "DELETE" });
        if (response.ok) {
            dispatch(removeFavorite(product.id));
        } else {
            console.error("Failed to remove favorite");
        }
    } else {
        const response = await fetch(`/api/favorites/${product.id}`, { method: "POST" });
        if (response.ok) {
            dispatch(addFavorite(product));
        } else if (response.status === 400) {
            alert("It's already added to favorites.");
        } else {
            console.error("Failed to add favorite");
        }
    }
};

// Initial State
const initialState = {
    favoriteIds: [], // Array of favorite product objects
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
                favoriteIds: [...state.favoriteIds, action.product],
            };
        case REMOVE_FAVORITE:
            return {
                ...state,
                favoriteIds: state.favoriteIds.filter(fav => fav.id !== action.productId),
            };
        default:
            return state;
    }
};

export default favoritesReducer;