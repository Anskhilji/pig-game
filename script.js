'use strict';

// selecting the elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
// starting conditions
const init = function (){
     scores = [0,0]
     currentScore = 0;
     activePlayer = 0;
     playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();


const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
// Rolling dice functionality
btnRollEl.addEventListener('click', function (){
    if (playing){
        diceEl.classList.remove('hidden');
//   1. generate the random dice
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2. display dice
        diceEl.src = `dice-${dice}.png`;
//   3. checked for rolled 1
        if (dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else {
            //switch to the next player
            switchPlayer();
        }
    }
});
btnHoldEl.addEventListener('click',function (){
    if (playing){
        // add current score to active current player score
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
//   check if scores >= 100
        if (scores[activePlayer] >= 100){
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }else {
            //    switch the player
            switchPlayer();
        }
    }
});
btnNewEl.addEventListener('click', init);