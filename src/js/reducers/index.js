import { ADD_STAFF } from "../constants/action-types";

const initialState = {
  appTitle: 'Tutor management system',
  staffs: [],
  courses: [],
  customer: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STAFF:
      return { ...state, staffs: state.staffs.push(action.payload) }
    default:
      return state
  }
}

export default rootReducer