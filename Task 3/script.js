
// Random Joke Generator

document.getElementById("jokeBtn").addEventListener("click", getJoke);

async function getJoke() {
    try {
        const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
        const data = await res.json();
        document.getElementById("jokeText").innerText = data.joke || "Couldn't fetch a joke 😢";
    } catch (error) {
        document.getElementById("jokeText").innerText = "Error fetching joke!";
    }
}


// Quiz Questions (Web Dev Related)

let questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Transfer Machine Language"
        ],
        answer: 0
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Colorful Style Sheets"
        ],
        answer: 1
    },

    {
        question: "Which HTTP method is used to update data?",
        options: ["GET", "POST", "PUT", "FETCH"],
        answer: 2
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Google", "Netscape", "Microsoft", "Oracle"],
        answer: 1
    }
];


// Shuffle Questions

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
questions = shuffleArray(questions);

let currentIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

// Load Question

function loadQuestion() {
    if (currentIndex < questions.length) {
        const currentQuestion = questions[currentIndex];
        document.getElementById("quizQuestion").innerText = currentQuestion.question;

        const optionsContainer = document.getElementById("quizOptions");
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const label = document.createElement("label");
            label.innerHTML = `<input type="radio" name="quiz" value="${index}"> ${option}`;
            optionsContainer.appendChild(label);
            optionsContainer.appendChild(document.createElement("br"));
        });

        document.getElementById("quizResult").innerText = "";
        timeLeft = 15;
        document.getElementById("timeLeft").innerText = timeLeft;
        clearInterval(timer);
        startTimer();
    } else {
        endQuiz();
    }
}


// Timer

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timeLeft").innerText = timeLeft;
        } else {
            clearInterval(timer);
            document.getElementById("quizResult").innerText = "⏳ Time's up!";
            setTimeout(nextQuestion, 1000);
        }
    }, 1000);
}


// Submit Answer

document.getElementById("quizSubmit").addEventListener("click", submitQuiz);

function submitQuiz() {
    const answer = document.querySelector('input[name="quiz"]:checked');
    if (!answer) {
        document.getElementById("quizResult").innerText = "⚠ Please select an answer.";
        return;
    }
    if (parseInt(answer.value) === questions[currentIndex].answer) {
        score++;
        document.getElementById("quizResult").innerText = "✅ Correct!";
    } else {
        document.getElementById("quizResult").innerText =
            `❌ Wrong! Correct answer: "${questions[currentIndex].options[questions[currentIndex].answer]}".`;
    }
    clearInterval(timer);
    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentIndex++;
    loadQuestion();
}


// End Quiz

function endQuiz() {
    document.querySelector(".card.quiz").innerHTML = `
        <h2>🎉 Quiz Finished!</h2>
        <p>Your Score: ${score} / ${questions.length}</p>
    `;
    document.body.style.backgroundColor = "lightskyblue";
    clearInterval(timer);
}


// Start Quiz

loadQuestion();
