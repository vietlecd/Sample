const bangdiemModel = require('../../models/course.model');

module.exports.dashboard = async (req, res) => {
    try {
        const bangdiem = await bangdiemModel .find();
        console.log(bangdiem);
        res.json(bangdiem); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};