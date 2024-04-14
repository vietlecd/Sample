const homeController = require('../../controllers/users/home.controller');

const teacherRoute = require('./teacher.route');
const studentRoute = require('./student.route');


module.exports = (app) => {
    app.get('/', homeController.home);
   

    app.use('/teacher',teacherRoute);
    app.use('/student',studentRoute);
}