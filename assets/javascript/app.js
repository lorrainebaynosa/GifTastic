// PSEUDOCODE
// 1. Create an array of strings, each one related to a topic that interests you (sports) Save it to a variable called `topics`.

var topics = ["basketball", "tennis", "football", "swimming", "baseball", "golf", "hockey"];

// 2. Your app should take the topics in this array and create buttons in your HTML. Try using a loop that appends a button for each string in the array.
// Function to display movie data
function renderButtons() {
  // Deleting the sports prior to adding new sports so we don't have repeat buttons)
  $("#buttons-view").empty();
  // Looping through the array of sports
  for (var i = 0; i < topics.length; i++) {
    // Dynamicaly generate buttons for each sport in the array
    var button = $("<button>");
    // Adding a class of sports to our button
    button.addClass("sports");
    // Adding a data-attribute
    button.attr("data-name", topics[i]);
    // Provide initial button text
    button.text(topics[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(button);
  }
}

renderButtons();

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// Event listener for all button elements
function renderAjax() {
  $("button").on("click", function () {
    $("#gifs-appear-here").empty();
    // In this case, the "this" keyword refers to the button that was clicked
    var sports = $(this).attr("data-name");
    // Constructing a URL to search Giphy for sports
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      sports + "&api_key=nKjy3u4QMyIpy0GOmxfyO9FnG5LODUWR&limit=10&lang=en";

    // AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function (response) {
        // Storing an array of results in the results variable
        var results = response.data;
        console.log(response);
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
          // Create a div for the gif
          var gifDiv = $("<div>");
          gifDiv.addClass("gif");
          // 4. Under every gif, display its rating (PG, G, so on).This data is provided by the GIPHY API.
          // Storing the result item's rating
          var rating = results[i].rating;
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);
          // Creating an image tag
          var sportsImage = $("<img>");
          // Giving the image tag an src attribute of a property pulled off the result item
          // Adding a data-attribute
          sportsImage.attr({
            "class": "animation",
            "src": results[i].images.fixed_height_still.url,
            "data-animate": results[i].images.fixed_height.url,
            "data-still": results[i].images.fixed_height_still.url,
            "data-state": "still"
          });
          // Prepending the paragraph and sportsImage we created to the "gifDiv" div we created
          gifDiv.prepend(p);
          gifDiv.prepend(sportsImage);
          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gifs-appear-here").prepend(gifDiv);
        }
        // GIF ANIMATION - STILL VS ANIMATED ON "CLICK"
        $(document).on("click", ".animation", function () {
          var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }
          else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      });
  });
}
renderAjax();

//FORM FOR USER INPUT
$("#add-sports").on("click", function (event) {
  // Preventing the buttons default behavior when clicked (which is submitting a form)
  event.preventDefault();
  var sportInput = $("#sports-input").val().trim();
  topics.push(sportInput);
  renderButtons();
  renderAjax();
  $("#sports-input").val("");
});
