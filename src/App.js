import React, { Component } from 'react'
import styled from 'styled-components'
import { setName } from './actions'
import { connect } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #262626;
  border: 1px solid #D9D9D9;
  margin: auto;

  @media (min-width: 425px) {
    max-width: 425px;
    max-height: 572px;
  }

  @media (min-width: 768px) {
    margin: 100px auto;
  }
`

const InputContainer = styled.section`
  width: 100%;
  display: flex;
  height: 55px;
  background: white;
`

const ChatInput = styled.input`
  padding: 10px;
  font-size: 14px;
  box-sizing: border-box;
  width: 100%;
  outline: none;
  border: none;
  ::placeholder {
    font-size: 12px;
  }
`

const Chatbox = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: auto;
  word-wrap: break-word;
  background: #f2f2f2;
`

const Message = styled.div`
  display: inline-block;
  font-size: 14px;
  margin-bottom: 10px
  border-radius: 5px;
  background: ${props => props.self ? 'white' : '#D9D9D9'};
  padding: 8px;
  max-width: 100%;
`

const Name = styled.div`
  margin-top: 10px;
  font-size: 12px;
`

const SubscriptionSection = styled.section`
  padding: 15px;
  border-bottom: 1px solid black;
  text-align: center;
  background: #262626;
  color: white;
`

const NamePrompt = styled.div`
  width: 200px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  color: white;
  font-weight: 700;
`

const Button = styled.button`
  padding: 8px;
  margin: 0 10px;
  border-radius: 5px;
  color: white;
  border: none;
  background: rgb(0,122,255);
  outline: none;
  transition: all 0.02s ease-in;

  :active {
    transform: scale(1.05);
    background: green;
  }
`

const RoomHash = styled.div`
  font-size: 12px;
  word-wrap: break-word;
  margin-bottom: 15px;
`

const SendButton = styled.div`
  margin: 5px;
  border-radius: 5px;
  color: white;
  font-size: 12px;
  background: ${props => props.active ? 'rgb(0,122,255)' : '#D9D9D9'};
  padding: 5px;
`

const RoomPrompt = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: #262626;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  color: white;
  font-weight: 700;
  z-index: 2;
  padding: 200px 15px;

  @media (min-width: 425px) {
    max-width: 425px;
    max-height: 572px;
  }
`

class App extends Component {
  state = {
    message: '',
    symKey: null,
    symKeyInput: '',
    name: '',
    copied: false,
    showOverlay: false
  }

  componentDidMount() {
    if (!this.state.symKey && this.props.name) {
      this.subscribe(this.props.symKey)
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

  join

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
        <ChatInput onChange={(e) => this.setState({ symKeyInput: e.target.value })}/>
        <div>
          <Button onClick={() => { this.setState({ showOverlay: false }) }}>Cancel</Button>
          <Button onClick={() => {
            this.subscribe(this.state.symKeyInput)
            this.setState({ showOverlay: false })
          }}>Join Room</Button>
        </div>
      </RoomPrompt>
    )
  }

  render() {
    const { message, name, symKeyID } = this.props

    return name ? (
      <Container>
        { this.state.showOverlay && this.renderOverlay() }
        <SubscriptionSection>
          <RoomHash className="hash">{ this.state.symKey || symKeyID }</RoomHash>
          <CopyToClipboard text={this.state.symKey || symKeyID} onCopy={() => this.setState({copied: true})}>
            <Button>Copy Hash</Button>
          </CopyToClipboard>
          <Button onClick={() => this.setState({ showOverlay: true })}>Switch Rooms</Button>
        </SubscriptionSection>

        <Chatbox>
          { message && message.map((m, index) => {
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
        </Chatbox>

        <InputContainer>
          <ChatInput
            placeholder="Write a message..."
            onChange={(e) => this.setState({ message: e.target.value })}
            onKeyPress={(e) => {
              if (e.key !== 'Enter') return
              this.postMessage(e)
            }}
            value={ this.state.message }
          />
          <SendButton
            onClick={(e) => this.postMessage(e)}
            active={ this.state.message }>Send</SendButton>
        </InputContainer>
      </Container>
    ) : this.renderNamePrompt()
  }
}

const mapStateToProps = (state) => {
  const { message, name } = state
  return {
    name,
    message,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => dispatch(setName(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
