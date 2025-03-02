const apiUrl = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form-inputs");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    fetch(apiUrl + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        sessionStorage.getItem("user", JSON.stringify(data.user));
        window.location.href = "../HomePage/home.html";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  // const loggedInUser = sessionStorage.getItem("user");
  // if (loggedInUser) {
  //   window.location.href = "../HomePage/home.html";
  // }
});
