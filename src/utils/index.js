export const toHex = (str) => {
  let hex = ''
  for(let i = 0; i < str.length; i++) {
    hex = hex + '' + str.charCodeAt(i).toString(16)
  }

  return '0x' + hex
}

export const toAscii = (hexx) => {
  const hex = hexx.toString()
  let str = ''

  for (let i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2) {
    str = str + String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  }

  return str
}
