'use strict';

// selecting elements in variables.
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1'); //in this we don't have to put '#' before I'D name.
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

// Starting Conditions

let scores, currentScore, activePlayer, playing;
// Initialisation function.
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove(`player--winner`);
  player1EL.classList.remove(`player--winner`);
  player0EL.classList.add(`player--active`);
  player1EL.classList.remove(`player--active`);
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

// Rolling Dice Functionality.
btnroll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll.
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice.
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    // 3. Adding the Dice-value to the current score.
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// HOLD Button functionality.
btnhold.addEventListener('click', function () {
  if (playing) {
    // 1. Add currentScore to the active player score.
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if active player's score >= 100.
    if (scores[activePlayer] >= 20) {
      // finish the game.
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    }
    // 3. otherwise switch players.
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
