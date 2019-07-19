module.exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken;
        console.log(req.token);
        next()
    } else {
        res.sendStatus(403);
    }
}