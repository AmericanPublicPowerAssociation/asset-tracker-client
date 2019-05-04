import { config as configureEnvironment } from 'dotenv'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

configureEnvironment()

ReactDOM.render(
  <App />,
  document.getElementById('root'))
