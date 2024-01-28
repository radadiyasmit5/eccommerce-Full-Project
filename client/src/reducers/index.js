import { combineReducers } from 'redux'
import { useReducer } from './userReduser.js'
import { searchReducer } from './searchReducer.jsx'
const rootReduser = combineReducers({
    user: useReducer,
    search: searchReducer,
})
export default rootReduser