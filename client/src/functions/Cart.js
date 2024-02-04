import axios from "axios"

export const saveCartToDB = async (authtoken, cart) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    {
      // body
      cart: cart,
    },
    {
      //headers
      headers: {
        authtoken,
      },
    }
  )
}
export const getProductsinCart = async (authtoken) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/user/getProductsincart`,
    {
      headers: {authtoken},
    }
  )
}
export const deleteProductsinCart = async (authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/user/deleteProductsincart`,
    {
      headers: {authtoken},
    }
  )
}
