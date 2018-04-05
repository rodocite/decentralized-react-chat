import * as user from '../user'

export const getAccountData = () => {
  return {
    type: 'ACCOUNT_DATA',
    payload: getUser()
  }
}

async function getUser() {
  const accounts = await user.getAccounts()
  const balance = await user.getBalance(accounts[1])

  return {
    balance,
    user: accounts[1]
  }
}