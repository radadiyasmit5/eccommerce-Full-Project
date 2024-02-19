import axios from "axios"

export const saveOrder = async (paymentIntent, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/order/saveOrder`,
    {paymentIntent},
    {
      headers: {
        authtoken,
      },
    }
  )
}
export const getOrders = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/order/getOrders`, {
    headers: {
      authtoken,
    },
  })
}
