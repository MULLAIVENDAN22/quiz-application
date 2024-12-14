document.addEventListener("DOMContentLoaded", function () {
  const back = document.getElementById("back");
  let users = null;

  back.addEventListener("click", () => {
    changeDetails(users).then(() => {
      window.location.href = "/src/index.html";
    });
  });

  async function fetchUserDetails() {
    try {
      const response = await fetch("http://localhost:3000/userDetails");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      users = await response.json();
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
        body: JSON.stringify({ username, action: "inactive" }),
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

  let marks = 0;
  function checkDetails(users) {
    let correct = false;
    users.forEach((user) => {
      if (user.action === "active") {
        marks = user.marks;
        console.log(marks);
        if (marks < 5) {
          result.innerHTML = `You Failed, Better Try Next Time`;
          mark.style.color = "red";
          mark.style.borderColor = "red";
        } else {
          result.innerHTML = `Congratulations, You Have Passed`;
          mark.style.color = "green";
          mark.style.borderColor = "green";
          playSound();
          generateConfetti();
        }
        score.innerHTML = "You Have Scored";
        mark.innerHTML = `${marks} `;
      }
    });
  }

  const result = document.getElementById("result");
  const mark = document.getElementById("mark");
  const score = document.getElementById("score");

  function playSound() {
    const audio = document.getElementById("celebrationSound");
    audio.play();
  }

  function generateConfetti() {
    const confettiContainer = document.getElementById("confettiContainer");
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.top = `${Math.random() * -100}vh`;
      confettiContainer.appendChild(confetti);
    }
  }

  function getRandomColor() {
    const colors = [
      "#FF5733",
      "#FFBD33",
      "#DBFF33",
      "#75FF33",
      "#33FF57",
      "#33FFBD",
      "#33DBFF",
      "#3375FF",
      "#5733FF",
      "#BD33FF",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function changeDetails(users) {
    return new Promise((resolve) => {
      users.forEach((user) => {
        if (user.action === "active") {
          updateUserAction(user.username).then(resolve);
        } else {
          resolve();
        }
      });
    });
  }

  fetchUserDetails();
});
