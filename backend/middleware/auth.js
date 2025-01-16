const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    const tokenWithoutBearer = token.split(' ')[1];
    
    if (!tokenWithoutBearer) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    console.log("Received Token: ", tokenWithoutBearer);  // Check if token is passed correctly

    try {
        const verified = jwt.verify(tokenWithoutBearer, 'secretKey');
        req.user = verified;
        next();
    } catch (err) {
        console.error(err);  // Log the error
        res.status(400).json({ message: 'Invalid Token' });
    }
};



const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied: Admins only' });
    }
    next();
};

module.exports = { authenticateToken, authorizeAdmin };
