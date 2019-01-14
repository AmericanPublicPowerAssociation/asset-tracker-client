import React from 'react'
import ReactDOM from 'react-dom'
import rootReducer from './reducers'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import thunk from 'redux-thunk'

const enhanceStore = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  enhanceStore(applyMiddleware(thunk)),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
