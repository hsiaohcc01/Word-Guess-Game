const words = require("./words");

guessGame = {};

function startNewGame (username) {
    const wordsSet = new Set(words);
    const chosenWord = words[Math.floor(Math.random() * words.length)];

    guessGame[username] = {
        wordsPool: wordsSet,
        chosenWord: chosenWord,
        pastGuesses: [],
        recentGuessValid: true,
        totalGuesses: 0,
        guessCorrect: false,
    }
    console.log("Username: ", username);
    console.log("Secret Word: ", guessGame[username].chosenWord);
}

function checkPlayer (username) {
    return username in guessGame;
}

function validateGuess (username, guess) {
    const isValid = guess.length > 0 && guessGame[username].wordsPool.has(guess.toLowerCase());
    guessGame[username].recentGuessValid = isValid;
    return isValid;
}

function processGuess(username, guess) {
    guess = guess.toLowerCase();
    const gameData = guessGame[username];

    const matchCount = compareWords(gameData.chosenWord, guess);

    gameData.wordsPool.delete(guess);

    gameData.pastGuesses.push({ guess, matchCount });

    gameData.totalGuesses += 1;

    gameData.guessCorrect = (guess === gameData.chosenWord);
}

function compareWords(chosenWord, guessWord) {
    const alphabetCount = Array(26).fill(0);
    let matchCount = 0;

    for (let char of chosenWord.toLowerCase()) {
        if (char >= 'a' && char <= 'z') {
            alphabetCount[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
    }

    for (let char of guessWord.toLowerCase()) {
        if (char >= 'a' && char <= 'z' && alphabetCount[char.charCodeAt(0) - 'a'.charCodeAt(0)] > 0) {
            matchCount++;
            alphabetCount[char.charCodeAt(0) - 'a'.charCodeAt(0)]--;
        }
    }

    return matchCount;
}

const game = {
    guessGame,
    startNewGame,
    checkPlayer,
    validateGuess,
    processGuess,
}

module.exports = game;