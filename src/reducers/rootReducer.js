import {
  FETCH_STAFF_BEGIN, FETCH_STAFF_SUCCESS, FETCH_STAFF_FAILURE,
  FETCH_COURSES_BEGIN, FETCH_COURSES_SUCCESS, FETCH_COURSES_FAILURE,
  FETCH_LOCATIONS_BEGIN, FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_FAILURE,
  FETCH_CUSTOMERS_BEGIN, FETCH_CUSTOMERS_SUCCESS, FETCH_CUSTOMERS_FAILURE,
  GET_CURRENT_SIDE_MENU
} from '../constants/action-types'


const initialState = {
  staff: [],
  courses: [],
  locations: [],
  customers: [],
  menuList: [
    { link: '/', title: 'dashboard', icon: 'appstore'},
    { link: '/staff', title: 'staff', icon: 'team', captions: 'Register', avatar: 'http://www.free-icons-download.net/images/teachers-95008.png'},
    { link: '/courses', title:'courses', icon: 'audit', captions: 'Open', avatar: 'https://static1.squarespace.com/static/593ff48f20099eef990d199d/59db9c3dccc5c5531166f2c2/59db9c3de5dd5b5a1b440128/1507652291838/Icon+-+Coding.png' },
    { link: '/locations', title:'locations', icon: 'environment', captions: 'Available', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Circle-icons-location.svg/1024px-Circle-icons-location.svg.png' },
    { link: '/customers', title: 'customers', icon: 'user', captions: 'Actived', avatar: 'http://www.free-icons-download.net/images/couple-94746.png' }
  ],
  currentSideMenu: '',
}

const rootReducer = (state=initialState, action) => {
  switch (action.type) {
    
    case GET_CURRENT_SIDE_MENU:
      // console.log('Get current path')
      // console.log('action.payload.currentSideMenu:', action.payload.currentSideMenu)
      return {
        ...state,
        currentSideMenu: action.payload.currentSideMenu
      }

    case FETCH_STAFF_BEGIN:
      console.log('fetch staff')
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_STAFF_SUCCESS:
      return {
        ...state,
        staff: action.payload.staff
      }

    case FETCH_STAFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        staff: []
      }

    case FETCH_COURSES_BEGIN:
    console.log('fetch courses')
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload.courses
      }

    case FETCH_COURSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        courses: []
      }

    case FETCH_LOCATIONS_BEGIN:
    console.log('fetch locations')
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.payload.locations
      }

    case FETCH_LOCATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        locations: []
      }

    case FETCH_CUSTOMERS_BEGIN:
      console.log('fetch customers')
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload.customers
      }

    case FETCH_CUSTOMERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        customers: []
      }

    default:
      return state
  }
}

export default rootReducer