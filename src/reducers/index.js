export default (state = {message: ''}, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return { ...state, message: [ ...state.message, action.payload ] }
    default:
      return state
  }
}