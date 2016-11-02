# otlw-forum

A simple forum system DApp, based on [these contracts](https://github.com/otlw/otlw-publish). It allows creating posts, tagging, and replying.

## Set Up
To use this application you will need either to be running [Mist](https://github.com/ethereum/mist/) or have the [MetaMask](https://metamask.io/) extension installed in Chrome. If you want to post large content of your own we also recommend you get [ipfs](https://ipfs.io/) installed as well.

###Mist
You can navigate to either `otlw.co/forum`, or you locally hosted `index.html` to begin using the application.

Remember to set an account in Mist!

##Usage
Through the app you can publish documents, reply to them, and browse tags and users. Each reply costs a small fee which is set upon the creation of the forum contract.

Currently some functionality is not fully built into the application, such as setting sources for a document. If you would like to do this you can explore [these contracts](https://github.com/otlw/otlw-publish), and add the relevant ones to your Ethereum Wallet to use them.

Try navigating to this post: `0x7af8f4e400fcc03bf9485d8f65fa4bce4ce16436`

##Creating a Post and Replying
We use IPFS for content distribution so if you want to post or reply with any content exceeding a 100 words, you need to create a file and use `ipfs add` to store it locally and generate its hash which will look like this.

```
QmbRk7CRhF9Ag2PBrZmTvaP99XsPbE3kkSVTxL4oDgkosu
```
Then submit this hash as the content of your post of reply. You need to also be running `ipfs daemon` so that others can initially access this file.
