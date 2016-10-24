function init() {
  replyTo = decodeURI(getParameterByName('query'));

  document.getElementById('home-user').href = "user.html?query=" + web3.eth.accounts[0];

  document.getElementById('publish').onclick = function() {
    title = document.getElementById('new-document-title').value;
    content = document.getElementById('new-document-content').value;
    publish(title, content);
  }
  document.getElementById('search-tag').onkeyup= function (e) {
    if (e.keyCode == 13) {
        window.location.href = 'tag.html?query=' +  document.getElementById('search-tag').value;
    }
  }
  document.getElementById('search-post').onkeyup = function (e) {
    if (e.keyCode == 13 ){
      window.location.href = 'page.html?query=' + document.getElementById('search-post').value;
    }
  }

  forum = web3.eth.contract(forumABI).at(forumAddress);
  var postMade = forum.PostMade({}, {fromBlock: 0, toBlock: 'latest'});
  postMade.watch(function(error, result){
    var postLink = document.createElement('a');
    postLink.href = "page.html?query="+result.args._postAddress;
    postLink.id = "post" + result.args._postAddress;
    postLink.style = "text-decoration: none;";
    var post = document.createElement("fieldset");
    postTitle = document.createElement('span')
    postTitle.id = post.id + "title";
    forum.getTitle(result.args._postAddress, function(error, result) {
      postTitle.textContent = result;
    });
    var numberOfReplies = document.createElement('span');
    numberOfReplies.className = "subtitle";
    numberOfReplies.href = "page.html?query="+result.args._postAddress;
    numberOfReplies.style = "float: right;";
    forum.getReplies(result.args._postAddress, function(err, res){
      numberOfReplies.innerHTML = res.length.toString() + " reply[s]";
    });

    document.getElementById("latest").appendChild(postLink)
    postLink.appendChild(post);
    post.appendChild(postTitle);
    post.appendChild(numberOfReplies);
  })
}
