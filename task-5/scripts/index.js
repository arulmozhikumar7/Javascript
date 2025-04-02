let quizData = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];

fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        quizData = data;
        selectedAnswers = Array(quizData.length).fill(null); 
        loadQuestion();
    })
    .catch(error => console.error("Error loading questions:", error));

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextBtn");
const prevButton = document.getElementById("prevBtn");
const resultElement = document.getElementById("result");

function loadQuestion() {
    if (quizData.length === 0) return; 

    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(option));
        if (selectedAnswers[currentQuestionIndex] === option) {
            button.style.background = "#4CAF50";
        }
        optionsElement.appendChild(button);
    });

    updateButtons();
}

function selectAnswer(selectedOption) {
    selectedAnswers[currentQuestionIndex] = selectedOption;
    loadQuestion();
}

function updateButtons() {
    prevButton.style.display = currentQuestionIndex > 0 ? "block" : "none";
    nextButton.textContent = currentQuestionIndex < quizData.length - 1 ? "Next" : "Submit";
}

function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        calculateScore();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function calculateScore() {
    score = selectedAnswers.reduce((acc, answer, index) => {
        return acc + (answer === quizData[index].answer ? 1 : 0);
    }, 0);
    showResult();
}

function showResult() {
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    resultElement.textContent = `You scored ${score} out of ${quizData.length}`;
}

nextButton.addEventListener("click", nextQuestion);
prevButton.addEventListener("click", prevQuestion);
