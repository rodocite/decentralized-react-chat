export default (state = {}, action) => {
  switch (action.type) {
    case 'ACCOUNT_DATA':
      return {...state, ...action.payload }
    default:
      return state
  }
}