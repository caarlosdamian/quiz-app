const data = [
 {
  id: 1,
  question: "Which of these fish is actually a fish?",
  answers: [
   { answer: "swordfish", isCorrect: true },
   { answer: "jellyfish", isCorrect: false },
   { answer: "starfish", isCorrect: false },
   { answer: "crayfish", isCorrect: false },
  ],
 },
 {
  id: 2,
  question: "A flutter is a group of:",
  answers: [
   { answer: "bees", isCorrect: false },
   { answer: "penguins", isCorrect: false },
   { answer: "butterflies", isCorrect: true },
   { answer: "camels", isCorrect: false },
  ],
 },
 {
  id: 1,
  question: "A group of which animals is referred to as a wake?",
  answers: [
   { answer: "bats", isCorrect: false },
   { answer: "vultures", isCorrect: true },
   { answer: "ants", isCorrect: false },
  ],
 },
];

const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".result");
const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const submitButton = document.querySelector(".submit");
const play = document.querySelector(".play");

let qIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let selectedAnswer;

const playAgain = () => {
 score = 0;
 correctCount = 0;
 wrongCount = 0;
 selectedAnswer = undefined;
 qIndex = 0;
 showQuestion(qIndex);
};

play.addEventListener("click", () => {
 gameScreen.style.display = "block";
 resultScreen.style.display = "none";

 playAgain();
});

const showResult = () => {
 resultScreen.style.display = "block";
 gameScreen.style.display = "none";
 const correct = document.querySelector(".correct");
 const wrong = document.querySelector(".wrong");
 const score = document.querySelector(".score");
 correct.textContent = `Correct: ${correctCount}`;
 wrong.textContent = `Wrong: ${wrongCount}`;
 score.textContent = `Score: ${correctCount * 10}`; // 10 points per correct answer
};

const selectAnswer = () => {
 answersContainer.querySelectorAll("input").forEach((item) => {
  item.addEventListener("click", (e) => {
   selectedAnswer = e.target.value;
  });
 });
};

const showQuestion = (qNumber) => {
 if (qNumber === data.length) return showResult();
 selectedAnswer = null;
 question.textContent = data[qNumber].question;
 answersContainer.innerHTML = data[qNumber].answers
  .map((item, i) => {
   return ` <div class="answer">
    <input name="answer" type="radio" id="answer${i}" value="${item.isCorrect}">
    <label for="answer${i}">${item.answer}</label>
</div>`;
  })
  .join("");
 selectAnswer();
};

const submitAnswer = () => {
 submitButton.addEventListener("click", () => {
  if (selectedAnswer !== null) {
   selectedAnswer === "true" ? correctCount++ : wrongCount++;
   qIndex++;
   showQuestion(qIndex);
  } else alert("Please select an answer");
 });
};

const startGame = () => {
 play.addEventListener("click", startGame());
 qIndex = 0;
 score = 0;
 correctCount = 0;
 wrongCount = 0;
 selectedAnswer = undefined;
};

showQuestion(qIndex);
submitAnswer();
