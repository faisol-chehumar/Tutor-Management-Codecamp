import { FETCH_COURSES_BEGIN, FETCH_COURSES_SUCCESS, FETCH_COURSES_FAILURE  } from "../constants/action-types"
import { fetchData } from '../utils/request'

export const fetchCoursesBegin = () => ({
  type: FETCH_COURSES_BEGIN
})

export const fetchCoursesSuccess = courses => ({
  type: FETCH_COURSES_SUCCESS,
  payload: { courses }
})

export const fetchCoursesError = error => ({
  type: FETCH_COURSES_FAILURE,
  payload: { error }
})

export const fetchCourses = (id=null) => {
  console.log(id)
  return dispatch => {
    dispatch(fetchCoursesBegin())
    // console.log()
    return id 
    ? fetchData('courses/' + id)
      .then(result => {
        console.log(result)
        dispatch(fetchCoursesSuccess(result))
        return result
      })
    : fetchData('courses')
      .then(result => {
        console.log(result)
        dispatch(fetchCoursesSuccess(result))
        return result
      })
  }
}

// Handle HTTP errors since fetch won't.
// function handleErrors(response) {
//   if (!response.ok) {
//     throw Error(response.statusText)
//   }
//   return response;
// }

