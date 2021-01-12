'use strict';


const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');

score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');
let currentPlayer = document
  .querySelector('.player--0')
  .classList.contains('player--active')
  ? 0
  : 1;

let someoneWon = false;
const changePlayerStyle = function (player) {
  if (player === 0) {
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.add('player--active');
  } else {
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
  }
};

const youWin = function () {
  if (Number(score0.textContent) >= 100) {
    document.querySelector('#name--0').textContent = 'Player 1 WINS!';
    someoneWon = true;
  } else if (Number(score1.textContent) >= 100) {
    document.querySelector('#name--1').textContent = 'Player 2 WINS!';
    someoneWon = true;
  }
};

const newGamePlayer = function () {
  if (
    document.querySelector('.player--0').classList.contains('player--active')
  ) {
    currentPlayer = 1;
  } else {
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    currentPlayer = 1;
  }
};

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (someoneWon === false) {
    let currentScore = Number(
      document.querySelector(`#current--${currentPlayer}`).textContent
    );
    const randomNumber = Math.trunc(Math.random() * 6 + 1);
    dice.attributes.src.nodeValue = `dice-${randomNumber}.png`;
    dice.classList.remove('hidden');
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.querySelector(
        `#current--${currentPlayer}`
      ).textContent = currentScore;
    } else {
      currentScore = 0;
      document.querySelector(
        `#current--${currentPlayer}`
      ).textContent = currentScore;
      changePlayerStyle(currentPlayer);
      currentPlayer = (currentPlayer + 1) % 2;
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (someoneWon === false) {
    let currentScore = Number(
      document.querySelector(`#current--${currentPlayer}`).textContent
    );
    if (currentPlayer === 0)
      score0.textContent = Number(score0.textContent) + currentScore;
    else score1.textContent = Number(score1.textContent) + currentScore;
    youWin();
    currentScore = 0;
    document.querySelector(
      `#current--${currentPlayer}`
    ).textContent = currentScore;
    changePlayerStyle(currentPlayer);
    currentPlayer = (currentPlayer + 1) % 2;
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  someoneWon = false;
  newGamePlayer();
  score0.textContent = 0;
  score1.textContent = 0;
  document.querySelector('#name--0').textContent = 'Player 1';
  document.querySelector('#name--1').textContent = 'Player 2';
  dice.classList.add('hidden');
});
