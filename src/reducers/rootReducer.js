import { FETCH_STAFF_BEGIN, FETCH_STAFF_SUCCESS, FETCH_STAFF_FAILURE,
  FETCH_COURSES_BEGIN, FETCH_COURSES_SUCCESS, FETCH_COURSES_FAILURE,
  FETCH_LOCATIONS_BEGIN, FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_FAILURE,
  FETCH_CUSTOMERS_BEGIN, FETCH_CUSTOMERS_SUCCESS, FETCH_CUSTOMERS_FAILURE,
  GET_CURRENT_SIDE_MENU, FETCH_UPLOAD_IMAGES, FETCH_STAFF_DETAIL_SUCCESS } from '../constants/action-types'


const initialState = {
  staff: [],
  staffDetail: [],
  courses: [],
  locations: [],
  customers: [],
  uploadedImagePath: '',
  menuList: [
    { link: '/', title: 'dashboard', icon: 'appstore' },
    { link: '/staff', title: 'staff', icon: 'team' },
    { link: '/courses', title:'courses', icon: 'audit' },
    { link: '/locations', title:'locations', icon: 'audit' },
    { link: '/customers', title: 'customers', icon: 'user' }
  ],
  currentSideMenu: '',
}

const rootReducer = (state=initialState, action) => {
  switch (action.type) {
    case FETCH_UPLOAD_IMAGES:
      console.log('FETCH_UPLOAD_IMAGES')
      console.log(action.payload.url)
      return {
        ...state,
        uploadedImagePath: action.payload.url
      }
    case GET_CURRENT_SIDE_MENU:
      // console.log('Get current path')
      // console.log('action.payload.currentSideMenu:', action.payload.currentSideMenu)
      return {
        ...state,
        currentSideMenu: action.payload.currentSideMenu
      }
    case FETCH_STAFF_BEGIN:
      // console.log('Fetch begin')
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_STAFF_SUCCESS:
      // console.log('Fetch Success')
      // console.log(action.payload.staff)
      return {
        ...state,
        staff: action.payload.staff
      }
    case FETCH_STAFF_DETAIL_SUCCESS:
      console.log('FETCH_STAFF_DETAIL_SUCCESS')
      // console.log(action.payload.staff)
      return {
        ...state,
        staffDetail: action.payload.staff
      }
    case FETCH_STAFF_FAILURE:
      console.log('Fetch failure')
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        staff: []
      }
      case FETCH_COURSES_BEGIN:
      // console.log('Fetch begin')
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_COURSES_SUCCESS:
      // console.log('Fetch Success')
      // console.log(action.payload.courses)
      return {
        ...state,
        courses: action.payload.courses
      }
    case FETCH_COURSES_FAILURE:
      console.log('Fetch failure')
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        courses: []
      }

      case FETCH_LOCATIONS_BEGIN:
      // console.log('Fetch begin')
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_LOCATIONS_SUCCESS:
      // console.log('Fetch Success')
      // console.log(action.payload.locations)
      return {
        ...state,
        locations: action.payload.locations
      }
    case FETCH_LOCATIONS_FAILURE:
      console.log('Fetch failure')
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        locations: []
      }

      case FETCH_CUSTOMERS_BEGIN:
      // console.log('Fetch begin')
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_CUSTOMERS_SUCCESS:
      // console.log('Fetch Success')
      // console.log(action.payload.customers)
      return {
        ...state,
        customers: action.payload.customers
      }
    case FETCH_CUSTOMERS_FAILURE:
      console.log('Fetch failure')
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        customers: []
      }
    default:
      // console.log('default')
      return state
  }
}

export default rootReducer