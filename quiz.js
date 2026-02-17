// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const questionTest = document.getElementById("question-test");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessageDiv = document.getElementById("result-message");
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress");

// Quiz Questions
const quizQuestions = [
  {
    question: "اللَّهُمَّ لَكَ الْحَمُدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ ما صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
    answers: [
      { text: "چوونە سەر ئاو", correct: false },
      { text: "دووعای دەست نوێژ", correct: false },
      { text: "لەبەرکردنی پۆشاکی نوێ", correct: true },
      
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    answers: [
      { text: "Harper Lee", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Ernest Hemingway", correct: false },
      { text: "F. Scott Fitzgerald", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
      { text: "Fe", correct: false },
      { text: "Pb", correct: false },
    ],
  }
];

// Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Start Quiz
startButton.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  //reset variables
  currentQuestionIndex = 0;
  score = 0;
  answersDisabled = false;
  startScreen.classList.add("active");
  quizScreen.classList.remove("active");
  showQuestion();
}
function showQuestion() {
  //reset state for new question
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";
  questionTest.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const answerBtn = document.createElement("button");
    answerBtn.textContent = answer.text;
    answerBtn.classList.add("answer-btn");

    answerBtn.dataset.correct = answer.correct;
    answerBtn.addEventListener("click", selectAnswer);
    answersContainer.appendChild(answerBtn);
  });
}
function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;
  // bama dazane clicke la chi wallamek krdowa
  const selectedBtn = event.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedBtn) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }
  setTimeout(() => {
    currentQuestionIndex++;
    // bzana prsyare zyatr haya yan tawaw bowa
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}
function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;
  if (percentage >= 80) {
    resultMessageDiv.textContent =
      "Excellent work! You scored " + percentage.toFixed(2) + "%.";
    resultMessageDiv.classList.add("excellent");
  } else if (percentage >= 50) {
    resultMessageDiv.textContent =
      "Good job! You scored " + percentage.toFixed(2) + "%.";
    resultMessageDiv.classList.add("good");
  } else {
    resultMessageDiv.textContent =
      "Better luck next time! You scored " + percentage.toFixed(2) + "%.";
    resultMessageDiv.classList.add("poor");
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();

  
}
