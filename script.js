//TODO 📚 Module 4 - Lesson 02.03.01 Creating a Function - Quiz App Project

//* Quiz Data Array

const quizData = [
    {
        question: "What is the approximate age of the universe?",
        options: ["100,000 years", "15 billion years", "15 million years", "undetermined"],
        answer: "15 billion years"
    },
    {
        question: "What is a nebula?",
        options: ["a cataclysmic explosion", "a dense cloud of atoms", "a solar system", "the Big Bang"],
        answer: "a dense cloud of atoms"
    },
    {
        question: "A supernovae is:",
        options: ["a planet", "an end of the universe", "an explosion of a star", "the creation of life"],
        answer: "an explosion of a star"
    },
    {
        question: "How many planets are in our solar system?",
        options: ["five", "nine", "nineteen", "twenty-nine"],
        answer: "nine"
    },
    {
        question: "What is the order of planets from farthest to closest from the sun?",
        options: [
        "Mercury, Pluto, Venus, Earth, Jupiter, Mars, Saturn, Uranus, Neptune",
        "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune and Pluto",
        "Pluto, Neptune, Saturn, Jupiter, Uranus, Mars, Earth, Venus and Mercury",
        "Pluto, Neptune, Uranus, Saturn, Jupiter, Mars, Earth, Venus and Mercury"
        ],
        answer: "Pluto, Neptune, Uranus, Saturn, Jupiter, Mars, Earth, Venus and Mercury"
    },
    {
        question: "In what galaxy was the sun born?",
        options: ["the Bing Bang galaxy", "the Milky Way galaxy", "the New Way galaxy", "the Supernovae galaxy"],
        answer: "the Milky Way galaxy"
    },
    {
        question: "How were the planets in the solar system formed?",
        options: [
        "Dust and gases began to clump together to form planets around the sun",
        "Nebulae started to form planets around the sun",
        "None the choices",
        "Planets started to form as a result of nuclear fusion in the sun"
        ],
        answer: "Dust and gases began to clump together to form planets around the sun"
    }
];

const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const quizBlock = document.getElementById("quiz-block");
const scoreSection = document.getElementById("score");

// Hide score and quiz at start

scoreSection.style.display = "none";
quizBlock.style.display = "none";

const nextBtn = document.getElementById("next-btn");
const scoreBtn = document.getElementById("score-btn");
const resetBtn = document.getElementById("reset-btn");

// Hide all buttons initially

nextBtn.style.display = "none";
scoreBtn.style.display = "none";
resetBtn.style.display = "none";



startBtn.addEventListener("click", () => {
    welcomeScreen.style.display = "none";                               // Hide welcome screen
    quizBlock.style.display = "block";                                  // Show quiz section
    scoreSection.style.display = "none";                                // Make sure score is hidden

    nextBtn.style.display = "inline-block";                             // Show Next button
    scoreBtn.style.display = "none";                                    // Hide Score button
    resetBtn.style.display = "none";                                    // Hide Reset button

    currentQuestionIndex = 0;                                           // Reset question index
    score = 0;                                                          // Reset score
    selectedAnswer = null;

    showQuestion();                                                     //  Show first question
});

nextBtn.addEventListener("click", () => {
    if (selectedAnswer === null) {                                  //  Prevents the user from skipping questions
        alert("Please select an answer before continuing.");
        return;
    };
    
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {                //  Checks if the answer is correct
        score++;                                                    //  Increment score
    };

    currentQuestionIndex++;                                         //  Move to next question
    selectedAnswer = null;                                          //  Reset selection for next question
    showQuestion();                                                 //  Load next question
});

//* Event for the "Score Quiz" button

