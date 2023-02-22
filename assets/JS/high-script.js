var highEl = document.querySelector("#highscores-element");

var highScoreCount = localStorage.getItem('highScoreCount');
var highscoresNameList = [];

highscoresNameList = JSON.parse(localStorage.getItem('highscoresNameList'));
console.log(highscoresNameList);

for (let i = 0; i < highscoresNameList.length; i++) {
    let newRow = document.createElement('tr');
    var newName = document.createElement('td');
    var newScore = document.createElement('td');

    highEl.appendChild(newRow);

    newName.textContent = highscoresNameList[i];
    newName.className = 'hsEl';
    newRow.appendChild(newName);

    newScore.textContent = localStorage.getItem(highscoresNameList[i]);
    newScore.className = 'hsEl';
    newRow.appendChild(newScore);
};