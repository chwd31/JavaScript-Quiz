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
        endQuiz();
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



startBtn.onclick = startQuiz;