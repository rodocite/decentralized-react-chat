import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'

class App extends Component {
  state = {
    message: '',
    symKey: null,
    symKeyInput: null,
  }

  componentDidMount() {
    if (!this.state.symKey) {
      this.subscribe(this.props.symKey)
    }
  }

  subscribe(symKey) {
    this.props.subscribe(symKey)
    this.setState({ symKey })
  }

  postMessage() {
    const { postMessage, publicKey } = this.props
    const symKey = this.state.symKey || this.props.symKey
    postMessage(this.state.message, symKey, publicKey)
  }

  render() {
    const { symKeyID, message } = this.props
    return (
      <div className="App">
        { message && message.map((m, index) => {
            return <div key={index}>{m}</div>
          })
        }
        <input onChange={(e) => this.setState({ message: e.target.value })} value={ this.state.message }></input>
        <button onClick={() => this.postMessage()}>Send</button>
        <input onChange={(e) => this.setState({ symKeyInput: e.target.value })} />
        <button onClick={(e) => this.subscribe(this.state.symKeyInput)}>Change Room</button>
        <div>Subscription Key: { this.state.symKey || symKeyID }</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { message } = state
  return {
    message
  }
}

export default connect(mapStateToProps)(App);
