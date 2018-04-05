#React DApp Chat

I wanted to try and create a DApp chat app using React after reading a few Web3 articles.

Using some of the code in this article series as a starting point: https://blog.jaak.io/crossing-over-to-web3-an-introduction-to-decentralised-development-53de470da331

This initial commit integrates React on top of the smart contracts logic.

Use NPM since Yarn doesn't seem compatible with Web3 libraries.
```
npm install
npm run blockchain
npm start
```

Todo:
- Get Swarm to work for storage of chats
- Think about staking, GAS, and how it relates to messaging
