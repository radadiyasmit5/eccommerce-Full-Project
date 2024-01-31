export function productReducer(state = intialState, action) {
    switch (action.type) {
        case "SET_PRODUCTS":
            return action.payload
        case "REMOVE_PRODUCT":
            return {}
        default:
            return state;
    }
}


const intialState = []

export const setProducts = (products) => {
    return {
        type: "SET_PRODUCTS",
        payload: products
    }
}

export const selectProducts = (state) => {
    return state
}