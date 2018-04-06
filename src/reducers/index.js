export default (state = {}, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return { ...state, message: action.payload }
    default:
      return state
  }
}