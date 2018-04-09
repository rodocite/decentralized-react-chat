import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import { setName } from './actions'
import { connect } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'

class App extends Component {
  state = {
    copied: false,
    message: '',
    name: '',
    showOverlay: false,
    symKey: null,
    symKeyInput: ''
  }

  componentDidMount() {
    if (this.props.name) {
      this.subscribe(this.props.symKey)
    }
  }

  componentDidUpdate(newProps, state) {
    const chatboxEl = findDOMNode(this.chatbox)

    if (this.props.name !== newProps.name) {
      this.subscribe(this.props.symKey)
    }

    if (this.props.message.length !== newProps.message.length) {
      chatboxEl.scrollTo(0, chatboxEl.scrollHeight)
    }
  }

  subscribe(symKey) {
    this.props.subscribe(symKey, this.props.name)
    this.setState({ symKey, symKeyInput: '' })
  }

  postMessage(e) {
    const { postMessage, publicKey } = this.props
    const symKey = this.state.symKey || this.props.symKey
    postMessage(this.props.name, this.state.message, symKey, publicKey)
    this.setState({ message: '' })
  }

  showOverlay(show) {
    this.setState({ showOverlay: show })
  }

  renderNamePrompt() {
    return (
      <Container>
        <NamePrompt>
          <div>What's your name?</div>
          <ChatInput onChange={(e) => this.setState({ name: e.target.value })}/>
          <Button onClick={() => this.props.setName(this.state.name)}>Start Chat</Button>
        </NamePrompt>
      </Container>
    )
  }

  renderOverlay() {
    return (
      <RoomPrompt>
        <div>Enter Room Hash</div>
        <ChatInput onChange={(e) => this.setState({ symKeyInput: e.target.value })} />
        <div>
          <Button onClick={() => this.showOverlay(false)}>Cancel</Button>
          <Button onClick={() => {
            if (this.props.subscription !== this.state.symKeyInput)
            this.subscribe(this.state.symKeyInput)
            this.showOverlay(false)
          }}>Join Room</Button>
        </div>
      </RoomPrompt>
    )
  }

  renderMessages() {
    const { message } = this.props

    return message && message.map((m, index) => {
      const decapsulation = m.split('!encapsulation!')
      const name = decapsulation[1]
      const msg = decapsulation[0]

      return (
        <div key={ index }>
          <Name>{ name }</Name>
          <Message self={ this.props.name !== name }>{ msg }</Message>
        </div>
      )
    })
  }

  render() {
    const { name, symKeyID } = this.props

    return name ? (
      <Container>
        { this.state.showOverlay && this.renderOverlay() }

        <SubscriptionSection>
          <RoomHash className="hash">{ this.state.symKey || symKeyID }</RoomHash>
          <CopyToClipboard
            text={ this.state.symKey || symKeyID }
            onCopy={() => this.setState({copied: true})}
          >
            <Button>Copy Hash</Button>
          </CopyToClipboard>
          <Button onClick={() => this.showOverlay(true)}>Switch Rooms</Button>
        </SubscriptionSection>

        <Chatbox ref={(el) => this.chatbox = el}>
          { this.renderMessages() }
        </Chatbox>

        <InputContainer>
          <ChatInput
            placeholder="Write a message..."
            onChange={(e) => this.setState({ message: e.target.value })}
            value={ this.state.message }
            onKeyPress={(e) => {
              if (e.key !== 'Enter') return
              this.postMessage(e)
            }}
          />

          <SendButton
            onClick={(e) => this.postMessage(e)}
            active={ this.state.message }>Send</SendButton>
        </InputContainer>
      </Container>
    ) : this.renderNamePrompt()
  }
}

const Container = styled.div`
  background: #262626;
  border: 1px solid #D9D9D9;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: auto;

  @media (min-width: 425px) {
    max-height: 572px;
    max-width: 425px;
  }

  @media (min-width: 768px) {
    margin: 100px auto;
  }
`

const InputContainer = styled.section`
  background: white;
  display: flex;
  height: 55px;
  width: 100%;
`

const ChatInput = styled.input`
  border: none;
  box-sizing: border-box;
  font-size: 14px;
  outline: none;
  padding: 10px;
  width: 100%;

  ::placeholder {
    font-size: 12px;
  }
`

const Chatbox = styled.div`
  background: #f2f2f2;
  height: 100%;
  overflow-y: auto;
  padding: 10px;
  width: 100%;
  word-wrap: break-word;
`

const Message = styled.div`
  background: ${props => props.self ? 'white' : '#D9D9D9'};
  border-radius: 5px;
  display: inline-block;
  font-size: 14px;
  margin-bottom: 10px
  max-width: 100%;
  padding: 8px;
`

const Name = styled.div`
  font-size: 12px;
  margin-top: 10px;
`

const SubscriptionSection = styled.section`
  background: #262626;
  border-bottom: 1px solid black;
  color: white;
  padding: 15px;
  text-align: center;
`

const NamePrompt = styled.div`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  height: 150px;
  justify-content: space-around;
  margin: auto;
  width: 200px;
`

const Button = styled.button`
  background: rgb(0,122,255);
  border-radius: 5px;
  border: none;
  color: white;
  margin: 0 10px;
  outline: none;
  padding: 8px;
  transition: all 0.02s ease-in;

  :active {
    transform: scale(1.05);
    background: green;
  }
`

const RoomHash = styled.div`
  font-size: 12px;
  margin-bottom: 15px;
  word-wrap: break-word;
`

const SendButton = styled.div`
  align-items: center;
  background: ${props => props.active ? 'rgb(0,122,255)' : '#D9D9D9'};
  border-radius: 5px;
  color: white;
  display: flex;
  font-size: 12px;
  justify-content: center;
  margin: 5px;
  padding: 5px;
`

const RoomPrompt = styled.div`
  align-items: center;
  background: #262626;
  color: white;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  height: 100vh;
  justify-content: space-between;
  margin: auto;
  padding: 200px 15px;
  position: fixed;
  width: 100vw;
  z-index: 2;

  @media (min-width: 425px) {
    max-width: 425px;
    max-height: 572px;
  }
`

const mapStateToProps = (state) => {
  const { subscription, message, name } = state

  return {
    subscription,
    name,
    message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => dispatch(setName(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
