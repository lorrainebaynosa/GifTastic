// PSEUDOCODE
// Create an array of strings, each one related to a topic that interests you (sports) Save it to a variable called `topics`.

var topics = ["basketball", "tennis", "football", "swimming", "baseball", "golf", "hockey"];

// 2. Your app should take the topics in this array and create buttons in your HTML. Try using a loop that appends a button for each string in the array.
// Function to display movie data
function renderButtons() {
  // Deleting the sports prior to adding new sports so we don't have repeat buttons)
  $("#buttons-view").empty();
  // Looping through the array of sports
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generate buttons for each sport in the array
    // REVIEW OF CONCEPTS (below)
    // 1. $("<button>") jQuery method for creating button element. Since we want to capture sports name, we have to add a data attribute to access that info. 
    // 2. Need to add a button class since we will have multiple buttons and will want to add text to them.
    // 3. Create attribute of "data-name" with values of topics[i] to capture sports name.
    var button = $("<button>");
    // Adding a class of sports to our button
    button.addClass("sports");
    // Adding a data-attribute
    button.attr("data-name", topics[i]);
    // Provide initial button text
    // REVIEW OF CONCEPTS (below):
    // 1. .text(topics[i]) since we want each button to have the name of the topic displayed on the button.
    // 2. jQuery.text(content)method: sets text content; we're setting text content of button.
    button.text(topics[i]);
    // Adding the button to the HTML
    // REVIEW OF CONCEPTS (below):
    // Need to append the button to the div with #buttons-view to be able to view each button.
    $("#buttons-view").append(button);
  }
}

renderButtons();

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// Event listener for all button elements
$("button").on("click", function () {
  $("#gifs-appear-here").empty();
  // In this case, the "this" keyword refers to the button that was clicked
  var sports = $(this).attr("data-name");
  // Constructing a URL to search Giphy for sports
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    sports + "&api_key=nKjy3u4QMyIpy0GOmxfyO9FnG5LODUWR&limit=10&lang=en";

  // Performing our AJAX GET request
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
        // 4. Under every gif, display its rating (PG, G, so on).This data is provided by the GIPHY API.
        // Storing the result item's rating
        var rating = results[i].rating;
        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + rating);
        // Creating an image tag
        var sportsImage = $("<img>");
        // Giving the image tag an src attribute of a property pulled off the
        // result item
        // Adding a class of gif to our image
        sportsImage.addClass("gif");
        sportsImage.attr("src", results[i].images.fixed_height_still.url);
        // Appending the paragraph and sportsImage we created to the "gifDiv" div we created
        gifDiv.append(p);
        gifDiv.append(sportsImage);
        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        $("#gifs-appear-here").prepend(gifDiv);
  // 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.   
      }
      $(".gif").on("click", function () {
        // STEP TWO: make a variable named state and then store the image's data-state into it.
        // Use the .attr() method for this.
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        //attr(SET: has (2) arguments): .attr(" ", " ");
        //attr(GET has 1 argument); .attr("");
        var state = $(this).attr("data-state", "still");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", results[i].images.fixed_height.url);
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", results[i].images.fixed_height_still.url);
          $(this).attr("data-state", "still");
        }
      });
    });
});

// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.





//  // This function handles events where one button is clicked
//  $("#add-movie").on("click", function(event) {
//    // Preventing the buttons default behavior when clicked (which is submitting a form)
//    event.preventDefault();
//    // This line grabs the input from the textbox
//    //REVIEW OF CONCEPTS (below):
//    // 1.	jQuery method .val() gets the current value of the 1st element in the set of matched elements; .val() method does not accept any arguments & is primariy used to get values of form elements such as input, select, & text area.
//    // 2.	jQuery.trim(str),where str is the string to trim. $.trim() function removes all newlines, spaces (including non-breaking spaces), & tabs from beginning and end of supplied string. If whitespaces occur in middle of string, they are preserved.


//    var movie = $("#movie-input").val().trim();

//    // Adding the movie from the textbox to our array
//    // REVIEW OF CONCEPTS (below)
//    // 1. Javascript Array push() method adds new items to end of array and returns new length.

//    movies.push(movie);

//    // Calling renderButtons which handles the processing of our movie array
//    renderButtons();

//  });

//  // Function for displaying the movie info
//  // We're adding a click event listener to all elements with the class "movie"
//  // We're adding the event listener to the document because it will work for dynamically generated elements
//  // $(".movies").on("click") will only add listeners to elements that are on the page at that time
//  $(document).on("click", ".movie", alertMovieName);

//  // Calling the renderButtons function to display the intial buttons
//  renderButtons();
