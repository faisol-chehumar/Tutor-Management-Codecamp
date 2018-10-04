import { createStore, combineReducers, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
import thunk from 'redux-thunk'

const logger = store => next => action => {
  console.group(action.type)
  console.log('current state', store.getState())
  console.log('dispatching', action)
  const result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const middlewares = [thunk, logger]

export const store = createStore(
  combineReducers({
    state: rootReducer
  }),
  applyMiddleware(thunk, ...middlewares)
)