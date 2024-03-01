const homecontroller = {
    loginPage: function (errorMessage) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="style.css">
            <title>Word Guessing</title>
        </head>
        <body>
            <div class="container">
                <h1>Words Guess Challenge</h1>
                <div class="login">
                    <form action="/login" method="POST">
                        <lable class="form-lable">
                            <span>Log In To Your Account: </span>
                            <input class="form-input" name="username">
                            ${errorMessage ? `<p class="alert"><span>${errorMessage}</span></p>` : ''} 
                        </lable>
                        <button type="submit" class="log-btn">Log In</button>
                    </form>
                </div>
            </div>
        </body>
        </html>
        `;
    },

    homePage: function (username, gameData) {
        let wordsPoolEl = "";
        gameData.wordsPool.forEach((item) => {
            wordsPoolEl += `<li>${item}</li>`;
        });

        let pastGuessesEl = ""
        gameData.pastGuesses.forEach(item => {
            pastGuessesEl += `
            <li>${item.guess}: ${item.matchCount}</li>
            `
        })

        const pastGuessesLength = gameData.pastGuesses.length
        const recentGuess = gameData.pastGuesses[pastGuessesLength - 1]

        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="style.css">
            <title>Words Guess Challenge</title>
        </head>
        <body>
            <div class="container">
                
                <h1>Words Guess Challenge</h1>
                
                <span class="user-name">Hi, ${username}</span>
                
                <div class="valid-word">
                    <h2>Possible word options:</h2>
                </div>

                <div class="possibleword">${wordsPoolEl}</div>

                <div class="previous-guess">
                    <h2>Previous Guess</h2>
                    <ul>${pastGuessesEl}</ul>
                </div>

                <div class="guess-info">
                    <h2>Total Guess(es):</h2><p>${gameData.totalGuesses}</p>
                    ${recentGuess ? `<h2>Last Guess:</h2><p>${recentGuess.guess}: ${recentGuess.matchCount}</p>` : ''}
                </div>

                ${gameData.recentGuessValid ? `` : `<p class="alert">Your input does not qualify as a valid guess.</p>`}
                ${gameData.guessCorrect ? `<p class="alert">Congratulations, you've won!!</p>` : this.getGuessForm()}

                <div class="button-group">
                    ${this.getNewGameForm()}
                    ${this.getLogoutForm(username)}
                </div>
            </div>
        </body>
        </html>
        `;
    },

    getNewGameForm: function () {
        return `
        <div class="new-game">
            <form action="/new-game" method="POST">
                <button type="submit" class="form-btn">Start a new game</button>
            </form>
        </div>
        `
    },

    getLogoutForm: function () {
        return `
        <div class="logout">
            <form action="/logout" method="POST">
                <button type="submit" class="form-btn">Logout</button>
            </form>
        </div>`;
    },

    getGuessForm: function () {
        return `
        <div class="guess">
            <form action="/guess" class="guess-form" method="POST">
                <lable class="form-lable">
                <input class="form-input" name="guess" placeholder="Enter Your Guess Here">
                </lable>
                <button type="submit" class="form-btn">Guess</button>
            </form>
        </div>
        `;
    },
};

module.exports = homecontroller;
