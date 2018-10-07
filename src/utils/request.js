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