const sessions = {};

function addSession(sessionId, username) {
    sessions[sessionId] = {username};
}

function validateSession(sessionId) {
    return sessionId in sessions;
}

function getUsername(sessionId) {
    if (!validateSession(sessionId)) {
        throw new Error('Session ID is not valid');
      }
      return sessions[sessionId].username;
}

function removeSession(sessionId) {
    delete sessions[sessionId];
}


const sessionModle = {
    sessions,
    addSession,
    validateSession,
    getUsername,
    removeSession,
}

module.exports = sessionModle