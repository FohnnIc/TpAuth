const jwt = require('jsonwebtoken');

// Middleware de vérification du token
exports.verifToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: "Aucun token fourni" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "token invalide" });
        }
        req.userId = decoded.id;
        next();
    }).catch(err);
}

// Middleware pour vérifier si l'utilisateur est un administrateur
exports.estAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(403).json({ message: "Aucun token fourni" });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token invalide" });
        }
        if (!decoded.isAdmin) {
            req.userId = decoded.id;
            next();
        }
        req.userId = decoded.id;
        req.isAdmin = decoded.isAdmin;
        next();
    });
}
