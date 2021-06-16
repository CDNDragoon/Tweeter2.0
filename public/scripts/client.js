const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

let createTweetElement = function(obj) {
  let htmlUnit = `
  <article>
    <header>
      <img class="profile-placeholder" src="${obj.user.avatars}"> 
      <h4 class="users-name">${obj.user.name}</h4>
      <h5 class="user-handle">${obj.user.handle}</h5>
    </header>
    <body><div class='tweet-body'>
      ${obj.content.text}
    </div></body>
    <footer>
      <div class="timestamp">
      <label>${timeago.format(obj.created_at)}</label>
      </div>
      <div class="user-buttons">
      <i class="far fa-thumbs-up fa-lg"></i>
      <i class="fas fa-recycle fa-lg"></i>
      <i class="far fa-keyboard fa-lg"></i>
    </div>
    </footer>
  </article>`
  return htmlUnit;
};

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const newhtmlUnit = createTweetElement(tweet);
    $('.tweetcontainer').append(newhtmlUnit)
  }
};

$(document).ready(function() {
  renderTweets(data)

$('#tweetform').on('submit', function(event) {
  event.preventDefault();
  $.ajax({
    method: "POST",
    url: 'http://localhost:8080/tweets',
    data: $(this).serialize(),
    success: function() {
      console.log('tweet successfuly added in database');
    }
  })
})
});