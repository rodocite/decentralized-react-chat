export default (state = {}, action) => {
  switch (action.type) {
    case 'PEER_COUNT':
      return {...state, peerCount: action.payload }
    default:
      return state
  }
}