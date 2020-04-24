const AuthMiddleware = require('../middleware/auth.middleware');
const AuthController = require('../controllers/auth.controller');

/**
 * Auth resource routing.
 * @param app Application
 */
exports.routesConfig = (app) => {

    app.post('/authorize', [
        AuthMiddleware.authenticate,
        AuthController.authorize
    ]);

};