const dotenv  = require('dotenv/config');
const jwt     = require('jsonwebtoken');
const crypto  = require('crypto');

/**
 * Authorizes a user by generating and returning a JWT token and refresh token.
 * @param req Request
 * @param res Response
 */
exports.authorize = (req, res) => {
    try {
        let id      = req.body.userId + process.env.JWT_SECRET;
        let salt    = crypto.randomBytes(16).toString('base64');
        let hash    = crypto.createHmac('sha512', salt).update(id).digest('base64');
        req.body.refreshKey = salt;
        let token   = jwt.sign(req.body, process.env.JWT_SECRET);
        let buffer  = new Buffer(hash);
        let refresh = buffer.toString('base64');
        res.status(201).send({accessToken: token, refreshToken: refresh});
    } catch (err) {
        res.status(500).send({status: 500, data: err});
    }
};
