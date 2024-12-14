const signUp = document.getElementById("signUp");
signUp.addEventListener("click", () => {
  window.location.href = "/src/signup.html";
});

const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  window.location.href = "/src/signup.html";
});

const login = document.getElementById("login");
login.addEventListener("click", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const matcher1 = document.getElementById("matching1");
  const matcher3 = document.getElementById("matching3");

  matcher1.classList.add("hide");
  matcher3.classList.add("hide");

  function isValidEmail(username) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(username);
  }
  if (!isValidEmail(username)) {
    return matcher1.classList.remove("hide");
  }

  async function fetchUserDetails() {
    try {
      const response = await fetch("http://localhost:3000/userDetails");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const users = await response.json();
      console.log(users);

      checkDetails(users);
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Error: " + error.message);
    }
  }

  async function updateUserAction(username) {
    try {
      const updateResponse = await fetch("http://localhost:3000/userDetails", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, action: "active" }),
      });

      if (!updateResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await updateResponse.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error updating user action:", error);
      alert("Error: " + error.message);
    }
  }

  function checkDetails(users) {
    let correct = false;
    users.forEach((user) => {
      if (user.username == username && user.password == password) {
        correct = true;
        updateUserAction(username).then(() => {
          window.location.href = "/src/instruction.html";
        });
      }
    });
    if (!correct) matcher1.classList.remove("hide");
  }

  fetchUserDetails();
});
