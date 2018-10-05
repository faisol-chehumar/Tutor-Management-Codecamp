import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
// import { store } from './stores/'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import staffReducer from './reducers/staffReducer'
import thunk from 'redux-thunk'


// console.log(rootReducer)
const store = createStore(combineReducers({staff: staffReducer}), applyMiddleware(thunk))
console.log(store.getState())
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()