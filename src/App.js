import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPeerCount } from './actions'
import './App.css'

class App extends Component {
  render() {
    const { peerCount } = this.props

    return (
      <div className="App">
        <div>Peer Count: { peerCount }</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { peerCount } = state
  return {
    peerCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPeerCount: dispatch(getPeerCount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
