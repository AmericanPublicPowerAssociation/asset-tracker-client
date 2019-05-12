import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { config as configureEnvironment } from 'dotenv'
import { Map } from 'immutable'
import App from './components/App'
import reduceState from './reducers'


const initialState = Map()
const enhanceStore = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reduceState, initialState,
  enhanceStore(applyMiddleware(thunk)))


configureEnvironment()


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))
