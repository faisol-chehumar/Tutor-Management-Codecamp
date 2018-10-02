import { ADD_STAFF } from "../constants/action-types"

export const addStaff = staff => ({ 
  type: ADD_STAFF,
  payload: staff
})