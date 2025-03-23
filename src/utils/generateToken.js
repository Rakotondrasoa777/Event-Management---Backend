const jwt = require('jsonwebtoken');

const generateToken = (userName) => {
    return jwt.sign({username: userName}, "mot_secret877", {
        expiresIn: '1d'
    });
};

module.exports = generateToken;