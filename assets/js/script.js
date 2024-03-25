// Get the modals
var modal = document.getElementById("myModal");
var favModal = document.getElementById("FavModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.querySelector(".delete");

// Sets the array for local storage - empty if there isn't any saved recipes
var savedRecipesStorage = localStorage.getItem("Saved")
if (!savedRecipesStorage) {
  var savedRecipesArray = [];
} else {
  var savedRecipesArray = savedRecipesStorage.split(",");
  console.log(savedRecipesArray);
}

// If user hits "Fav Foods" button, pop up a new modal with their saved recipes
var openFavsBtn = document.getElementById("openFavs");
openFavsBtn.addEventListener("click", function () {
  favModal.classList.add("is-active");

  var closeFavs = document.getElementById("closeFavs");
  closeFavs.onclick = function () {
    favModal.classList.remove("is-active");
  }

  // If there aren't any saved recipes, renders a message. If there are favorites, renders the links on the modal
  var renderFavoritesHere = document.getElementById("renderFavorites")
  if (savedRecipesArray == []) {
    renderFavoritesHere.innerHTML = "";
    var noFavorites = document.createElement("p");
    noFavorites.textContent = "No Favorites Found. Go Search for Some!";
    renderFavoritesHere.appendChild(noFavorites);
  } else {
    renderFavoritesHere.innerHTML = "";
    for (var i = 0; i < savedRecipesArray.length; i++) {
      var newLinkEl = document.createElement("a");
      newLinkEl.textContent = savedRecipesArray[i];
      newLinkEl.classList.add("button", "is-fullwidth", "is-link", "is-outlined", "m-2");
      newLinkEl.setAttribute("href", savedRecipesArray[i]);
      renderFavoritesHere.appendChild(newLinkEl);

      // add functionality to remove favorites
      var removeFavButton = document.getElementById("removeFavs");
      removeFavButton.addEventListener("click", function() {
        savedRecipesArray = [];
        renderFavoritesHere.innerHTML = "";
        localStorage.setItem("Saved", savedRecipesArray)
      })
    }
  }
})

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

  // Create an anchor tag instead of a button
var mapsLink = document.createElement("a");
mapsLink.textContent = "Search Google Maps for restaurants";
mapsLink.classList.add("button", "is-fullwidth", "is-success", "is-outlined", "m-2");
mapsLink.href = "#"; // Set href to "#" to prevent redirection

// Add event listener to open map modal
mapsLink.addEventListener('click', () => {
  const mapModal = document.getElementById('mapModal');
  mapModal.classList.add('is-active');
  initMap(); // Initialize the map when the modal is opened
});
      
            // Add button for user to save to favorites
            var saveRecipe = document.createElement("button");
            var dataURL = recipe.url;
            var dataTitle = recipe.label;
            saveRecipe.textContent = "Add Recipe to Favorites";
            saveRecipe.classList.add("button", "is-fullwidth", "is-danger", "is-outlined", "m-2", "favBtn");
            saveRecipe.setAttribute("data-url", dataURL);
            saveRecipe.setAttribute("data-title", dataTitle);

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

  // When the Recipe Cards appear, make the title and navbar have opacity and "fade" into the background until hovered over
  document.querySelector("#mainTitle").classList.add("modalTitle");
  document.querySelector("#navbarMenu").classList.add("opacity6");

  // Add listener for if user clicks the "save favorite"button
  secondModal.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches(".favBtn")) {
      savedRecipesArray.push(element.dataset.url);
      console.log(savedRecipesArray);
      localStorage.setItem("Saved", savedRecipesArray);
    }
  });
}

// When the user clicks on the close button of the second modal, close the second modal
document.querySelector("#secondModal .delete").onclick = function () {
  secondModal.classList.remove("is-active");
}






let activeInfoWindow;

document.addEventListener('DOMContentLoaded', function() {
  // Your JavaScript code here
  var mapModalCloseButton = document.getElementById('mapModalCloseButton');
  // Attach event listener
  if (mapModalCloseButton) {
      mapModalCloseButton.addEventListener('click', function() {
          // Your event handler code here
      });
  }
});

document.querySelector("#mapModal .delete").addEventListener('click', function () {
  mapModal.classList.remove('is-active');
});



function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: -34.397, lng: 150.644 }, // Default location (Sydney, Australia)
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(userLocation); // Set map center to user's location
      },
      () => {
        alert("Geolocation failed. Defaulting to a predefined location.");
        // Handle errors (e.g., user denies permission)
      }
    );
  } else {
    alert("Geolocation is not supported by this browser. Defaulting to a predefined location.");
    // Handle browser doesn't support geolocation
  }

  const infoWindow = new google.maps.InfoWindow();
  const service = new google.maps.places.PlacesService(map);

  document.getElementById("searchButton").addEventListener("click", () => {
    const food = document.getElementById("foodInput").value;
    if (food) {
      service.textSearch(
        {
          query: food + " food",
          location: map.getCenter(),
          radius: 5000,
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            document.getElementById("placeInfo").innerHTML = ''; // Clear previous results
            for (let i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
          }
        }
      );
    }
  });

  function createMarker(place) {
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
      if (activeInfoWindow) {
        activeInfoWindow.close();
      }

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="card place-card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-128x128">
                    <img class="place-image" src="${place.photos && place.photos.length > 0 ? place.photos[0].getUrl({ maxWidth: 200 }) : ''}" alt="Place Photo">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">${place.name}</p>
                  <p class="subtitle is-6">${place.formatted_address}</p>
                  <p>Rating: ${place.rating}</p>
                </div>
              </div>
            </div>
          </div>
        `,
      });
      infoWindow.open(map, marker);
      activeInfoWindow = infoWindow;
    });
  }
}

