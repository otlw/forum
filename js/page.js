function init() {
  postAddress = decodeURI(getParameterByName('query'));

  var noWeb3 = document.getElementById('noWeb3')
  // IPFS Initialization
  ipfs = window.IpfsApi('localhost', '5001');

  // Web3 Initialization
  if(typeof web3 !== 'undefined' && typeof Web3 !== 'undefined') {
      // If there's a web3 library loaded, then make your own web3
      web3 = new Web3(web3.currentProvider);
  } else if (typeof Web3 !== 'undefined') {
      // If there isn't then set a provider
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  } else if(typeof web3 == 'undefined') {
    // Alert the user he is not in a web3 compatible browser
    console.log("not web3 compatible");
    document.getElementById("noWeb3").style.display = "block";

    return;
  }

  document.getElementById('home-user').href = "user.html?query=" + web3.eth.accounts[0];

  // Loading the contracts
  documentContract = web3.eth.contract(documentABI);
  forum = web3.eth.contract(forumABI).at(forumAddress);

  if (typeof postAddress == 'undefined' || postAddress == 'null' || postAddress === '') {
    document.getElementById("proposal").textContent = "Not a document";
  }
  else {
    getContent(postAddress, "bodyContent");
    document.getElementById("title").textContent = getTitle(postAddress);
    author = documentContract.at(postAddress).getAuthors()[0]
    document.getElementById('author').innerHTML = "by <a href='user.html?query=" + author + "'>"+author+"</a>";
    document.getElementById('tags').innerHTML = "Tagged with: " + getTags(postAddress);

    //Get replies
    var replies = getReplies(postAddress);
    if (replies.length === 0) {
      console.log("no replies")
    }
    else {
      for (i = 0; i < replies.length; i++) {
        console.log(replies);


        reply = document.createElement("div");
        reply.className = "comments";
        reply.id = "reply" + i.toString();

        replyTitle = document.createElement('h1');
        replyTitle.className = "header"
        replyTitle.id = reply.id + "Title";
        replyTitle.textContent = getTitle(replies[1]);

        replyAuthor = document.createElement('div');

        replyAuthor.className = "subtitle";
        author = documentContract.at(replies[i]).getAuthors()[0];
        replyAuthor.innerHTML = "by <a href='user.html?query=" + author + "'>"+ author+"</a>";

        content = document.createElement("div");
        content.id = reply.id + "Content";

        numberOfReplies = document.createElement('a');
        numberOfReplies.className = "subtitle";
        numberOfReplies.href = "page.html?query="+replies[i];
        numberOfReplies.style = "float: right;";
        numberOfReplies.textContent = getReplies(replies[i]).length.toString() + " reply[s]";

        document.getElementById('replies').appendChild(reply);

        reply.appendChild(replyTitle);
        reply.appendChild(replyAuthor);
        reply.appendChild(content);
        reply.appendChild(numberOfReplies);

        getContent(replies[i], content.id);
        }
      }
    }

    var replyButton = document.getElementById('new-reply');
    replyButton.onclick = function() {
      window.location.href = 'reply.html?query='+ postAddress;
    }

  }
