import { FETCH_UPLOAD_IMAGES  } from "../constants/action-types"

export const uploadImageSuccess = url => ({
  type: FETCH_UPLOAD_IMAGES,
  payload: { url }
})

export const uploadImage = (url=null) => {
  // console.log(url)
  return dispatch => {
    dispatch(uploadImageSuccess(url))
    return url 
  }
}


