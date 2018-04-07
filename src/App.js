import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`

const InputContainer = styled.section`
  width: 100%;
`
const ChatBorder = styled.div`
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
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: auto;
  word-wrap: break-word;
`

const Message = styled.div`
`

const SubscriptionSection = styled.section`
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
          {/* <div>{ this.state.symKey || symKeyID }</div> */}
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
