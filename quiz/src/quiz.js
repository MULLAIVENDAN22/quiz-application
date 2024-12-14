const quizdata = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: 'Who wrote the play "Romeo and Juliet"?',
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Jane Austen",
      "Leo Tolstoy",
    ],
    answer: "William Shakespeare",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "NaCl"],
    answer: "H2O",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["Japan", "China", "South Korea", "Thailand"],
    answer: "Japan",
  },
  {
    question: "What is the largest mammal?",
    options: ["Blue whale", "Elephant", "Giraffe", "Hippo"],
    answer: "Blue whale",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Vincent van Gogh",
      "Michelangelo",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the tallest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    answer: "Mount Everest",
  },
  {
    question: "What is the smallest planet in the solar system?",
    options: ["Mercury", "Mars", "Pluto", "Earth"],
    answer: "Mercury",
  },
  {
    question: "Which bird is known for its ability to mimic human speech?",
    options: ["Parrot", "Eagle", "Owl", "Penguin"],
    answer: "Parrot",
  },
];

function startTimer() {
  let time = 5 * 60;
  const timer = document.getElementById("timer");
  const timing = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    timer.textContent = `Time - 0${minutes}m : ${seconds}s`;
    if (time <= 60) {
      timer.style.color = "red";
    }
    if (time <= 0) {
      clearInterval(timing);
      window.location.href = "/src/result.html";
    }
    time--;
  }, 1000);
}
window.onload = startTimer();

let currentquestion = 0;
const lenght = quizdata.length;
function loadquestion() {
  const question_conatiner = document.getElementById("question_conatiner");
  const option_container = document.getElementById("option_container");
  const number = document.getElementById("number");

  question_conatiner.innerHTML = quizdata[currentquestion].question;

  option_container.innerHTML = "";
  quizdata[currentquestion].options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("options");
    button.innerText = option;
    button.addEventListener("click", () => {
      button.style.backgroundColor = "#00bdad";
      button.style.color = "white";
    });
    button.addEventListener("click", () => selectanswer(option));
    option_container.appendChild(button);
  });

  number.textContent = `Question - ${[currentquestion + 1]} / ${lenght}`;
}

let marks = 0;
function selectanswer(selectedoption) {
  const answer = quizdata[currentquestion].answer;

  if (selectedoption === answer) {
    display.textContent = selectedoption + " - your answer is correct ";
    marks++;
    const mark = document.getElementById("score");
    mark.textContent = `Score - ${marks} / 10`;
  } else {
    display.innerHTML =
      selectedoption +
      " - your answer is wrong.<br> <b> The correct Answer is :" +
      answer +
      " </b> ";
  }
  const answerButtons = document.querySelectorAll("#option_container button");
  answerButtons.forEach((button) => {
    button.disabled = true;
  });

  currentquestion++;
}

function nextquestion() {
  display.innerHTML = "";
  if (currentquestion < quizdata.length) {
    loadquestion();
  } else {
    const next = document.getElementById("next");
    next.style.display = "none";
  }
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
      body: JSON.stringify({ username, marks: marks }),
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
    if (user.action === "active") {
      updateUserAction(user.username);
    }
  });
}

const submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  fetchUserDetails().then(() => {
    window.location.href = "/src/result.html";
  });
});

window.onload = loadquestion();
