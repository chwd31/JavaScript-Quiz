// function for creating, sorting and displaying the high scores from the game.
function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    for (var i = 0; i < highscores.length; i +=1) {
        var liTag = document.createElement('li');
        liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

        var olEl = document.getElementById('highscores');
        olEl.appendChild(liTag);
    }
}

// Function for clearing the high scores from the local storage. 
function clearHighScores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
}

// Event listener for the clear high score button
document.getElementById('clear').onclick = clearHighScores;

printHighscores()