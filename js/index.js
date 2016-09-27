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
}
