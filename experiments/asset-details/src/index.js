import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { config as configureEnvironment } from 'dotenv'
import reduceState from './reducers'
import reduceSaga from './sagas'
import App from './components/App'
// import * as serviceWorker from './bits/serviceWorker'

const initialState = {}
const enhanceStore = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reduceState, initialState, enhanceStore(
  applyMiddleware(
    sagaMiddleware)))

configureEnvironment()
sagaMiddleware.run(reduceSaga)
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'))
// serviceWorker.unregister()
