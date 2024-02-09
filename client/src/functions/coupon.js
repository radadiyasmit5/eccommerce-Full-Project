import axios from "axios"

export const listCoupons = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/coupons`)
}
export const createCoupons = async (coupon, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    {coupon},
    {
      headers: {authtoken: authtoken},
    }
  )
}
export const deleteCoupons = async (couponId, authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/coupons/${couponId}`,
    {
      headers: {authtoken: authtoken},
    }
  )
}

export const validatCoupon = async (couponName, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/validate/coupon`,
    {couponName},
    {
      headers: {authtoken: authtoken},
    }
  )
}
