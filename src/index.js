import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import { config as configureEnvironment } from 'dotenv'
import { Map } from 'immutable'
import App from './components/App'
import reduceState from './reducers'
import attributeValidation from './tweens/attributeValidation'
import serverApi from './tweens/serverApi'


const initialState = Map()
const enhanceStore = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reduceState, initialState, enhanceStore(
  applyMiddleware(
    attributeValidation,
    serverApi)))


configureEnvironment()


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))
