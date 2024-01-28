import { combineReducers } from 'redux'
import { useReducer } from './userReduser.js'
const rootReduser = combineReducers({
    user: useReducer,
})
export default rootReduser