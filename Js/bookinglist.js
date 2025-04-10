const apiUrl = "http://localhost:8080";

// retrieves the user from the browser session
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("jwt");

if (user) {
  const userName = document.getElementById("item");
  userName.innerHTML = "";
  userName.innerHTML += "Log out";

  userName.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "../HomePage/home.html";
  });
} else {
  userName.innerHTML = "";
  userName.innerHTML += "Log in";
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
      console.log(data.venue);
    })
    .catch((error) => {
      console.error("error:", error);
    });
});

function deleteBooking(bookingId) {
  fetch(apiUrl + `/booking/deleteBookingById/${bookingId}/${user.userId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then(() => {
      const element = document.querySelector(".booking-item");
      element.classList.add("hide");
    })
    .catch((error) => {
      console.error("error:", error);
    });
}

function displayBookingsList(bookings) {
  const bookingsContainer = document.getElementById("bookings");
  bookings.forEach((booking) => {
    const element = `<div class="booking-item">
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
            <button class="crud" onclick=deleteBooking(${booking.bookingId})>Delete</button>
          </div>
        </div>`;
    bookingsContainer.innerHTML += element;
  });
}
