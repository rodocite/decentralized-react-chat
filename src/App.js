import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Container = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid black;
`
const InputContainer = styled.section`
  box-sizing: border-box;
  width: 100%;
`
const ChatBorder = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-top: 1px solid black;
`

const ChatInput = styled.input`
  padding: 10px;
  font-size: 18px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 10px;
  ::placeholder {
    font-size: 15px;
  }
`

const Chatbox = styled.div`
  box-sizing: border-box;
  height: 300px;
  width: 100%;
  overflow-y: auto;
  word-wrap: break-word;
`

const Message = styled.div`
  padding: 5px 10px 5px 10px;
`

const SubscriptionSection = styled.section`
  padding: 15px;
  border-bottom: 1px solid black;
  text-align: center;
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

  postMessage(e) {
    if (e.key !== 'Enter') return
    const { postMessage, publicKey } = this.props
    const symKey = this.state.symKey || this.props.symKey
    postMessage(this.state.message, symKey, publicKey)
    this.setState({ message: '' })
  }

  render() {
    const { symKeyID, message } = this.props
    return (
      <Container>
        <SubscriptionSection>
          <div>{ this.state.symKey || symKeyID }</div>
          <InputContainer>
            <input onChange={(e) => this.setState({ symKeyInput: e.target.value })} />
            <button onClick={(e) => this.subscribe(this.state.symKeyInput)}>Change Room</button>
          </InputContainer>
        </SubscriptionSection>

        <Chatbox>
          { message && message.map((m, index) => {
              return <Message key={index}>{m}</Message>
            })
          }
        </Chatbox>

        <InputContainer>
          <ChatBorder>
            <ChatInput
              placeholder="Write a message..."
              onChange={(e) => this.setState({ message: e.target.value })}
              onKeyPress={ (e) => this.postMessage(e) }
              value={ this.state.message }
            />
          </ChatBorder>
        </InputContainer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { message, signature } = state
  console.log(signature)
  return {
    message,
    signature
  }
}

export default connect(mapStateToProps)(App)
