import { FETCH_STAFF_BEGIN, FETCH_STAFF_SUCCESS, FETCH_STAFF_FAILURE  } from "../constants/action-types"
// import { fetchData } from '../utils/request'
// import { store } from '../stores/'

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

export async function fetchStaff() {
  console.log('dispatch')
  return (dispatch, getState) => {
    console.log(getState())
    dispatch(fetchStaffBegin())
    // return async () => {
    //   const result = await fetchData('staff')
    //   console.log(result)
    // }
  }
  // console.log(store.getState())
  // console.log(await fetchData('staff'))
  // store.dispatch(fetchStaffBegin())
}

// Handle HTTP errors since fetch won't.
// function handleErrors(response) {
//   if (!response.ok) {
//     throw Error(response.statusText)
//   }
//   return response;
// }

