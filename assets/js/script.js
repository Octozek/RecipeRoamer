// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.querySelector(".delete");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.classList.add("is-active");
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.classList.remove("is-active");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.remove("is-active");
  }
}

// Get the second modal
var secondModal = document.getElementById("secondModal");

// Get the button that opens the second modal
var saveChangesBtn = document.querySelector(".modal-card-foot .is-success");

// When the user clicks the "Save changes" button, open the second modal and close the current modal
saveChangesBtn.onclick = function () {

  // saves the information from the user's search
  var keywordInput = document.querySelector("#search-input").value;
  var dishTypeInput = document.querySelector("#dish-type-input").value;
  var mealTypeInput = document.querySelector("#meal-type-input").value;
  var cuisineTypeInput = document.querySelector("#cuisine-type-input").value;

  console.log(keywordInput);
  console.log(dishTypeInput);
  console.log(mealTypeInput);
  console.log(cuisineTypeInput);

  modal.classList.remove("is-active"); // Close the current modal

  secondModal.classList.add("is-active"); // Open the second modal

  // Function for calling the API
  function requestAPI() {
    // Defines utility variables for API fetch
    var APIKey = "&app_key=46ed35f132f42ee1119d14f95de261df";
    var APIId = "&app_id=3577f865";
    var APIBaseURL = "https://api.edamam.com/api/recipes/v2?type=public";
    // Defines usable query/parameters for API fetch using user's search criteria
    var keyword = "&q=" + keywordInput;
    var dishType = "&dishType=" + dishTypeInput;
    var mealType = "&mealType=" + mealTypeInput;
    var cuisineType = "&cuisineType=" + cuisineTypeInput;
    // Checks to see if any of the parameters are blank. If so, removes them
    if (keywordInput = "") {
      keyword = "";
    }
    if (dishTypeInput = "Select dropdown") {
      dishType = "";
    }
    if (mealTypeInput = "Select dropdown") {
      mealType = "";
    }
    if (cuisineTypeInput = "Select dropdown") {
      cuisineType = "";
    }

    fetch(APIBaseURL + keyword + APIId + APIKey + cuisineType + mealType + dishType)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if (data.hits.length > 0) {
          var randomIndex = Math.floor(Math.random() * data.hits.length);
          var randomRecipeLabel = data.hits[randomIndex].recipe.label;
          document.getElementById("search-input").value = randomRecipeLabel;
          // Create container to hold recipe cards
          var recipeCards = document.createElement("div")
          recipeCards.classList.add("recipeCards")

          // Add the cards to the div
          var cardDisplay = document.querySelector(".section .container")
          cardDisplay.appendChild(recipeCards)

          // Use API and go through each "hit"
          data.hits.forEach(function (hit) {
            var recipe = hit.recipe;

            // Create card
            var recipeCard = document.createElement("div");
            recipeCard.classList.add("box", "has-text-centered");

            //use bulma title styling to add title to each card
            var recipeTitle = document.createElement("h2");
            recipeTitle.textContent = recipe.label;
            recipeTitle.classList.add("card-title", "is-4", "m-2");

            // Add image
            var recipeImage = document.createElement("img");
            recipeImage.src = recipe.image;

            // Add link to recipe
            var recipeLink = document.createElement("a");
            recipeLink.textContent = "Link to Recipe";
            recipeLink.classList.add("button", "is-fullwidth", "is-link", "is-outlined", "m-2");
            recipeLink.setAttribute("href", recipe.url);

            // Add button to link to Google Maps
            var mapsLink = document.createElement("button");
            mapsLink.textContent = "Search Google Maps for restaurants";
            mapsLink.classList.add("button", "is-fullwidth", "is-success", "is-outlined", "m-2");

            // Add button for user to save to favorites
            var saveRecipe = document.createElement("button");
            saveRecipe.textContent = "Add Recipe to Favorites";
            saveRecipe.classList.add("button", "is-fullwidth", "is-danger", "is-outlined", "m-2");
            saveRecipe.classList.add("data-url", recipe.url);

            // Add image and title
            recipeCard.appendChild(recipeTitle);
            recipeCard.appendChild(recipeImage);
            recipeCard.appendChild(recipeLink);
            recipeCard.appendChild(mapsLink);
            recipeCard.appendChild(saveRecipe);


            // Add the card to the cards div
            recipeCards.appendChild(recipeCard);
          });


        } else {
          document.getElementById("searchInput").value = "No recipes found";
        }
      })
      .catch(function (error) {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  requestAPI();
}

// When the user clicks on the close button of the second modal, close the second modal
document.querySelector("#secondModal .delete").onclick = function () {
  secondModal.classList.remove("is-active");
}







