export function SlideDrawerReducer(state = false, action) {
  switch (action.type) {
    case "SET_DRAWER_VISIBILITY":
      return action.payload
    default:
      return state
  }
}

export const setDrawerVisibility = (value) => {
  return {
    type: "SET_DRAWER_VISIBILITY",
    payload: value,
  }
}


export const selectDrawerVisibility = (state)=> state.drawer
