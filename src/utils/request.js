import axios from 'axios'
const uuidv1 = require('uuid/v1')

export const fetchData = async (title) => {
  try {
    const result = await axios.get(`http://localhost:8000/api/v1/${title}/`)
    return result.data.map(elm => ({
      ...elm,
      key: uuidv1()
    }))
  } catch(error) {
    console.error(error)
  }
}