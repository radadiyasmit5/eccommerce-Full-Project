const initialState = {
  isSideBarOpen: false,
}

export function LayoutReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return {...state, [action.payload.fieldname]: action.payload.value}

    default:
      return state
      break
  }
}

export function displatchToggleSideBar(fieldname, value) {
  return {
    type: "TOGGLE_SIDEBAR",
    payload: {fieldname, value},
  }
}
