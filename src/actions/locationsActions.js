import { FETCH_LOCATIONS_BEGIN, FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_FAILURE  } from "../constants/action-types"
import { fetchData } from '../utils/request'

export const fetchLocationsBegin = () => ({
  type: FETCH_LOCATIONS_BEGIN
})

export const fetchLocationsSuccess = locations => ({
  type: FETCH_LOCATIONS_SUCCESS,
  payload: { locations }
})

export const fetchLocationsError = error => ({
  type: FETCH_LOCATIONS_FAILURE,
  payload: { error }
})

export const fetchLocations = (id=null) => {
  // console.log(id)
  return dispatch => {
    dispatch(fetchLocationsBegin())
    // console.log()
    return id 
    ? fetchData('locations/' + id)
      .then(result => {
        // console.log(result.data)
        dispatch(fetchLocationsSuccess(result))
        return result
      })
    : fetchData('locations')
      .then(result => {
        // console.log(result.data)
        dispatch(fetchLocationsSuccess(result))
        return result
      })
  }
}
