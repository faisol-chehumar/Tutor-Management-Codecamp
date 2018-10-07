const { customers } = require('../repository')
const {AppError} = require('../util')

async function list(options) {
  
  const [ CustomerList ] = await Promise.all([ 
    customers.get(options)
  ])

  return CustomerList
}

async function create(CustomerData) {
  if(await isDuplicate(CustomerData.email)) {
    throw new AppError('Email is already use', 400)
  }
  
  // const mapMarkerId = await mapMarkers.insert(CustomerData)
  const result = await customer.insert(CustomerData)

  return result.insertId
}

async function remove(option) {
  await customers.remove(option)
  return
}

async function isDuplicate(email) {
  const result = (await customers.get()).filter(Customer => Customer.email === email)
  return result.length >= 1
}

module.exports = {
  list,
  create,
  remove
}
