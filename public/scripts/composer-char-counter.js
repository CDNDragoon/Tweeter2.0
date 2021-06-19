$(document).ready(function () {
  $("textarea").keyup(function () {
    let counter = 140 - $(this).val().length;
    if (counter >= 0) {
      $("output").replaceWith(
        `<output name="counter" class="counter" for="tweettext">${counter}</output>`
      );
    } else {
      $("output").replaceWith(
        `<output style="color: red" name="counter" class="counter" for="tweettext">${counter}</output>`
      );
    }
    console.log(counter);
  });
});
