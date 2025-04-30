const apiUrl = "http://localhost:8080";

addEventListener("DOMContentLoaded", () => {
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

// selecting elements from the DOM
const loginButton = document.getElementById("login");
const listButton = document.getElementById("list");
const homeButton = document.getElementById("home");
const element = document.querySelector(".welcome-message");
const menuItems = document.querySelector(".menu-items");
const section = document.querySelector(".section-text");
const popular = document.getElementById("popular");

// displaying the venues from the database
const displayVenues = (venues) => {
  const locationsContainer = document.getElementById("locations-container");

  venues.forEach((venue) => {
    const coverUrl = `http://localhost:8080${venue.cover}`;

    if (user.role === "ADMIN") {
      const adminElement = `
           <div class="location-card"> 
            <img src=${coverUrl} alt=${venue.name}/>

          <h1 class="location-title" id="music-pub">${venue.name}</h1>
          
            <button class="button" id="updateButton" type="button"   
            >Update venue</button>
            <button class="button" id="deleteButton" type="button"   
            >Delete venue</button>

        </div>`;

      locationsContainer.innerHTML += adminElement;
    } else {
      const element = `
         <div class="location-card">
        <a href="../BookingPage/booking.html?venueId=${venue.venueId}"
          ><img src=${coverUrl} alt=${venue.name}
        /></a>
        <h1 class="location-title" id="music-pub">${venue.name}</h1>
        <a href="../BookingPage/booking.html?venueId=${venue.venueId}"
          ><button class="button" id="bookButton" type="button"   
          >Book a seat</button></a
        >
      </div>`;

      locationsContainer.innerHTML += element;
    }
  });
};

if (user) {
  loginButton.innerHTML = "";
  loginButton.innerHTML += "Log out";

  const welcome = `<h1 class="item">Welcome ${user.username}</h1>`;
  element.insertAdjacentHTML("beforeend", welcome);

  if (user.role === "ADMIN") {
    homeButton.remove();
    listButton.remove();

    const addVenue = `<a href="../Admin/addVenue.html"><h1 class="item" id="add-venue">Add Venue</h1></a>`;
    menuItems.insertAdjacentHTML("afterbegin", addVenue);

    section.removeChild(popular);
    const allVenues = `<h1>All Venues</h1>`;
    section.insertAdjacentHTML("beforeend", allVenues);
  }

  setTimeout(() => {
    element.innerHTML = " ";
  }, 5000);

  loginButton.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "../HomePage/home.html";
  });
}
