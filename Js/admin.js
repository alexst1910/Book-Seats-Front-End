const apiUrl = "http://localhost:8080";

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("jwt");
const confirmation = document.querySelector(".confirm-message");
confirmation.classList.add("hide");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".add-venue");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const venue = e.target;

    const venueData = {
      name: venue.name.value,
      address: venue.address.value,
      totalSeats: venue.totalSeats.value,
      availableSeats: venue.availableSeats.value,
      cover: "",
    };

    const formData = new FormData();

    formData.append(
      "venue",
      new Blob([JSON.stringify(venueData)], { type: "application/json" })
    );
    formData.append("imageFile", venue.imageFile.files[0]);

    fetch(apiUrl + "/venue/addVenue", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success: " + data);
        confirmation.classList.remove("hide");
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  });
});
