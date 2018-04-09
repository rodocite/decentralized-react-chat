export const latestMessage = (message) => ({ type: 'MESSAGE', payload: message })
export const setName = (name) => ({ type: 'NAME', payload: name })
export const setSubscription = (symKeyID) => ({ type: 'SUBSCRIPTION', payload: symKeyID })