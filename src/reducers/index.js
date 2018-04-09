export default (state = {message: ''}, action) => {
  switch (action.type) {
    case 'NAME':
      window.sessionStorage.setItem('name', action.payload)
      return { ...state, name: action.payload }
    case 'SUBSCRIPTION':
      return { ...state, subscription: action.payload }
    case 'MESSAGE':
      return { ...state, message: [ ...state.message, action.payload ] }
    default:
      return state
  }
}