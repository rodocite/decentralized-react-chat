# React DApp Chat

I wanted to try and create a DApp chat app using React after reading a few Web3 articles.

Using some of the code in this article series as a starting point: https://blog.jaak.io/crossing-over-to-web3-an-introduction-to-decentralised-development-53de470da331

This initial commit integrates React on top of the smart contracts logic.

Use NPM since Yarn doesn't seem compatible with Web3 libraries.

TODO: These commands are not currently in the right order. Just adding them here for notes.
```
brew tap ethereum/ethereum
brew install ethereum
geth --rpc --port 8545 --verbosity 2 --shh --rpccorsdomain "*" --dev
npm install
npm run blockchain
npm start
```

Todo:
- Read up on Whisper model - DHT / messaging and send a message to myself
- Discover message -> Whisper uses "Topics" to discover messages
- Allow multiple nodes to send messages
- Cleanup unused packages