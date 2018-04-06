export const latestMessage = (message) => {
  return {
    type: 'MESSAGE',
    payload: message
  }
}