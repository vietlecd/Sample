const teacherRoute = require('./teacher.route');
const studentRoute = require('./student.route');


module.exports = (app) => {
    app.use('/student',studentRoute);
    app.use('/teacher',teacherRoute);
}