scoreBtn.addEventListener("click", () => {                          //  Triggers when user finishes the last question
    if (selectedAnswer === null) {
        alert("Please select an answer before scoring.");
        return;
    }

    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
        score++;                                                    //  Updates final answer if correct
    }

    // Hide quiz block and show score
    quizBlock.style.display = "none";                               //  Hides the quiz UI
    scoreSection.style.display = "block";                           //  Reveals the results

    // Hide unnecessary buttons, show only reset
    nextBtn.style.display = "none";
    scoreBtn.style.display = "none";
    resetBtn.style.display = "inline-block";                        //  Shows only the Reset button

    // Calculate and display score
    const totalQuestions = quizData.length;
    const percentage = ((score / totalQuestions) * 100).toFixed(2);

    document.getElementById("score-percentage").innerText = `${percentage}%`;
    document.getElementById("questions-answered").innerText = totalQuestions;
    document.getElementById("total-questions").innerText = totalQuestions;
    document.getElementById("correct-answers").innerText = score;
});


//* Set Up Quiz State: Tracks the question and answers

let currentQuestionIndex = 0;                                           // Tracks which question is on
let score = 0;                                                          // Tracks how many answers are correct

//*  DOM Elements for the Question + Answers

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

//*  Function to Load a Question

function showQuestion() {
    answerButtonsElement.innerHTML = "";                                //  Clears out old answers from the screen
    
    if (currentQuestionIndex < quizData.length - 1) {                   //  Show 'Next' if not last question
        nextBtn.style.display = "inline-block";
    } else {
        nextBtn.style.display = "none";
        scoreBtn.style.display = "inline-block";                        //  Show 'Score Quiz' on last question
    }

    const currentQuestion = quizData[currentQuestionIndex];             //  Gets the current question from the list
    questionElement.innerHTML = `<strong>${currentQuestionIndex + 1}. </strong>${currentQuestion.question}`;           //  Updates and display the question text

    const ul = document.createElement("ul");                            //  Create the UL container for answer choices
    ul.classList.add("quiz-order");                                     //  Adds a custom A-B-C list style

    currentQuestion.options.forEach(option => {                         //  Loop through options and create a styled <li> for each
        const li = document.createElement("li");
        li.classList.add("quiz-answer");                                //  Applies defined spacing and styling
        li.innerText = option;
        ul.appendChild(li);                                             //  Adds the complete list to the page
        li.addEventListener("click", () => {
            const allAnswers = document.querySelectorAll(".quiz-answer");           //  Remove 'selected' from all answers. Finds all <li> options on the screen
            allAnswers.forEach(answer => answer.classList.remove("selected"));      //  Clears highlight from any previous choice

            li.classList.add("selected");                               // Add 'selected' to the clicked one.   Highlights the one was just clicked.

            selectedAnswer = option;                                    // Save the selected answer. Stores the selected value for later use (e.g. scoring).
        });
    });
    answerButtonsElement.appendChild(ul);                               //  Add the full list to the DOM
}

let selectedAnswer = null;

//* "Reset" Button Functionality

resetBtn.addEventListener("click", () => {
    scoreSection.style.display = "none";                                //  Hides the quiz/score UI

    welcomeScreen.style.display = "block";                              //  Brings back welcome screen

    // Hide all buttons
    nextBtn.style.display = "none";
    scoreBtn.style.display = "none";
    resetBtn.style.display = "none";                                    //  Hides Reset until next score screen

    // Reset state variables
    currentQuestionIndex = 0;                                           //  Starts over from question 1
    score = 0;                                                          //  Resets the points
    selectedAnswer = null;

    // Clear question and answers
    questionElement.innerText = "";                                     //  Clears old question/answers
    answerButtonsElement.innerHTML = "";                                //  Clears the answer list

    // Clear score UI
    document.getElementById("score-percentage").innerText = `0%`;
    document.getElementById("questions-answered").innerText = `0`;
    document.getElementById("total-questions").innerText = `0`;
    document.getElementById("correct-answers").innerText = `0`;
});

//* Reset the game

// resetBtn.style.display = "inline-block";


//! ✅ If all else fails, type:
document.getElementById("reset-btn").getBoundingClientRect();





























