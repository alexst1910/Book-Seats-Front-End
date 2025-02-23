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
        <a href="../BookingPage/booking.html"
          ><button class="book-button" type="button">Book a seat</button></a
        >
      </div>`;
    locationsContainer.insertAdjacentHTML("beforeend", element);
  });
};
