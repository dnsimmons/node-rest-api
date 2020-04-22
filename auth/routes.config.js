const VerifyUserMiddleware     = require('./middleware/verify.middleware');
const AuthorizationController  = require('./controllers/auth.controller');
const AuthValidationMiddleware = require('../common/middleware/auth.validation.middleware');

/**
 * Application routing config for auth resource.
 * @param app
 */
exports.routesConfig = function (app) {

    app.post('/auth', [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);

    app.post('/auth/refresh', [
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        AuthorizationController.login
    ]);

};