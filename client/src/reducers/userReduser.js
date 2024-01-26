export function useReducer(state = null, action) {
    switch (action.type) {
        case "LOGGED_IN_USER":
            return action.payload;
            break;
        case "LOGOUT":
            return action.payload;
            
        default:
            return state
    }
}