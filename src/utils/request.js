import axios from 'axios'
const uuidv1 = require('uuid/v1')
const apiUrl = 'localhost'
const apiPort = '8000'

export const fetchData = async (title) => {
  // console.log(`http://${apiUrl}:${apiPort}/api/v1/${title}`)
  try {
    const result = await axios.get(`http://${apiUrl}:${apiPort}/api/v1/${title}`)
    return result.data.length >= 1 
      ? result.data.map(elm => {
        return ({
          ...elm,
          key: uuidv1()
        })
      })
      : result.data
  } catch(error) {
    console.error(error)
  }
}

export const postData = async (title, payload) => {
  try {
    const result = await axios.post(`http://${apiUrl}:${apiPort}/api/v1/${title}`, {
      firstname: payload.firstname,
      lastname: payload.lastname,
      email: payload.email,
      lat: 12.1234567890,
      lng: 12.1234567890,
      roleId: parseInt(payload.role, 10),
      mandayRate: payload.mandayRate,
      imagePath: payload.imagePath,
      availDayTime: payload.checkboxGroup
    })

    return result
  } catch(error) {
    console.error(error)
  }
}

export const deleteData = async (title, id) => {
  try {
    const result = await axios.delete(`http://${apiUrl}:${apiPort}/api/v1/${title}/${id}`)

    return result
  } catch(error) {
    console.error(error)
  }
}
