import { combineReducers } from 'redux'
import { useReducer } from './userReduser.js'
import { searchReducer } from './searchReducer.jsx'
import { productReducer } from './ProductReducer.jsx'
const rootReduser = combineReducers({
    user: useReducer,
    search: searchReducer,
    products: productReducer
})
export default rootReduser