const jwt = require('jsonwebtoken');

module.exports = {
    currentUser: (req, res, next) => {
        if (!req.headers['x-access-token']) {
            return next();
        }

        try {
            const payload = jwt.verify(
                req.headers['x-access-token'],
                process.env.JWT_KEY
            );
            req.currentUser = payload;
        } catch (err) { }

        next();
    }
}

