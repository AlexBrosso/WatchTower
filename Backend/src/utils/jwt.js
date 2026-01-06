const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "1d";

function generateToken(payload){
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    })
}

function generateRefreshToken(payload){
    return jwt.sign( payload, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRES_IN
    })
}

function verifyToken(token){
    return jwt.verify(token, JWT_SECRET);
}

function verifyRefreshToken(token){
    return jwt.verify(token, JWT_REFRESH_SECRET);
}

function decodeObject(token){
    return jwt.decode(token);
}

module.exports = {
    generateToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken,
    decodeObject
};