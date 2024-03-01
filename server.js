const express = require("express");
const app = express();
const PORT = 3000;
const cookieParser = require("cookie-parser");
const uuidv4 = require("uuid").v4;
const homecontroller = require("./home-control");
const sessionModel = require("./session-model");
const game = require("./game");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());

const verifySession = (req, res, next) => {
	const sessionId = req.cookies.sessionId;
	if (!sessionId || !sessionModel.validateSession(sessionId)) {
		res.clearCookie("sessionId");
		res.status(400).send(homecontroller.loginPage("Session ID is invalid."));
	} else {
		req.sessionId = sessionId;
		next();
	}
};

app.get("/", (req, res) => {
	const sessionId = req.cookies.sessionId;

	if (!sessionId) {
		res.send(homecontroller.loginPage());
	} else if (!sessionModel.validateSession(sessionId)) {
		res.clearCookie("sessionId");
		const errorMessage = "Session ID is invalid.";
		res.status(400).send(homecontroller.loginPage(errorMessage));
	} else {
		const username = sessionModel.getUsername(sessionId);
		res.send(homecontroller.homePage(username, guessGame[username]));
	}
});

app.post("/login", (req, res) => {
	const username = req.body.username.trim();

	if (!username || !/^[a-zA-Z0-9]+$/.test(username)) {
		const errorMessage = 'Your username is invalid, it can only include letters and numbers.';
		return res.status(400).send(homecontroller.loginPage(errorMessage));
	} else if (username === 'dog') {
		const errorMessage = '"dog" is forbidden username.';
		return res.status(403).send(homecontroller.loginPage(errorMessage));
	} else {
		const sessionId = uuidv4();
		sessionModel.addSession(sessionId, username);

		if (!game.checkPlayer(username)) {
			game.startNewGame(username);
		}

		res.cookie("sessionId", sessionId);
		res.redirect("/");
	}
});

app.post("/logout", (req, res) => {
	const sessionId = req.cookies.sessionId;
	sessionModel.removeSession(sessionId);
	res.clearCookie("sessionId").redirect("/");
});

app.post("/new-game", verifySession,(req, res) => {
    const username = sessionModel.getUsername(req.sessionId);
    game.startNewGame(username);
    res.redirect("/");
});


app.post("/guess", verifySession, (req, res) => {
    const username = sessionModel.getUsername(req.sessionId);
    const guess = req.body.guess;

    if (game.validateGuess(username, guess)) {
        game.processGuess(username, guess);
    }

    res.redirect("/");
});

app.listen(PORT, () => {
	console.log(`listen on http://localhost:${PORT}`);
});
