import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { config as configureEnvironment } from 'dotenv'
import reduceState from './reducers'
import App from './App'
import * as serviceWorker from './serviceWorker'

const initialState = {}
// const enhanceStore = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reduceState, initialState)

configureEnvironment()
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
serviceWorker.unregister()
