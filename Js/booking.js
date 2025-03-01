const apiUrl = "http://localhost:8080";

const urlParams = new URLSearchParams(window.location.search);
const venueId = urlParams.get("venueId");

document.addEventListener("DOMContentLoaded", () => {
  if (venueId) {
    console.log("Venue ID:", venueId);
    displayVenueInfo(venueId);
  } else {
    console.error("No venueId found in URL.");
  }
});

const user = JSON.parse(sessionStorage.getItem("user"));

if (!user) {
  const submit = document.querySelector(".button");
  submit.classList.add("hide");
}
function displayVenueInfo(venueId) {
  fetch(apiUrl + `/venue/getVenueById/${venueId}`)
    .then((response) => {
      return response.json();
    })
    .then((venue) => {
      console.log("venue: " + venue);

      if (venue) {
        venueInfo(venue);
      } else {
        console.log("venue not found");
      }
    })
    .catch((error) => {
      console.error("error:", error);
    });

  function venueInfo(venue) {
    const infoContainer = document.getElementById("details-container");
    const coverUrl = `http://localhost:8080${venue.cover}`;
    const venueCover = document.getElementById("location-photo");

    const firstElement = ` <div class="location-info">
              <div class="name">${venue.name}</div>
              <div class="address">${venue.address}</div>
            </div>
            <div class="seats-section">
              <div class="total">Total seats: ${venue.totalSeats}</div>
              <div class="available">Available: ${venue.availableSeats}</div>
            </div>`;

    infoContainer.innerHTML = " ";
    const secondElement = ` <img src=${coverUrl} alt=${venue.name} />`;
    infoContainer.insertAdjacentHTML("beforeend", firstElement);
    venueCover.insertAdjacentHTML("beforeend", secondElement);
  }
}

const form = document.getElementById("form");
const confirmation = document.querySelector(".confirm-message");
confirmation.classList.add("hide");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user) {
    const userName = document.getElementById("item");
    userName.innerHTML = "";
    userName.innerHTML += user.username;
  }

  const formData = new FormData(form);
  const data = {
    date: formData.get("date"),
    seats: formData.get("seats"),
    timeTo: formData.get("timeTo"),
    timeFrom: formData.get("timeFrom"),
  };

  fetch(apiUrl + `/booking/addBooking/${user.userId}/${venueId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      confirmation.classList.remove("hide");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
