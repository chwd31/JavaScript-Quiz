// Variables as questions for quiz
var questions = [
    {
        title: 'Question 1',
        choices: ['a', 'b', 'c', 'd'],
        answer: 'a',
    },
    {
        title: 'Question 2',
        choices: ['a', 'b', 'c', 'd'],
        answer: 'a',
    },
    {
        title: 'Question 3',
        choices: ['a', 'b', 'c', 'd'],
        answer: 'a',
    },
    {
        title: 'Question 4',
        choices: ['a', 'b', 'c', 'd'],
        answer: 'a',
    },
    {
        title: 'Question 5',
        choices: ['a', 'b', 'c', 'd'],
        answer: 'a',
    },
];

// timer variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables referencing DOM traversal
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var startBtn = document.getElementById('start')
var submitBtn = document.getElementById('submit');
var initialsEl = document.getElementById('initials')
var feedbackEl = document.getElementById('feedback')

// Function starts quiz by hiding start screen and removing the hide class
// on questions, starts timer
function startQuiz() {
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class', 'hide');
    questionsEl.removeAttribute('class');
    timerId = setInterval(clockTick, 1000);

    getQuestion()
}

function clockTick(){
    time--;
    timerEl.textContent = time;

    if(time <= 0) {
        quizEnd();
    }
}

// function to get questions from variable array and create buttons for 
// answer choices, update the title with questions, clear any old choices
// and loop over question choices
function getQuestion(){
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = '';

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);

        choiceNode.textContent = i + 1 + '. ' + choice;

        choicesEl.appendChild(choiceNode);
        }

}

// Function for selecting the answer choices in the quiz.  Time penalty. Gives
// user feedback on answer choice, pauses timer, moves on to next question or
// ends quiz if no more questions. 
function questionClick(event) {
    var buttonEl =event.target;

    if (!buttonEl.matches('.choice')) {
        return;
    }

    if (buttonEl.value !== questions[currentQuestionIndex].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        timerEl.textContent = time;
        feedbackEl.textContent = 'Incorrect';
    } else {
        feedbackEl.textContent = 'Correct'
    }

    currentQuestionIndex++;

    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function(){
        feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);

    if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// Function to end quiz - Stops interval, displays end screen, sets time as 
// final score
function quizEnd() {
    clearInterval(timerId);

    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;

    questionsEl.setAttribute('class', 'hide');
}

function saveHighscore() {
    var initials = initialsEl.value.trim();

    if (initials !== '') {
        var highscores = 
        JSON.parse(window.localStorage.getItem('highscores')) || [];

        var newScore = {
            score: time,
            initials: initials,
        };

        highscores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));

        window.location.href = 'highscore.html';
    }
}

function checkForEnter(event) {
    if(event.key === 'Enter') {
        saveHighscore();
    }
}

// Event Listeners
startBtn.onclick = startQuiz;

submitBtn.onclick = saveHighscore;

choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;


