import { GET_CURRENT_SIDE_MENU  } from '../constants/action-types'

export const getCurrentSideMenu = currentSideMenu => ({
  type: GET_CURRENT_SIDE_MENU,
  payload: { currentSideMenu }
})

export const getSideMenu = (path=null) => {
  let indexMenu = ''
  // console.log(path)
  if(path === '/') {
    indexMenu = 0
  } else if (path === '/staff') {
    indexMenu = 1
  } else if (path === '/courses') {
    indexMenu = 2
  } else if (path === '/locations') {
    indexMenu = 3
  } else if (path === '/customers') {
    indexMenu = 4
  }
  // console.log(indexMenu)
  return indexMenu

  // return dispatch => {  
  //   dispatch(getCurrentSideMenu(indexMenu)) 
  //   return indexMenu
  // }
}
