function init() {
  var noWeb3 = document.getElementById('noWeb3')
  replyTo = decodeURI(getParameterByName('query'));

  // Web3 Initialization
  window.addEventListener('load', function() {
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
  })

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
