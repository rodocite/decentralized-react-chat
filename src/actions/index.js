import shh from '../whisper'

// Adding this here so I can play around with the methods in browser console
window.shh = shh

export const getPeerCount = () => {
  return {
    type: 'PEER_COUNT',
    payload: shh.net.getPeerCount()
  }
}