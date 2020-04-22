const config    = require('../../common/config/env.config');
const UserModel = require('../models/users.model');
const crypto    = require('crypto');

/**
 * Inserts a new user record into the MongoDB database.
 * @param req
 * @param res
 */
exports.store = (req, res) => {

    // encrypt the new password and set a default permission level
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = config.permissionLevels.PERM_GUEST;

    // store the user record in the database
    // and send a response with the insert ID
    UserModel.doStore(req.body).then((result) => {
        res.status(201).send({id: result._id});
    });

};

/**
 * Fetches a list of users from the MongoDB database.
 * @param req
 * @param res
 */
exports.index = (req, res) => {

    // handle optional page parameter for pagination
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }

    // fetch a list of records and return a response
    UserModel.getRows(limit, page).then((result) => {
        res.status(200).send(result);
    });

};

/**
 *
 * @param req
 * @param res
 */
exports.show = (req, res) => {

    // fetch a record by ID and return a response
    UserModel.getRow(req.params.userId).then((result) => {
        res.status(200).send(result);
    });

};

/**
 *
 * @param req
 * @param res
 */
exports.update = (req, res) => {

    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    UserModel.doUpdate(req.params.userId, req.body).then((result) => {
        res.status(204).send({});
    });

};

/**
 *
 * @param req
 * @param res
 */
exports.destroy = (req, res) => {

    UserModel.doDestroy(req.params.userId).then((result)=>{
        res.status(204).send({});
    });

};