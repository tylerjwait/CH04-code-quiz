var startBtn = document.querySelector('#start-button');
var questionHead = document.querySelector('#question-line');
var hideTxt = document.querySelector('#rules');
var bttnList = document.querySelector('.options');
var bttnEl = document.querySelector('.options-list');
 
// time variables
var timer;
var seconds = 60;

// lines 12-21 handles the highscores list
highscoresNameList = JSON.parse(localStorage.getItem('highscoresNameList'));
if (highscoresNameList === null) {
    highscoresNameList = [];
}

var highScoreCount = JSON.parse(localStorage.getItem('highScoreCount'));
console.log('high', highScoreCount)
if (highScoreCount === null) {
    highScoreCount = 0;
}

var quizContent = [
    {
        question: "What is the correct HTML element for the largest heading?",
        Answers: [
            '<div>',
            '<h1>',
            '<body>',
            '<heading_large>'
        ],
        correctAnswer: '<h1>',
    },
    {
        question: "How can you make a bulleted list?",
        Answers: [
            '<ol>',
            '<a>',
            '<ul>',
            '<span>'
        ],
        correctAnswer: '<ul>',
    },
    {
        question: 'To access an HTML element from JavaScript, you can use which method',
        Answers: [
            'getElementById()',
            'acessHTML()',
            'retrieveElement()',
            'Java.getScript(element.id)'
        ],
        correctAnswer: 'getElementById()',
    },
    {
        question: 'Single line comments start with this',
        Answers: [
            '//',
            '>>>>>>>',
            'Comment-here=',
            '<comm>'

        ],
        correctAnswer: '//',
    },
    {
        question: 'Which term is used to declare a javascript variable',
        Answers: [
            'jvariable',
            'number =',
            'declare(var)',
            'var',
        ],
        correctAnswer: 'var',
    }
];

var count = 0;
var score = 0;

startBtn.addEventListener('click', function (event) {
    event.preventDefault();
    startGame();
    return;
});

function startGame() {
    hideTxt.textContent = '';
    startBtn.style.display = 'none';

    startTimer();
    renderQuiz();
};

function renderQuiz() {
    if (count < 5) {
        questionHead.textContent = 'Question ' + (count + 1) + ': ' + quizContent[count].question;

        for (var i = 0; i < 4; i++) {
            var buttonList = document.createElement('ul');
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'answer-buttons'
            button.textContent = quizContent[count].Answers[i];
            buttonList.appendChild(button);
            bttnEl.appendChild(buttonList);
        };
    } else {   
        clearInterval(timer);
        logHighScore();
        return;
    };
    checkAnswer();
};

function checkAnswer() {
    bttnEl.addEventListener('click', function (event) {
        var selectedAnswer = event.target.textContent;
        console.log(selectedAnswer);

        if (selectedAnswer == quizContent[count].correctAnswer) {
            score++;
            console.log(score);
        } else {
            seconds -= 10;
        };

        count++;
        init();
        renderQuiz();
        return score;
    })
};

function init() {
    questionHead.textContent = '';

    bttnList.removeChild(bttnEl);
    bttnEl = document.createElement('ul');
    bttnEl.className = 'options-list';
    bttnList.appendChild(bttnEl);
};

function logHighScore() {
    init();
    clearInterval(timer);

    var scoreSubmit = document.querySelector('.highscore-submit');

    questionHead.textContent = 'Great job! Your highscore is: ' + score;

    var playerName = document.createElement('input');
    playerName.className = 'score-name';
    playerName.type = 'text';
    playerName.placeholder = 'Enter your name: ';
    scoreSubmit.appendChild(playerName);

    var submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.type = 'submit';
    submitBtn.className = 'score-btn';
    scoreSubmit.appendChild(submitBtn);

    
    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();
        console.log(event.target);

        highScoreCount++;
 
        highscoresNameList.push(playerName.value);

        localStorage.setItem('highScoreCount', highScoreCount);
        localStorage.setItem(playerName.value, score);
        localStorage.setItem('highscoresNameList', JSON.stringify(highscoresNameList));
        window.location.replace('./highscores.html');
    });
};

function startTimer() {
    var timerText = document.querySelector('.timer');

    timer = setInterval(function(){
        seconds--;

        timerText.textContent = 'Time left:  ' + seconds;
        if(seconds == 0){
            clearInterval(timer);
            timerText.textContent = '';
            init();
            questionHead.textContent = 'Time is up!';

            setTimeout(function() {
                logHighScore();
            }, 2000)
        };
    }, 1000);
}