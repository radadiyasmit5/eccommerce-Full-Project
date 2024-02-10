const initialState = {
  isCouponApplied: false,
  coupon: "",
}

export function CouponReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_COUPON_APPLIED":
      return action.payload
      break
    default:
      return state
      break
  }
}
