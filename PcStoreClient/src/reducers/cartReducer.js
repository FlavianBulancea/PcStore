import { cartTypes } from "../actions/actionTypes";

let stateInit = {cart: {}}

const cartReducer = (state=stateInit, action) => {
    switch (action.type) {
        case cartTypes.UPDATE_CART:
            return{...state, play: action.payload};
        default:
            return state
    }
}

export default cartReducer