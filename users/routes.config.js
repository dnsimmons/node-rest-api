const config               = require('../common/config/env.config');
const UsersController      = require('./controllers/users.controller');
const PermissionMiddleware = require('../common/middleware/auth.permission.middleware');
const ValidationMiddleware = require('../common/middleware/auth.validation.middleware');

const PERM_GUEST = config.permissionLevels.PERM_GUEST;
const PERM_USER  = config.permissionLevels.PERM_USER;
const PERM_ADMIN = config.permissionLevels.PERM_ADMIN;

/**
 * Application routing config for users resource.
 * @param app
 */
exports.routesConfig = function (app) {

    app.get('/users', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        UsersController.index
    ]);

    app.get('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.show
    ]);

    app.post('/users', [
        UsersController.store
    ]);

    app.patch('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.update
    ]);

    app.delete('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.destroy
    ]);

};