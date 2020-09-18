/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //display the result dice which was hided earlier
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    //update the round score if the rolled number was not 1
    if (dice !== 1) {
      //add the score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //change to next player
      changePlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //add the numbers
    scores[activePlayer] += roundScore;

    //display on the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //check if user is winner
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "You Won!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      changePlayer();
    }
  }
});
//new game event listner
document.querySelector(".btn-new").addEventListener("click", init);

//function to switch player to avoid code repeat
function changePlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  /*document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.add("active");*/
  //hide the dice again for the second player
  document.querySelector(".dice").style.display = "none";
}

//initialization fucntion
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //changing names from winner to player 1/2
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  //remove winner class
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  //remove active class
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  //add active class to player 1
  document.querySelector(".player-0-panel").classList.add("active");
}
