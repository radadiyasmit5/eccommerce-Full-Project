export function searchReducer(state = { text: '' }, action) {
    switch (action.type) {
        case "SEARCH_QUERY":
            return { ...state, ...action.payload }
            break;
        default:
            return state;
    }
}