import { fetchStaff } from './staffActions'
import { fetchCourses } from './coursesActions'
import { fetchLocations } from './locationsActions'
import { fetchCustomers } from './customersActions'

const actions = {
  fetchStaff,
  fetchCourses,
  fetchLocations,
  fetchCustomers
}

export default {...actions} 