import { FETCH_STAFF_BEGIN, FETCH_STAFF_SUCCESS, FETCH_STAFF_FAILURE, DELETE_STAFF_BEGIN, DELETE_STAFF_SUCCESS } from "../constants/action-types"
import { fetchData, deleteData } from '../utils/request'

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

export const fetchStaff = (id=null) => {
  return dispatch => {
    dispatch(fetchStaffBegin())
   
    return fetchData('staff')
    .then(result => {
      dispatch(fetchStaffSuccess(result))
      return result
    })
  }
}

export const deleteStaffBegin = () => ({
  type: DELETE_STAFF_BEGIN
})

export const deleteStaffSuccess = staffId => ({
  type: DELETE_STAFF_SUCCESS,
  payload: { staffId }
})

export const deleteStaff = (id) => {
  return dispatch => {
    dispatch(deleteStaffBegin())

    return deleteData('staff', id)
    .then(result => {
      dispatch(deleteStaffSuccess(id))
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


