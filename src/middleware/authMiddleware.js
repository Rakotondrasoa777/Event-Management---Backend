const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', "");

    if (!token) {
        return res.status(401).send({error: "No token, authorization denied"});
    }
     try {
        const decoded = jwt.verify(token, "mot_secret877");
        req.users = decoded;
        next();
     } catch (error) {
        res.status(401).send({error: "Token is not valid"});
     }
}

module.exports = authMiddleware;