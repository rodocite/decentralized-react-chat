import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAccountData } from './actions'
import * as todo from './todo'
import './App.css'

class App extends Component {
  state = {
    balance: 0,
    stake: 1,
    todos: {},
    user: null
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <div>Account: { this.props.user }</div>
        <div>Balance: { this.props.balance }</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    balance: state.balance
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAccountData: dispatch(getAccountData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
