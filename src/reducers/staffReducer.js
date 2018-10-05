import { FETCH_STAFF_BEGIN, FETCH_STAFF_SUCCESS, FETCH_STAFF_FAILURE } from '../constants/action-types'

const initialState = {
  appTitle: 'Tutor management system',
  staff: [],
  loading: false,
  error: null
}

const staffReducer = (state=initialState, action) => {
  switch (action.type) {
    case FETCH_STAFF_BEGIN:
      console.log('Fetch begin')
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_STAFF_SUCCESS:
      console.log('Fetch Success')
      console.log(action.payload.staff)
      return {
        ...state,
        staff: action.payload.staff
      }
    case FETCH_STAFF_FAILURE:
      console.log('Fetch failure')
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        staff: []
      }
    default:
      console.log('default')
      return state
  }
}

export default staffReducer