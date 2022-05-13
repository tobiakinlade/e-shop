import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART
} from "../Reducers/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
// It will take the payload to the reducer function
// addToCart will be attached to a button
export const addToCart = (payload) => {
    return {
        type: ADD_TO_CART,
        payload
    }
}

// It will take the payload argument to the reducer function
// removeFromCart will be attached to a button
export const removeFromCart = (payload) => {
    return {
        type: REMOVE_FROM_CART,
        payload
    }
}


// We do not need payload because it will clear the entire state
export const clearCart = () => {
    return {
        type: CLEAR_CART,
    }
}
