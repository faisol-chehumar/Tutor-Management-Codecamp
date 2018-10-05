import { FETCH_STAFF_BEGIN, FETCH_STAFF_SUCCESS, FETCH_STAFF_FAILURE  } from "../constants/action-types"
import { fetchData } from '../utils/request'

export const fetchStaffBegin = () => ({
  type: FETCH_STAFF_BEGIN
})

export const fetchStaffSuccess = staff => ({
  type: FETCH_STAFF_SUCCESS,
  payload: { staff }
})

export const fetchStaffError = error => ({
  type: FETCH_STAFF_FAILURE,
  payload: { error }
})

export const fetchStaff = () => {
  return dispatch => {
    dispatch(fetchStaffBegin())
    return fetchData('staff')
      .then(result => {
        // console.log(result)
        dispatch(fetchStaffSuccess(result))
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

