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

##Creating a Post and Replying
We use IPFS for content distribution so if you want to post or reply with any content exceeding a 100 words, you need to create a file and use `ipfs add` to store it locally and generate its hash. Then submit this hash as the content of your post of reply. You need to also be running `ipfs daemon` so that others can access this file. 

##Support
We're a small development team, and we're entirely self-funded. Which means we literally used our only ether to deploy this contract. So any help, whether in the form of donations or pull requests, is much appreciated.

For the former, our eth address is: `0x60c4dC9a557f7FF2E89ad791bAc53D42b51EeE03` and our btc address is `1CV8AKrgNgMZXw26saLtdj7r6p51XeCrfj`
