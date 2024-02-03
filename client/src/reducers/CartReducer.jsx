let initialState = []

initialState = JSON.parse(localStorage.getItem("cart"))

export function CartReducer(
  state = initialState == null ? [] : initialState,
  action
) {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload
    default:
      return state
  }
}

export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  }
}

export const getCart = (state) => state
