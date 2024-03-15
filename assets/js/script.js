// Get the button and the modal
var button = document.getElementById('showModal');
var modal = document.getElementById('myModal');

// When the button is clicked, show the modal
button.addEventListener('click', function() {
    modal.classList.add('is-active');
});

// When the close button or the background is clicked, close the modal
modal.querySelector('.modal-close').addEventListener('click', function() {
    modal.classList.remove('is-active');
});

modal.querySelector('.modal-background').addEventListener('click', function() {
    modal.classList.remove('is-active');
});


// ----------- API CODE HERE -----------

// Defines API utilities
var APIKey = "&app_key=46ed35f132f42ee1119d14f95de261df";
var APIId = "&app_id=3577f865";
var APIBaseURL = "https://api.edamam.com/api/recipes/v2?type=public";

// This is where we will get input from the forms *eventually*
var keywordInput = "chicken";
var cuisineTypeInput = "Asian";
var mealTypeInput = "Dinner";

// Defines search queries for the API using the variables above
var keyword = ("&q=" + keywordInput);
var cuisineType = ("&cuisineType=" + cuisineTypeInput);
var mealType = ("&mealType=" + mealTypeInput);

// Defines the function for requesting the API with the queries
function requestAPI() {
    fetch(APIBaseURL + keyword + APIId + APIKey + cuisineType + mealType)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
      });
} 

requestAPI();


