// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.querySelector(".delete");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.classList.add("is-active");
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.classList.remove("is-active");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.remove("is-active");
  }
};

// Get the second modal
var secondModal = document.getElementById("secondModal");

// Get the button that opens the second modal
var saveChangesBtn = document.querySelector(".modal-card-foot .is-success");

// When the user clicks the "Save changes" button, open the second modal and close the current modal
saveChangesBtn.onclick = function () {
  modal.classList.remove("is-active"); // Close the current modal
  secondModal.classList.add("is-active"); // Open the second modal
  requestAPI();
};

// When the user clicks on the close button of the second modal, close the second modal
document.querySelector("#secondModal .delete").onclick = function () {
  secondModal.classList.remove("is-active");
};

// ---------- API Request Below -----------

function savFav() {
  //list of fav recipes from local storage
  var favorites = localStorage.getItem("favoriteRecipes");
  //create empty array 
  var favoriteRecipes;
  //run through current saved recipes
  if(favorites){
    favoriteRecipes = JSON.parse(favorites)
  } else {
    //if its empty create empty 
    favoriteRecipes = []
  }
  var favIndex = favoriteRecipes.findIndex(function(favRecipe){
    return favRecipe.label === recipe.label
  })
  //if it isnt in the array add it
  if(favIndex === -1){
    favoriteRecipes.push(recipe)
  } else{
    favoriteRecipes.splice(favIndex, 1)
  }
  //save the fav recipes to local storage
  localStorage.setItem("favoriteRecipes", JSON.stringify(favoriterecipes))
}

function requestAPI() {
  var APIKey = "&app_key=46ed35f132f42ee1119d14f95de261df";
  var APIId = "&app_id=3577f865";
  var APIBaseURL = "https://api.edamam.com/api/recipes/v2?type=public";

  var keywordInput = "chicken";
  var cuisineTypeInput = "Asian";
  var mealTypeInput = "Dinner";

  var keyword = "&q=" + keywordInput;
  var cuisineType = "&cuisineType=" + cuisineTypeInput;
  var mealType = "&mealType=" + mealTypeInput;

  fetch(APIBaseURL + keyword + APIId + APIKey + cuisineType + mealType)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.hits.length > 0) {
        var randomIndex = Math.floor(Math.random() * data.hits.length);
        var randomRecipeLabel = data.hits[randomIndex].recipe.label;
        document.getElementById("searchInput").value = randomRecipeLabel;
      } else {
        document.getElementById("searchInput").value = "No recipes found";
      }
    })
    .catch(function (error) {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Create container to hold recipe cards
var recipeCards = document.createElement("div");
recipeCards.classList.add("recipeCards");

// Add the cards to the div
var cardDisplay = document.querySelector(".section .container");
cardDisplay.appendChild(recipeCards);

// Use API and go through each "hit"
data.hits.forEach(function (hit) {
  var recipe = hit.recipe;

  // Create card
  var recipeCard = document.createElement("div");
  recipeCard.classList.add("box");

  //use bulma title styling to add title to each card
  var recipeTitle = document.createElement("h2");
  recipeTitle.textContent = recipe.label;
  recipeTitle.classList.add("title", "is-4");

  // Add image
  var recipeImage = document.createElement("img");
  recipeImage.src = recipe.image;

  // Add image and title
  recipeCard.appendChild(recipeTitle);
  recipeCard.appendChild(recipeImage);

  // Add the card to the cards div
  recipeCards.appendChild(recipeCard);
});
