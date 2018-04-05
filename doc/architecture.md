# Architecture

## `/app`
- `/contracts` - Contract ABI interface files
- `/js` - JavaScript files 🍦

## `/config`
- `contracts.deploy.config.js` - Configuration file for contract deployment
- `sulk.config.js` - Configuration file for contract compilation using
  `[sulk](https://github.com/lukehedger/sulk)`

## `/contracts`
- `*.sol` - Solidity contract files
- `addresses.json` - Deployed contract addresses
- `contracts.json` - Compiled contract output

## `/dist`
- HTML/CSS/JS files are bundled using [Parcel](https://parceljs.org/). Parcel
  also has a handy development server that reloads whenever your code changes.

## `/scripts`
- `deploy-contracts.js` - Contract deployment script using
  `[Web3.js](https://github.com/ethereum/web3.js)`

## `/test`
- `todo.spec.js` - Contract unit tests using
  `[jest](https://facebook.github.io/jest/)`
