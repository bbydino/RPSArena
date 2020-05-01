const game = ()=> {
    let pScore = 0;
    let cScore = 0;
    const music = document.getElementById('music');

    const startGame = ()=> {
        const playBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const matchScreen = document.querySelector('.match');

        // Fade out intro, start the game!
        playBtn.addEventListener('click',()=>{
            introScreen.classList.add('fadeOut');
            matchScreen.classList.add('fadeIn');
            setTimeout(() => {
                music.play();
            }, 800);
        });
    };

    // Play Match
    const playMatch = ()=> {
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');

        hands.forEach(hand=>{
            hand.addEventListener('animationend', function(){
                this.style.animation = "";
            });
        });
        // Computer Options
        const computerOptions = ['rock', 'paper', 'scissors'];

        options.forEach(option=>{
            option.addEventListener('click', function () {
                // Computer Choice
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];

                // Delay the switch of the image by 2000 millisec
                setTimeout(() => {
                    // Compare the hands to see who wins
                    compareHands(this.textContent, computerChoice);
                    // Update images
                    playerHand.src = `./assets/${this.textContent}.png`;
                    computerHand.src = `./assets/${computerChoice}.png`;
                }, 1800);
                
                // Animation up and down shake. Default on rock
                playerHand.src = `./assets/rock.png`;
                computerHand.src = `./assets/rock.png`;
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease"
            });
        });
    };

    // Update the score on the page
    const updateScore = () => {
        const playerScore = document.querySelector('.player-score p');
        const computerScore = document.querySelector('.computer-score p');
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };

    // Compare the hands and see who wins. Update the winner text
    const compareHands = (playerChoice, computerChoice)=> {
        // Update text
        const winner = document.querySelector('.winner');
        document.querySelector('.secret-message').textContent = '';

        if (playerChoice === computerChoice) {
            winner.textContent = 'Tie game!';
            return;
        }

        if (playerChoice === 'rock' && computerChoice === 'scissors'
            || playerChoice === 'paper' && computerChoice === 'rock'
            || playerChoice === 'scissors' && computerChoice === 'paper') {
                winner.textContent = 'You win!';
                pScore++;
        }
        else {
            winner.textContent = 'You lose!';
            cScore++;
        }
        updateScore();
    };

    // Call all the inner functions
    startGame();
    playMatch();
};

// Start the game!
game();