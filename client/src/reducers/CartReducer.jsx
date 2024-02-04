import {toast} from "react-toastify"

let initialState = []

initialState = JSON.parse(localStorage.getItem("cart"))

export function CartReducer(
  state = initialState == null ? [] : initialState,
  action
) {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload
    case "UPDATE_CART":
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
export const updateCart = (product, updatedfieldname, updatedvalue) => {
  return async (dispatch, getState) => {
    let currentproducts = getState().cart
    currentproducts.map((c) => {
      if (c._id == product._id) {
        c[updatedfieldname] = updatedvalue
      }
    })
    dispatch({
      type: "UPDATE_CART",
      payload: currentproducts,
    })
  }
}

export const removeSingleItemfromCart = (itemId) => {
  return (dispatch, getState) => {
    // get state
    const currentItems = getState().cart
    // remove from state
    const selectedItem = currentItems.find((e, i) => {
      return e._id == itemId
    })
    const indexofItem = currentItems.findIndex(
      (selectedItem) => selectedItem._id == itemId
    )
    if (indexofItem >= 0) {
      const updatedCart = currentItems.splice(indexofItem, 1)
    } else {
      toast.error("Product not found in the cart")
      return
    }
    const clonedArray = [...currentItems]
    // after this tage we should have new array which removed product , ad that to the state with Add_product
    dispatch({
      type: "ADD_TO_CART",
      payload: clonedArray,
    })
  }
}
export const selectCart = (state) => state.cart
