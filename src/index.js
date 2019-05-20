import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Map } from 'immutable'
import { config as configureEnvironment } from 'dotenv'
import App from './components/App'
import reduceState from './reducers'
import reduceSaga from './sagas'
import validationMiddleware from './tweens/validationMiddleware'


const initialState = Map()
const enhanceStore = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reduceState, initialState, enhanceStore(
  applyMiddleware(
    validationMiddleware,
    sagaMiddleware)))


configureEnvironment()
sagaMiddleware.run(reduceSaga)


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))
