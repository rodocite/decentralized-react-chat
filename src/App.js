import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'

class App extends Component {
  componentDidMount() {
    const { postMessage } = this.props

    // So I can test out sending messages to geth
    window.pp = postMessage
  }

  render() {
    const { message } = this.props
    return (
      <div className="App">
        <div>{ message && message }</div>
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
