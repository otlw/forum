var forumAddress = '0x41D4a3BCfE926EC4A7Be508ad22f94F785Fc0CCF';
var forumABI = [ { "constant": true, "inputs": [ { "name": "author", "type": "address" } ], "name": "getPostsFromAuthor", "outputs": [ { "name": "", "type": "address[]", "value": [] } ], "type": "function" }, { "constant": false, "inputs": [ { "name": "post", "type": "address" }, { "name": "tagToAdd", "type": "string" } ], "name": "addTag", "outputs": [], "type": "function" }, { "constant": true, "inputs": [ { "name": "post", "type": "address" } ], "name": "getNumberOfTags", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "type": "function" }, { "constant": false, "inputs": [ { "name": "title", "type": "string" }, { "name": "data", "type": "string" } ], "name": "makePost", "outputs": [], "type": "function" }, { "constant": false, "inputs": [ { "name": "title", "type": "string" }, { "name": "data", "type": "string" }, { "name": "replyTo", "type": "address" } ], "name": "makeReply", "outputs": [], "type": "function" }, { "constant": true, "inputs": [ { "name": "tagName", "type": "string" } ], "name": "getPostsFromTag", "outputs": [ { "name": "", "type": "address[]", "value": [] } ], "type": "function" }, { "constant": true, "inputs": [ { "name": "post", "type": "address" }, { "name": "i", "type": "uint256" } ], "name": "getTagFromPosts", "outputs": [ { "name": "", "type": "string" } ], "type": "function" }, { "constant": true, "inputs": [], "name": "getReplyCost", "outputs": [ { "name": "", "type": "uint256", "value": "1000000000000000" } ], "type": "function" }, { "constant": true, "inputs": [ { "name": "post", "type": "address" } ], "name": "getTitle", "outputs": [ { "name": "", "type": "string", "value": "" } ], "type": "function" }, { "constant": true, "inputs": [ { "name": "post", "type": "address" } ], "name": "getReplies", "outputs": [ { "name": "", "type": "address[]", "value": [] } ], "type": "function" }, { "inputs": [ { "name": "forumName", "type": "string", "index": 0, "typeShort": "string", "bits": "", "displayName": "forum Name", "template": "elements_input_string", "value": "otlw" }, { "name": "cost", "type": "uint256", "index": 1, "typeShort": "uint", "bits": "256", "displayName": "cost", "template": "elements_input_uint", "value": "1000000000000000" } ], "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_postAddress", "type": "address" } ], "name": "PostMade", "type": "event" } ];
var documentABI =  [{"constant":false,"inputs":[],"name":"getTotalWeight","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"pay","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getData","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"weight","type":"uint256"}],"name":"setAuthorWeight","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"source","type":"address"},{"name":"weight","type":"uint256"}],"name":"addSource","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"source","type":"address"},{"name":"newValue","type":"uint256"}],"name":"modifySourceWeight","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"payout","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"source","type":"address"}],"name":"removeSource","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getAuthors","outputs":[{"name":"","type":"address[]"}],"type":"function"},{"constant":false,"inputs":[{"name":"newAuthors","type":"address[]"}],"name":"modifyAuthor","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"requestedAddress","type":"address"}],"name":"getWeight","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[{"name":"dataHash","type":"string"},{"name":"authorAddresses","type":"address[]"}],"type":"constructor"}];
var textContent;

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send( null );
    }
}

function getTags(address, divID) {
  forum = web3.eth.contract(forumABI).at(forumAddress);

  var tags = []
  forum.getNumberOfTags(address, function(error, result) {
    for( k = 0; k < result; k++) {
      forum.getTagFromPosts(address, k, function(error, result) {
        tags.push('<a href = tag.html?query='+result+">"+result+"</a>");
        document.getElementById(divID).innerHTML = "Tagged with: " + tags;
      })
    }
  })
}

function getTitle(address, divID) {
  forum = web3.eth.contract(forumABI).at(forumAddress);

  forum.getTitle(address, function(err, res){
    if(err){
      document.getElementById(divID).textContent = "Can't retrieve title"
    }
    document.getElementById(divID).textContent = res;
  })
}


function getContent (address, divId) {
  document.getElementById(divId).innerHTML = "Loading IPFS Content";
  documentContract.at(address).getData(function(error, hash) {
    console.log(hash)
    url = "https://gateway.ipfs.io/ipfs/" + hash
    var gateway = new HttpClient();
    if (hash.substring(0,2)=='Qm') {
      gateway.get(url, function(data, err) {
        htmlContent = markdown.toHTML(data)
        document.getElementById(divId).innerHTML = htmlContent;
      })
    }
    else{
      htmlContent = markdown.toHTML(hash)
      document.getElementById(divId).innerHTML = htmlContent;
    }
  });

}

function publish(title, data) {
  forum = web3.eth.contract(forumABI).at(forumAddress);
  if (web3.eth.accounts && web3.eth.accounts.length > 0) {

      // Create a dialog requesting the transaction
      forum.makePost(title, data, [web3.eth.accounts[0]], {from: web3.eth.accounts[0]}, function(error, result){
        if(error) {
          console.log(error);
          return;
          }
        else {
          return;
          }
        })
    } else {
      console.log('callbacks', mist.callbacks);
      mist.requestAccount(function(e, account) {
          console.log('return account', e, account);
          if(!e) {
              // Create a dialog requesting the transaction
              forum.makePost(title, data, [web3.eth.accounts[0]], {from: web3.eth.accounts[0]}, function(error, result){
                if(error) {
                  console.log(error);
                  return;
                  }
                else {
                  return;
                  }
                })
          }
      });
      console.log('callbacks', mist.callbacks);

    }
}

function reply(title, data, replyTo) {
  forum = web3.eth.contract(forumABI).at(forumAddress);

  forum.getReplyCost( function(error, result) {
    if (web3.eth.accounts && web3.eth.accounts.length > 0) {
        // Create a dialog requesting the transaction
        forum.makeReply(title, data, replyTo, {from: web3.eth.accounts[0], value: result}, function(error, result){
          if(error) {
            console.log(error);
            return;
            }
          else {
            return;
            }
        });

      } else {
        console.log('callbacks', mist.callbacks);
        mist.requestAccount(function(e, account) {
            console.log('return account', e, account);
            if(!e) {
                // Create a dialog requesting the transaction
                forum.makeReply(title, data, replyTo, {from: web3.eth.accounts[0], value: result}, function(error, result){
                  if(error) {
                    console.log(error);
                    return;
                    }
                  else {
                    return;
                    }
                });
            }
        });
        console.log('callbacks', mist.callbacks);

      }

  });
}

function tagPost(address, tag){
  forum = web3.eth.contract(forumABI).at(forumAddress);

  if (web3.eth.accounts && web3.eth.accounts.length > 0) {
      // Create a dialog requesting the transaction
      forum.addTag(address, tag, {from: web3.eth.accounts[0]});

    } else {
      console.log('callbacks', mist.callbacks);
      mist.requestAccount(function(e, account) {
          console.log('return account', e, account);
          if(!e) {
              // Create a dialog requesting the transaction
              forum.addTag(address, tag, {from: web3.eth.accounts[0]});
          }
      });
      console.log('callbacks', mist.callbacks);
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
