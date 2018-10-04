import axios from 'axios'

export const fetchData = async (title) => {
  try {
    const result = await axios.get(`http://localhost:8000/api/v1/${title}/`)
    return result.data
  } catch(error) {
    console.error(error)
  }
}