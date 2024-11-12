//! Actions
const GET_CART = 'cart/getCart';
const ADD_CART_ITEM = 'cart/addItem';
const UPDATE_ITEM_QUANTITY = 'cart/updateItemQuantity';
const REMOVE_CART_ITEM = 'cart/removeItem';
const CHECKOUT_CART = 'cart/checkoutCart';


//! Action creator

//action for get all cart item
const getCart = (payload) => {
    return {
        type: GET_CART,
        payload
    }
}

//action for add an item to cart
const addCartItem = (payload) => {
    return {
        type: ADD_CART_ITEM,
        payload
    }
}

//action for update item quantity
const updateItemQuantity = (payload) => {
    return {
        type: UPDATE_ITEM_QUANTITY,
        payload
    }
}

//action for remove a single cart item
const removeCartItem = (payload) => {
    return {
        type: REMOVE_CART_ITEM,
        payload
    }
}

//action for checkout cart 
const checkoutCart = (payload) => {
    return {
        type: CHECKOUT_CART,
        payload
    }
}


//! Thunk
export const getCartThunk = () => async(dispatch) => {
    const res = await fetch(`/api/carts/`);

    if(res.ok) {
        const data = await res.json();
        dispatch(getCart(data));
        return data;
    }else {
        const errors = await res.json()
        return errors;
    }

}


export const addCartItemThunk = (productId, quantity = 1) => async(dispatch) => {
    const res = await fetch(`/api/carts/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity })
    });

    if(res.ok) {
        const data = await res.json();
        dispatch(addCartItem(data));
        return data;
    }else {
        const errors = await res.json()
        return errors;
    }
}

export const updateItemQuantityThunk = (itemId, quantity) => async(dispatch) => {
    const res = await fetch(`/api/carts/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
    })

    if(res.ok) {
        const data = await res.json();
        dispatch(updateItemQuantity(data))
        return data;
    }else {
        const errors = await res.json()
        return errors;
    }
}

export const removeCartItemThunk = (itemId) => async(dispatch) => {
    const res = await fetch(`/api/carts/items/${itemId}`, {
        method: 'DELETE'
    })

    if(res.ok) {
        const data = await res.json();
        dispatch(removeCartItem(data))
        return data;
    }else {
        const errors = await res.json()
        return errors;
    }
}

export const checkoutCartThunk = () => async(dispatch) => {
    const res = await fetch(`api/carts/checkout`, {
        method: 'POST'
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(checkoutCart(data));
        return data;
    }else {
        const errors = await res.json()
        return errors;
    }
}



//! Cart Reducer
const initialState = {
    cartItems: {}
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART: {
            const newState = { ...state };
            const items = {};
            action.payload.cart_items.forEach((cartItem) => {
                items[cartItem.id] = cartItem;
            });
            newState.cartItems = items;
            return newState;
        }

        case ADD_CART_ITEM: {
            const newState = { ...state };
            const cartItem = action.payload;
            newState.cartItems = {
                ...state.cartItems,
                [cartItem.id]: cartItem
            };
            return newState;
        }

        case UPDATE_ITEM_QUANTITY: {
            const newState = { ...state };
            const cartItem = action.payload;
            newState.cartItems = {
                ...state.cartItems,
                [cartItem.id]: {
                    ...state.cartItems[cartItem.id],
                    quantity: cartItem.quantity
                }
            };
            return newState;
        }

        case REMOVE_CART_ITEM: {
            const newState = { ...state };
            const { itemId } = action.payload;
            delete newState.cartItems[itemId];
            return newState;
        }

        case CHECKOUT_CART: {
            return initialState;
        }

        default:
            return state;
    }
};




export default cartReducer;
