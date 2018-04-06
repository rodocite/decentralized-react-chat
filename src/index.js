import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise';
import reducers from './reducers'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { latestMessage } from './actions'

import shh from './whisper'

const store = createStore(
  reducers,
  applyMiddleware(logger),
  applyMiddleware(promiseMiddleware),
)

Promise.all([
  shh.newSymKey(),
  shh.newKeyPair()
])
.then((identities) => {
  shh.subscribe('messages', {
    symKeyID: identities[0],
    topics: ['0xffaadd11']
  })
  .on('data', (message) => {
    store.dispatch(latestMessage(message))
  })

  return identities
})
.then((identities) => {
  const postMessage = (message) => {
    shh.post({
      symKeyID: identities[0],
      sig: identities[1],
      ttl: 10,
      topic: '0xffaadd11',
      payload: message,
      powTime: 3,
      powTarget: 0.5
    })

    shh.getInfo().then(console.log)
  }

  ReactDOM.render(
    <Provider store={ store }>
      <App postMessage={ postMessage } />
    </Provider>,
    document.getElementById('root')
  )
})

registerServiceWorker()
