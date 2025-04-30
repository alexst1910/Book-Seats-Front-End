const apiUrl = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-inputs");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    fetch(apiUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.token;
        localStorage.setItem("jwt", token);
        return fetch(apiUrl + "/user/current", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => response.json())
          .then((user) => {
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "../HomePage/home.html";
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
