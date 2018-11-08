import { 
  FETCH_CUSTOMERS_BEGIN,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE
} from "../constants/action-types"
import { fetchData } from '../utils/request'

export const fetchCustomersBegin = () => ({
  type: FETCH_CUSTOMERS_BEGIN
})

export const fetchCustomersSuccess = customers => ({
  type: FETCH_CUSTOMERS_SUCCESS,
  payload: { customers }
})

export const fetchCustomersError = error => ({
  type: FETCH_CUSTOMERS_FAILURE,
  payload: { error }
})

export const fetchCustomers = (id=null) => {
  return dispatch => {
    dispatch(fetchCustomersBegin())
    return id 
    ? fetchData('customers/' + id)
      .then(result => {
        // console.log(result)
        dispatch(fetchCustomersSuccess(result))
        return result
      })
    : fetchData('customers')
      .then(result => {
        // console.log(result)
        dispatch(fetchCustomersSuccess(result))
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

