import axios from 'axios'
const uuidv1 = require('uuid/v1')

export const fetchData = async (title) => {
  // console.log(`http://localhost:8000/api/v1/${title}`)
  try {
    const result = await axios.get(`http://localhost:8000/api/v1/${title}`)
    return result.data.length >= 1 
      ? result.data.map(elm => {
        // console.log(elm)
        return ({
          ...elm,
          key: uuidv1(),
          staffImage: 'https://placeimg.com/640/480/people',
          courseImage: 'https://placeimg.com/640/480/people'
        })
      })
      : result.data
  } catch(error) {
    console.error(error)
  }
}

export const postData = async (title, payload) => {
  // console.log(`http://localhost:8000/api/v1/${title}`)
  console.log(payload)
  try {
    const result = await axios.post(`http://localhost:8000/api/v1/${title}`, {
      firstname: payload.firstname,
      lastname: payload.lastname,
      email: payload.email,
      lat: 12.1234567890,
      lng: 12.1234567890,
      roleId: 1,
      mandayRate: 800,
      imagePath: 'www.google.com'
    })
    return result
  } catch(error) {
    console.error(error)
  }
}
