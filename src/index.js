import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import promiseMiddleware from 'redux-promise';
import reducers from './reducers'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(
  reducers,
  applyMiddleware(promiseMiddleware)
)

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
