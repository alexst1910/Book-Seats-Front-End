const apiUrl = "http://localhost:8080";

addEventListener("DOMContentLoaded", (event) => {
  fetch(apiUrl + "/venue/getVenue")
    .then((response) => {
      return response.json();
    })
    .then((venues) => {
      console.log("fetched: " + venues);
      displayVenues(venues);
    })
    .catch((error) => {
      console.error("error:", error);
    });
});

// takes the user from the local storage
const user = JSON.parse(localStorage.getItem("user"));
const button = document.getElementById("item");
const element = document.querySelector(".welcome-message");

if (user) {
  button.innerHTML = "";
  button.innerHTML += "Log out";

  const welcome = `<h1 class="item">Welcome ${user.username}</h1>`;
  element.insertAdjacentHTML("beforeend", welcome);

  setTimeout(() => {
    element.innerHTML = " ";
  }, 10000);

  button.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "../HomePage/home.html";
  });
}

// displaying the venues from the database
const displayVenues = (venues) => {
  const locationsContainer = document.getElementById("locations-container");

  venues.forEach((venue) => {
    const coverUrl = `http://localhost:8080${venue.cover}`;
    const element = `
         <div class="location-card">
        <a href="../BookingPage/booking.html?venueId=${venue.venueId}"
          ><img src=${coverUrl} alt=${venue.name}
        /></a>
        <h1 class="location-title" id="music-pub">${venue.name}</h1>
        <a href="../BookingPage/booking.html?venueId=${venue.venueId}"
          ><button class="book-button" type="button"   
          >Book a seat</button></a
        >
      </div>`;
    locationsContainer.innerHTML += element;
  });
};
