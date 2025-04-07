const quizData = [
    {
      question: "How many players are on the court for one team?",
      options: ["4", "5", "6", "7"],
      correct: "5",
      fact: "Each team has 5 players on the court at a time."
    },
    {
      question: "How many points is a shot from behind the arc worth?",
      options: ["2", "1", "3", "4"],
      correct: "3",
      fact: "Shots from behind the 3-point line are worth 3 points."
    },
    {
      question: "How long can an offensive player stay in the paint?",
      options: ["2 seconds", "3 seconds", "5 seconds", "No limit"],
      correct: "3 seconds",
      fact: "The 3-second rule prevents offensive players from staying in the key too long."
    },
    {
      question: "What is it called when a player takes too many steps without dribbling?",
      options: ["Double dribble", "Traveling", "Carrying", "Foul"],
      correct: "Traveling",
      fact: "Traveling occurs when a player moves their feet without dribbling."
    },
    {
      question: "How long does a team have to attempt a shot?",
      options: ["20 seconds", "24 seconds", "30 seconds", "10 seconds"],
      correct: "24 seconds",
      fact: "The NBA shot clock gives teams 24 seconds to shoot."
    },
    {
      question: "How many personal fouls lead to disqualification in the NBA?",
      options: ["4", "5", "6", "7"],
      correct: "6",
      fact: "A player fouls out after 6 personal fouls in the NBA."
    },
    {
      question: "Which of these is a legal move?",
      options: ["Double dribble", "Jump ball", "Traveling", "Holding"],
      correct: "Jump ball",
      fact: "Jump ball is a way to start or restart play legally."
    },
    {
      question: "What happens after a technical foul?",
      options: ["Jump ball", "Substitution", "Free throw for opponent", "Timeout"],
      correct: "Free throw for opponent",
      fact: "Technical fouls result in a free throw for the other team."
    },
    {
      question: "What is the maximum number of quarters in a basketball game?",
      options: ["2", "3", "4", "5"],
      correct: "4",
      fact: "Basketball games are played in 4 quarters."
    },
    {
      question: "When does a shot count as a buzzer-beater?",
      options: [
        "When it's made before the shot clock resets",
        "When it's made right after the buzzer",
        "When it's made as the buzzer sounds",
        "When the buzzer is ignored"
      ],
      correct: "When it's made as the buzzer sounds",
      fact: "A buzzer-beater is made just before the game or quarter ends."
    }
  ];
  
  const quizContainer = document.getElementById("quiz");
  const submitButton = document.getElementById("submit");
  const resultContainer = document.getElementById("result");
  
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  document.body.appendChild(overlay);
  
  function loadQuiz() {
    quizContainer.innerHTML = "";
    quizData.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question-block");
      questionDiv.innerHTML = `<p><strong>${index + 1}. ${q.question}</strong></p>`;
      q.options.forEach(option => {
        const label = document.createElement("label");
        label.innerHTML = `
          <input type="radio" name="question${index}" value="${option}">
          ${option}
        `;
        questionDiv.appendChild(label);
      });
      const feedback = document.createElement("div");
      feedback.classList.add("feedback");
      feedback.id = `feedback${index}`;
      questionDiv.appendChild(feedback);
      quizContainer.appendChild(questionDiv);
    });
  }
  
  submitButton.addEventListener("click", () => {
    let score = 0;
  
    quizData.forEach((q, index) => {
      const selected = document.querySelector(`input[name="question${index}"]:checked`);
      const feedback = document.getElementById(`feedback${index}`);
      if (selected && selected.value === q.correct) {
        score++;
      } else {
        feedback.innerHTML = `<p><strong>Oops!</strong> Correct: <em>${q.correct}</em>. ${q.fact}</p>`;
      }
    });
  
    resultContainer.innerHTML = `<h3>Your Score: ${score}/${quizData.length} 🏀</h3>`;
    overlay.style.display = "block";
    resultContainer.style.display = "block";
    resultContainer.style.opacity = 0;
  
    setTimeout(() => {
      resultContainer.style.transition = "opacity 1s ease-in-out";
      resultContainer.style.opacity = 1;
    }, 100);
  
    if (score >= 7) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  });
  
  loadQuiz();
  document.getElementById("retry").addEventListener("click", () => {
    // Reset everything
    overlay.style.display = "none";
    resultContainer.style.display = "none";
    resultContainer.style.opacity = 0;
    loadQuiz(); // Rebuild quiz form
    window.scrollTo(0, 0); // Scroll to top
  });
   