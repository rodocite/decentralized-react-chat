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
import { toAscii, toHex } from './utils'

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
    symKeyID: "70177e2cd480258bafc10630903460b12344cbb79da77e83c44570d0d16e6803",
    topics: ['0xffaadd11']
  })
  .on('data', (message) => {
    store.dispatch(latestMessage(toAscii(message.payload)))
  })

  return identities
})
.then((identities) => {
  const postMessage = (message) => {
    shh.post({
      symKeyID: "70177e2cd480258bafc10630903460b12344cbb79da77e83c44570d0d16e6803",
      sig: identities[1],
      ttl: 10,
      topic: '0xffaadd11',
      payload: toHex(message),
      powTime: 3,
      powTarget: 0.5
    })
  }

  ReactDOM.render(
    <Provider store={ store }>
      <App postMessage={ postMessage } />
    </Provider>,
    document.getElementById('root')
  )
})

registerServiceWorker()
