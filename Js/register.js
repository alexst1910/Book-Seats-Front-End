document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "http://localhost:8080";
  const form = document.getElementById("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    fetch(apiUrl + "/user/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "../HomePage/home.html";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
