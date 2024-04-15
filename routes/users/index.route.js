const teacherRoute = require('./teacher.route');
const studentRoute = require('./student.route');


module.exports = (app) => {
    app.use('/teacher',teacherRoute);
    app.use('/student',studentRoute);
}