const AuthMiddleware      = require('../middleware/auth.middleware');
const CompaniesController = require('../controllers/companies.controller');

/**
 * Companies resource routing
 * @param app Application
 */
exports.routesConfig = (app) => {

    app.get('/companies', [
        AuthMiddleware.isAuthorized,
        CompaniesController.index
    ]);

    app.get('/companies/:companyId', [
        AuthMiddleware.isAuthorized,
        CompaniesController.show
    ]);

    app.post('/companies', [
        AuthMiddleware.isAuthorized,
        CompaniesController.store
    ]);

    app.patch('/companies/:companyId', [
        AuthMiddleware.isAuthorized,
        CompaniesController.update
    ]);

    app.delete('/companies/:companyId', [
        AuthMiddleware.isAuthorized,
        CompaniesController.destroy
    ]);

};