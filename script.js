const questions = [
	{
		question: "In JavaScript, what is a string?",
		answers: [
			"A pseudo-class type used to represent and manipulate data.",
			"A primitive data type used to represent and manipulate textual data.",
			"An element used to put a border around images."
		],
		correctAnswer: 1
	},
	{
		question: "Which keyword declares a variable that cannot be reassigned?",
		answers: ["let", "var", "const"],
		correctAnswer: 2
	},
	{
		question: "Which method adds an item to the end of an array?",
		answers: ["push()", "shift()", "slice()"],
		correctAnswer: 0
	},
	{
		question: "What is the output of this expression? console.log([] + []);",
		answers: ["An empty string (\"\")", "0", "undefined"],
		correctAnswer: 0
	},
	{
		question: "Which line stores the number 25 in a variable named age?",
		answers: ["number age = 25;", "let age = 25;", "age == 25;"],
		correctAnswer: 1
	},
	{
		question: "What does typeof 42 return?",
		answers: ["integer", "number", "string"],
		correctAnswer: 1
	},
	{
		question: "Which method finds an HTML element by its id?",
		answers: ["document.getElementById()", "document.findId()", "document.queryClass()"],
		correctAnswer: 0
	},
	{
		question: "What does === compare?",
		answers: ["Only whether two values have the same type", "Whether two variables are functions", "Value and type without type conversion"],
		correctAnswer: 2
	},
	{
		question: "What is the value of count after this code? let count = 4; count++;",
		answers: ["4", "5", "6"],
		correctAnswer: 1
	},
	{
		question: "Which value is a Boolean?",
		answers: ["true", "\"true\"", "1"],
		correctAnswer: 0
	}
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const progressElement = document.getElementById("progress");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
	const currentQuestion = questions[currentQuestionIndex];

	questionElement.textContent = currentQuestion.question;
	progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
	answerButtonsElement.innerHTML = "";
	feedbackElement.textContent = "Choose an answer.";
	feedbackElement.className = "feedback";
	nextButton.hidden = true;
	nextButton.textContent = currentQuestionIndex === questions.length - 1
		? "See Results"
		: "Next Question";

	currentQuestion.answers.forEach((answer, answerIndex) => {
		const button = document.createElement("button");
		button.type = "button";
		button.className = "answer-btn";
		button.textContent = `${String.fromCharCode(65 + answerIndex)}. ${answer}`;
		button.addEventListener("click", () => selectAnswer(button, answerIndex));
		answerButtonsElement.appendChild(button);
	});
}

function selectAnswer(selectedButton, selectedAnswerIndex) {
	const currentQuestion = questions[currentQuestionIndex];
	const answerButtons = answerButtonsElement.querySelectorAll(".answer-btn");
	const isCorrect = selectedAnswerIndex === currentQuestion.correctAnswer;

	answerButtons.forEach((button, buttonIndex) => {
		button.disabled = true;
		if (buttonIndex === currentQuestion.correctAnswer) {
			button.classList.add("correct");
		}
	});

	if (isCorrect) {
		score += 1;
		feedbackElement.textContent = "Correct! Nice work.";
		feedbackElement.classList.add("correct-text");
	} else {
		selectedButton.classList.add("wrong");
		feedbackElement.textContent = "Not quite. The highlighted answer is correct.";
		feedbackElement.classList.add("wrong-text");
	}

	scoreElement.textContent = `Score: ${score}`;
	nextButton.hidden = false;
}

function showResults() {
	questionElement.textContent = `Quiz complete! You scored ${score} out of ${questions.length}.`;
	progressElement.textContent = "Well done for practicing JavaScript.";
	answerButtonsElement.innerHTML = "";
	feedbackElement.textContent = score === questions.length
		? "Perfect score!"
		: "Review the answers and try again to improve your score.";
	feedbackElement.className = "feedback correct-text";
	nextButton.textContent = "Try Again";
	nextButton.hidden = false;
}

nextButton.addEventListener("click", () => {
	if (currentQuestionIndex === questions.length - 1) {
		if (nextButton.textContent === "Try Again") {
			currentQuestionIndex = 0;
			score = 0;
			scoreElement.textContent = "Score: 0";
			showQuestion();
		} else {
			showResults();
		}
	} else {
		currentQuestionIndex += 1;
		showQuestion();
	}
});

showQuestion();
