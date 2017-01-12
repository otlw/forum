function init() {
  postAddress = decodeURI(getParameterByName('query'));

  var forum = web3.eth.contract(forumABI).at(forumAddress);

  document.getElementById('home-user').href = "user.html?query=" + web3.eth.accounts[0];

  // Loading the contracts
  documentContract = web3.eth.contract(documentABI);
  forum = web3.eth.contract(forumABI).at(forumAddress);

  if (typeof postAddress == 'undefined' || postAddress == 'null' || postAddress === '') {
    document.getElementById("proposal").textContent = "Not a document";
  }
  else {
    getContent(postAddress, "bodyContent");

    getTitle(postAddress, "title")

    documentContract.at(postAddress).getAuthors( function (error, result) {
      document.getElementById('author').innerHTML = "by <a href='user.html?query=" + result[0] + "'>"+result[0]+"</a>";
    });
    getTags(postAddress, 'tags');

    //Get replies
    forum.getReplies(postAddress, function(error, result) {
      if (result.length === 0) {
        console.log("no replies")
        noreplies = document.createElement('div');
        noreplies.textContent = "No Replies";
        document.getElementById('replies').appendChild(noreplies);
      }
      else {
        for (i = 0; i < result.length; i++) {
          console.log(result);

          reply = document.createElement("fieldset");
          reply.className = "comments";
          reply.id = "reply" + i.toString();

          replyTitle = document.createElement('legend');
          replyTitle.className = "header"
          replyTitle.id = reply.id + "Title";
          getTitle(result[i], replyTitle.id);

          replyAuthor = document.createElement('div');
          replyAuthor.className = "subtitle";
          replyAuthor.id = reply.id + "Author";

          documentContract.at(postAddress).getAuthors( function (error, result) {
            document.getElementById(replyAuthor.id).innerHTML = "by <a href='user.html?query=" + result[0] + "'>"+result[0]+"</a>";
          });

          content = document.createElement("div");
          content.id = reply.id + "Content";

          numberOfReplies = document.createElement('a');
          numberOfReplies.className = "subtitle";
          numberOfReplies.href = "page.html?query="+result[i];
          numberOfReplies.style = "float: right;";

          forum.getReplies(result[i], function(error, result){
            numberOfReplies.textContent = result.length.toString() + " reply[s]";
          });

          document.getElementById('replies').appendChild(reply);

          reply.appendChild(replyTitle);
          reply.appendChild(replyAuthor);
          reply.appendChild(content);
          reply.appendChild(numberOfReplies);

          getContent(result[i], content.id);
          }
        }
    });
  }

    var replyButton = document.getElementById('new-reply');
    replyButton.onclick = function() {
      window.location.href = 'reply.html?query='+ postAddress;
    }
    var tipButton = document.getElementById('tip');
    tipButton.onclick = function(){
      documentContract.at(postAddress).getAuthors( function (error, result) {
        sendTransaction(result[0], web3.toWei(0.01, "ether"))
      })
    }
  }
