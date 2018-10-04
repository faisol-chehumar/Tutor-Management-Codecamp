import { FETCH_STAFF_BEGIN, FETCH_STAFF_SUCCESS, FETCH_STAFF_FAILURE } from '../constants/action-types'

const initialState = {
  appTitle: 'Tutor management system',
  staff: [],
  loading: false,
  error: null
}

const rootReducer = (state = initialState, action) => {
  // console.log(state.staff)
  console.log(action.type)
  switch (action.type) {
    case FETCH_STAFF_BEGIN:
      console.log('Fetch begin')
      return {
        ...state,
        loading: true,
        error: null,
        staff: [...state.staff, action.payload]
      }
    case FETCH_STAFF_SUCCESS:
      return {
        ...state,
        staff: [...state.staff, action.payload.staff]
      }
    case FETCH_STAFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        staff: []
      }
    default:
      return state
  }
}

export default rootReducer