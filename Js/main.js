const apiUrl = "http://localhost:8080";

addEventListener("DOMContentLoaded", (event) => {
  fetch(apiUrl + "/getVenue")
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

const user = JSON.parse(sessionStorage.getItem("user"));

if (user) {
  const userName = document.getElementById("item");
  userName.innerHTML = "";
  userName.innerHTML += "Welcome " + user.username;
}

// displaying the venues from the database
const displayVenues = (venues) => {
  const locationsContainer = document.getElementById("locations-container");

  venues.forEach((venue, idx) => {
    const coverUrl = `http://localhost:8080${venue.cover}`;
    const element = `
         <div class="location-card">
        <a href="../BookingPage/booking.html"
          ><img src=${coverUrl} alt="Music Pub"
        /></a>
        <h1 class="location-title" id="music-pub">${venue.name}</h1>
        <a href="../BookingPage/booking.html?venueId=${venue.venueId}"
          ><button class="book-button" type="button"   
          >Book a seat</button></a
        >
      </div>`;
    locationsContainer.innerHTML += element;
  });

  const urlParams = new URLSearchParams(window.location.search);
  const venueId = urlParams.get("venueId");
  if (venueId) {
    displayVenueInfo(venueId);
  }
};
