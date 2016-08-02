# otlw-forum

A simple forum system DApp, based on [these contracts](https://github.com/otlw/otlw-publish), and add the relevant ones to your Ethereum Wallet to use them. .

## Set Up
To use this application you will need [Mist](https://github.com/ethereum/mist/) and [IPFS](https://ipfs.io) installed locally.

### IPFS
Once you have downloaded IPFS you need to run `ipfs init` followed by `ipfs daemon` to run the local IPFS server.

If you wish to use the app hosted at otlw.co, you will need to first whitelist the domain in IPFS through.
```bash
$ ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"http://otlw.co\"]"
```

If you don't want to trust our hosting you can host the application yourself locally, by cloning this repo. Hopefully future intergration between Mist and IPFS will negate the need for to whitelist.

###Mist
Once you have IPFS set up you can navigate to either `otlw.co/forum`, or you locally hosted `index.html` to begin using the application.

Remember to set an account in Mist!

##Usage
Through the app you can publish documents, reply to them, and browse tags and users. Each reply costs a small fee which is set upon the creation of the forum contract.

Currently some functionality is not fully built into the application, such as setting sources for a document. If you would like to do this you can explore [these contracts](https://github.com/otlw/otlw-publish), and add the relevant ones to your Ethereum Wallet to use them.

Try navigating to this post: `0x7af8f4e400fcc03bf9485d8f65fa4bce4ce16436`
