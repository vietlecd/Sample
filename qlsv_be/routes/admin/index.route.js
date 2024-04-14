const adminRoutes = require('./admin.route');


module.exports = (app) => {
    const PATH_ADMIN = '/admin';
    app.use(PATH_ADMIN + '/', adminRoutes);

}