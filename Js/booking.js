const apiUrl = "http://localhost:8080";

// search for the venueId parameter in the URL
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

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("jwt");
const button = document.getElementById("item");
const section = document.querySelector(".submit");

if (user) {
  button.innerHTML = "";
  button.innerHTML += "Log out";

  button.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "../HomePage/home.html";
  });
}

// doesn't display the submit button if user doesn't exist
if (!user) {
  const element = "<h4>You must be logged in to submit the booking</h4>";
  section.insertAdjacentHTML("beforeend", element);
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
              <div class="available">Available: <span class="span">${venue.availableSeats}</span></div>
            </div>`;

    infoContainer.innerHTML = " ";
    const secondElement = ` <img src=${coverUrl} alt=${venue.name} />`;
    infoContainer.insertAdjacentHTML("beforeend", firstElement);
    venueCover.insertAdjacentHTML("beforeend", secondElement);
  }
}

// updates the available seats on submit
function displayUpdatedAvailableSeats(venueId) {
  fetch(apiUrl + `/venue/getVenueById/${venueId}`)
    .then((response) => {
      return response.json();
    })
    .then((venue) => {
      console.log("venue: " + venue);

      if (venue) {
        const available = document.querySelector(".span");
        available.innerHTML = venue.availableSeats;
      } else {
        console.log("update failed");
      }
    })
    .catch((error) => {
      console.error("error:", error);
    });
}

const form = document.getElementById("form");
const confirmation = document.querySelector(".confirm-message");
confirmation.classList.add("hide");

form.addEventListener("submit", function (e) {
  e.preventDefault();

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
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);

      // display a message at submit
      confirmation.classList.remove("hide");
      displayUpdatedAvailableSeats(venueId);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
