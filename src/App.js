import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Container = styled.div`
  margin: 100px auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const InputContainer = styled.section`
  width: 100%;
`

const Chatbox = styled.div`
  height: 300px;
  width: 100%;
  border: 1px solid;
  overflow-y: auto;
  word-wrap: break-word;
`

const Message = styled.div`
  padding: 5px 10px 5px 10px;
`

const SubscriptionSection = styled.section`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

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
      <Container>
        <Chatbox>
          { message && message.map((m, index) => {
              return <Message key={index}>{m}</Message>
            })
          }
        </Chatbox>

        <InputContainer>
          <input onChange={(e) => this.setState({ message: e.target.value })} value={ this.state.message }></input>
          <button onClick={() => this.postMessage()}>Send</button>
        </InputContainer>

        <InputContainer>
          <input onChange={(e) => this.setState({ symKeyInput: e.target.value })} />
          <button onClick={(e) => this.subscribe(this.state.symKeyInput)}>Change Room</button>
        </InputContainer>

        <SubscriptionSection>
          <div>Subscription Key</div>
          <div>{ this.state.symKey || symKeyID }</div>
        </SubscriptionSection>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { message } = state
  return {
    message
  }
}

export default connect(mapStateToProps)(App)
