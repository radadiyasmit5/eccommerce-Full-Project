import {combineReducers} from "redux"
import {useReducer} from "./userReduser.js"
import {searchReducer} from "./searchReducer.jsx"
import {productReducer} from "./ProductReducer.jsx"
import {CartReducer} from "./CartReducer.jsx"
import {SlideDrawerReducer} from "./SlideDrawerReducer.js"
import {CouponReducer} from "./CouponReducer.jsx"
const rootReduser = combineReducers({
  user: useReducer,
  search: searchReducer,
  products: productReducer,
  cart: CartReducer,
  drawer: SlideDrawerReducer,
  coupon: CouponReducer,
})
export default rootReduser
