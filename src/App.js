import React, { Component } from 'react'
import styled from 'styled-components'
import { setName } from './actions'
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
  border-top: 1px solid gray;
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
  background: #f2f2f2;
`

const Message = styled.div`
  display: inline-block;
  margin-bottom: 10px
  border-radius: 5px;
  background: #D9D9D9;
  padding: 10px;
  max-width: 100%;
`

const Name = styled.div`
  margin-top: 10px;
`

const SubscriptionSection = styled.section`
  border-bottom: 1px solid black;
  text-align: center;
`

const NamePrompt = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto 0;
`

const Button = styled.button`
  padding: 10px;
  color: white;
  font-size: 20px;
  border-radius: 10px;
  background: green;
`

class App extends Component {
  state = {
    message: '',
    symKey: null,
    symKeyInput: null,
    name: ''
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
    postMessage(this.props.name, this.state.message, symKey, publicKey)
    this.setState({ message: '' })
  }

  renderNamePrompt() {
    return (
      <Container>
        <NamePrompt>
          <input onChange={(e) => this.setState({ name: e.target.value })}/>
          <Button onClick={() => this.props.setName(this.state.name)}>Let's chat!</Button>
        </NamePrompt>
      </Container>
    )
  }

  render() {
    const { message, name, symKeyID } = this.props
    return name ? (
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
              const decapsulation = m.split('!encapsulation!')
              const name = decapsulation[1]
              const msg = decapsulation[0]

              return (
                <div key={ index }>
                  <Name>{ name }</Name>
                  <Message>{ msg }</Message>
                </div>
              )
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
