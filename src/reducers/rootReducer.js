import { FETCH_STAFF_BEGIN, FETCH_STAFF_SUCCESS, FETCH_STAFF_FAILURE,
  FETCH_COURSES_BEGIN, FETCH_COURSES_SUCCESS, FETCH_COURSES_FAILURE,
  FETCH_LOCATIONS_BEGIN, FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_FAILURE } from '../constants/action-types'

const initialState = {
  staff: [],
  courses: [],
  locations: [],
  loading: false,
  error: null
}

const rootReducer = (state=initialState, action) => {
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
      // console.log('Fetch failure')
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        staff: []
      }
      case FETCH_COURSES_BEGIN:
      console.log('Fetch begin')
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_COURSES_SUCCESS:
      console.log('Fetch Success')
      console.log(action.payload.courses)
      return {
        ...state,
        courses: action.payload.courses
      }
    case FETCH_COURSES_FAILURE:
      // console.log('Fetch failure')
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        courses: []
      }

      case FETCH_LOCATIONS_BEGIN:
      console.log('Fetch begin')
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_LOCATIONS_SUCCESS:
      console.log('Fetch Success')
      console.log(action.payload.locations)
      return {
        ...state,
        locations: action.payload.locations
      }
    case FETCH_LOCATIONS_FAILURE:
      // console.log('Fetch failure')
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        locations: []
      }
    default:
      // console.log('default')
      return state
  }
}

export default rootReducer