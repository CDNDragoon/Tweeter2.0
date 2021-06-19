const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

let createTweetElement = function (obj) {
  let htmlUnit = `
  <article>
    <header>
      <img class="profile-placeholder" src="${obj.user.avatars}"> 
      <h4 class="users-name">${obj.user.name}</h4>
      <h5 class="user-handle">${obj.user.handle}</h5>
    </header>
    <body><div class='tweet-body'>
    ${escape(obj.content.text)}
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
  </article>`;
  return htmlUnit;
};

const renderTweets = function (tweets) {
  $(".tweetcontainer").empty();
  for (let tweet of tweets) {
    const newhtmlUnit = createTweetElement(tweet);
    $(".tweetcontainer").append(newhtmlUnit);
  }
};

const loadTweets = function () {
  let url = "http://localhost:8080/tweets";
  $.ajax({
    url,
    method: "GET",
  })
    .done((result) => {
      renderTweets(result);
    })
    .fail(() => console.log("fail"))
    .always(() => console.log("as always; this request is completed."));
};

const postTweets = function (formData) {
  $.ajax({
    method: "POST",
    url: "http://localhost:8080/tweets",
    data: formData,
    success: function () {
      console.log("tweet successfuly added in database");
      loadTweets();
      $("output").replaceWith(
        `<output name="counter" class="counter" for="tweettext">140</output>`
      );
    },
  })
    .done(() => $("textarea").val(""))
    .fail(() => console.log("failed to post"));
};

const message = function (err) {
  let message = "";
  if (err === "empty") {
    message = "Tweet cannot be empty";
  } else {
    message = "Tweets cannot exced 140 characters";
  }
  return `<div class = 'message'>${message}</div> `;
};

$(document).ready(function () {
  loadTweets();

  $("#tweetform").on("submit", function (event) {
    event.preventDefault();
    let tweet = $(this).children("textarea").val();
    tweet = tweet.trim();
    if (tweet === "") {
      $(".warning").html(message("empty")).fadeIn("fast").fadeOut(3000);
    } else if (tweet.length > 140) {
      $(".warning").html(message("140")).fadeIn("fast").fadeOut(3000);
    } else {
      const formData = $(this).serialize();
      postTweets(formData);
    }
  });
  $(".fa-angle-double-down").on("click", function () {
    if ($("#tweetform").first().is(":hidden")) {
      $("#tweetform").slideDown(1000);
    } else {
      $("#tweetform").hide(1000);
    }
  });
});
