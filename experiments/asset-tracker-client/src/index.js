import React from 'react'
import ReactDOM from 'react-dom'
import { config as configureEnvironment } from 'dotenv'
import App from './App'
import * as serviceWorker from './serviceWorker'

configureEnvironment()
ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()
