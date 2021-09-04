import { cartTypes } from "./actionTypes";

export const updateCart = (cart) => {
    return {
        type: cartTypes.UPDATE_CART,
        payload: cart
    }
}