import web3 from './web3'

export const upload = data => {
  return web3.bzz.upload(
    Object.keys(data)
      .map(key => ({
        [`/${key}`]: {
          type: 'text/plain',
          data: JSON.stringify(data[key]),
        },
      }))
      .reduce((o, v) => Object.assign({}, o, v), {})
  )
}

export const download = hash => {
  return web3.bzz.download(hash)
}
