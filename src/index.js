import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import promiseMiddleware from 'redux-promise';
import reducers from './reducers'
import App from './App'
import { latestMessage, setName } from './actions'
import { toAscii, toHex } from './utils'
import './global.styles.css'

import shh from './whisper'

const store = createStore(
  reducers,
  applyMiddleware(promiseMiddleware)
)

Promise.all([
  shh.newSymKey(),
  shh.newKeyPair()
])
.then((identities) => {
  const sessionName = window.sessionStorage.getItem('name')

  if (sessionName) {
    store.dispatch(setName(sessionName))
  }

  const subscribe = (symKeyID = identities[0], name) => {
    console.log(name, 'asdff')
    store.dispatch(setName(name))

    shh.subscribe('messages', {
      symKeyID,
      topics: ['0xffaadd11']
    })
    .on('data', (message) => {
      store.dispatch(latestMessage(toAscii(message.payload)))
    })
  }

  const postMessage = (name, message, symKeyID = identities[0], publicKey = identities[1]) => {
    if (message === '' || message === null || message === undefined) return

    shh.post({
      symKeyID,
      sig: publicKey,
      ttl: 10,
      topic: '0xffaadd11',
      payload: toHex(message + '!encapsulation!' + name),
      powTime: 3,
      powTarget: 0.5
    })
  }

  ReactDOM.render(
    <Provider store={ store }>
      <App
        postMessage={ postMessage }
        subscribe={ subscribe }
        symKeyID={ identities[0] }
        publicKey={ identities[1] }
      />
    </Provider>,
    document.getElementById('root')
  )
})