/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, winScore, gamePlaying;

var prevDice1, prevDice2;

init();
winScore = 100;
prevDice1 = 0;
prevDice2 = 0;


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // generate random number between 1 - 6
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // Display the result 
        var diceDOM1 = document.querySelector('.dice1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        // Update the roundscore IF the rolled number is NOT a 1
        if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
            // Reset entire score when player rolls two 6 in a row
            if (prevDice1 === 6 && prevDice1 === dice1 || prevDice2 === 6 && prevDice2 === dice2) {
                
                //reset scores of active player
                scores[activePlayer] = 0;
                roundScore = 0

                //update UI
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                document.querySelector('#current-' + activePlayer).textContent = roundScore;

                //next player
                nextPlayer();
            }
        } else {
            // Next player
            nextPlayer();
        }
                
        prevDice1 = dice1;
        prevDice2 = dice2;
    } 
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // add roundscore to global score
        scores[activePlayer] += roundScore;

        // update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        //get present winscore and update
        var newWinScore = document.getElementById('winscore-box').value;
        if (newWinScore) {
            winScore = newWinScore;
        } else {
            winScore = 100;
        }
                
        // check if player won the game
        if (scores[activePlayer] >= winScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // next player
            nextPlayer();
        }
    }
});


document.querySelector('.btn-new').addEventListener('click', init);


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prevDice1 = 0;
        
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}


function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}
 


/*
JS - CHALLENGE6

3 CHALLENGES

Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, It's the next player's turn. (HINT: Always save the previous dice roll in a separate variable) 
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (HINT: you can read that value with the .value property in Javascipt. This is a good opportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (HINT: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/










