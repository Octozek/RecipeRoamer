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
  saveChangesBtn.onclick = function() {
      modal.classList.remove("is-active"); // Close the current modal
      secondModal.classList.add("is-active"); // Open the second modal
  }
  
  // When the user clicks on the close button of the second modal, close the second modal
  document.querySelector("#secondModal .delete").onclick = function() {
    secondModal.classList.remove("is-active");
}

// ---------- API Request Below -----------

function requestAPI() {
  var APIKey = "&app_key=46ed35f132f42ee1119d14f95de261df";
  var APIId = "&app_id=3577f865";
  var APIBaseURL = "https://api.edamam.com/api/recipes/v2?type=public";

  var keywordInput = "chicken";
  var cuisineTypeInput = "Asian";
  var mealTypeInput = "Dinner";

  var keyword = ("&q=" + keywordInput);
  var cuisineType = ("&cuisineType=" + cuisineTypeInput);
  var mealType = ("&mealType=" + mealTypeInput);

  fetch(APIBaseURL + keyword + APIId + APIKey + cuisineType + mealType)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //create for loop for dummy cards
      for(var i = 0; i<data.hits.length; i++){
        //create boxes
      }
    });
} 

