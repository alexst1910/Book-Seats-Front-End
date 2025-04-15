const apiUrl = "http://localhost:8080";

// retrieves the user from the browser session
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("jwt");
const button = document.getElementById("item");
const section = document.querySelector(".section-text");
const message = `<h2 id="no-bookings-msg"> No bookings saved! </h2>`;
section.insertAdjacentHTML("beforeend", message);

if (user) {
  button.innerHTML = "";
  button.innerHTML += "Log out";

  button.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "../HomePage/home.html";
  });
}

addEventListener("DOMContentLoaded", () => {
  fetch(apiUrl + `/user/usersBookings/${user.userId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayBookingsList(data.bookings);
    })
    .catch((error) => {
      console.error("error:", error);
    });
});

function deleteBooking(bookingId, venueId) {
  if (!venueId) {
    console.error("Missing venueId for booking", bookingId);
    return;
  }
  fetch(
    apiUrl +
      `/booking/deleteBookingById/${bookingId}/${user.userId}/${venueId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then(() => {
      const element = document.getElementById(`booking-${bookingId}`);
      element.classList.add("hide");
    })
    .catch((error) => {
      console.error("error:", error);
    });
}

function displayBookingsList(bookings) {
  bookings.forEach((booking) => {
    const bookingsContainer = document.getElementById("bookings");
    const element = `<div class="booking-item" id="booking-${booking.bookingId}">
        <div class="venue-cover">
          <img src="../Images/music-pub.png" alt="music pub" />
        </div>

        <div class="booking-data">
          <div class="booking-data-values">
            <div class="booking-id">
              <h2>booking # ${booking.bookingId}</h2>
            </div>

            <div class="data-grid">
              <div>
                <h4>date: &nbsp; ${booking.date}</h4>
              </div>
              <div>
                <h4>time from: &nbsp; ${booking.timeFrom}</h4>
              </div>
              <div>
                <h4>time to: &nbsp; ${booking.timeTo}</h4>
              </div>
              <div>
                <h4>seats: &nbsp; ${booking.seats}</h4>
              </div>
            </div>
          </div>
          <div class="crud-buttons">
            <button class="crud">Update</button>
            <button class="crud" onclick="deleteBooking(${booking.bookingId}, ${booking.venue.venueId})">Delete</button>
          </div>
        </div>`;

    const noBookings = document.getElementById("no-bookings-msg");
    if (noBookings) {
      noBookings.remove();
    }
    bookingsContainer.innerHTML += element;
  });
}
