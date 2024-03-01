# Server-side Dynamic Site

## Goals
This is a web-based word guessing game created with pure backend-generated HTML, avoiding the use of front-end JS. The game fosters cognitive skills and offers an engaging experience. Below are the instructions to play and enjoy the game.


## Features
- Login Form: Users are prompted to enter a username for login. Valid usernames grant access to game features while invalid ones receive appropriate feedback.
- Game Page: Upon loading the page, users are greeted with the game interface, including:
  - Display of possible words for the secret word
  - List of previously guessed words and their matches
  - Count of valid guesses made in the current game
  - Information about the most recent guess and its match
  - Option to start a new game or logout
- Guessing Mechanism: Users can make guesses by submitting words via a form. The server evaluates the guess and responds accordingly, updating the game state.
- New Game: Starting a new game resets the secret word, number of guesses, and possible word list. The server selects a random word and logs the event.
- Invalid Guess Handling: The server distinguishes between valid and invalid guesses, managing the game state accordingly. Invalid guesses prompt redirection to the home page.
- Session Management: Users remain logged in until they choose to logout. Logging out clears the session cookie but retains game information for future sessions.
- Different Support: Each user's game progress is independent of others, ensuring privacy and individualized experiences.
- Case Insensitivity: Guesses are evaluated regardless of letter case, maintaining fairness and simplicity in gameplay.
- Word Matching: Guesses are compared to the secret word to determine letter matches, facilitating the guessing process.
Username Validity: Usernames are validated against an allowlist of characters, preventing unauthorized access.# Word-Guess-Game


- Getting Started
To run the project, follow these steps:
  - 1. Install the dependencies by running `npm install`.
  - 2. Start the project by running `npm run build`.
  - 3. Going to `http://localhost:3000`

