const dotenv  = require('dotenv/config');
const jwt     = require('jsonwebtoken');
const crypto  = require('crypto');

const UserModel = require('../models/user.model');

/**
 * Checks if the request contains a valid Bearer token.
 * @param req Request
 * @param res Response
 * @param next Next
 */
exports.isAuthorized = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send({
                    status: 401,
                    data:{error: 'Unauthorized'}
                });
            } else {
                req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
                return next();
            }
        } catch (err) {
            return res.status(403).send({
                status: 403,
                data:{error: 'Forbidden'}
            });
        }
    } else {
        return res.status(401).send({
            status: 401,
            data:{error: 'Unauthorized'}
        });
    }
};

/**
 * Authenticates the users credentials.
 * @param req Request
 * @param res Response
 * @param next Next
 */
exports.authenticate = async (req, res, next) => {
    try{
        const result = await UserModel.find({'email' : req.body.email});
        if(!result[0]){
            return res.status(404).send({status: 404, data: 'Not Found'});
        } else {
            let password = result[0].password.split('$');
            let salt     = password[0];
            let hash     = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
            if (hash === password[1]) {
                req.body = {
                    id: result[0]._id,
                    email: result[0].email,
                    provider: 'email',
                    name: result[0].name,
                };
                return next();
            } else {
                return res.status(400).send({status: 401, data: 'Unauthorized'});
            }
        }
    } catch(err) {
        res.status(500).json({status: 500, data: err});
    }
};
