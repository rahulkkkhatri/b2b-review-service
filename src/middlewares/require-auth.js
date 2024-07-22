module.exports = {
    requireAuth: (req, res, next) => {
        if (!req.currentUser) {
            return res.status(401).send({ message: "Unauthorized" })
        }

        next();
    }
}