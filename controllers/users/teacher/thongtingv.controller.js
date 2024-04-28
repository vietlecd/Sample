const teacher = require('../../../models/teacher.model');

module.exports.dashboard = async (req, res) => {
    const {msgv} = req.user
    try {
        const tea = await teacher.findOne({"msgv": msgv})
        .select({"password": 0, "passwordChanged": 0});
        res.json(tea); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};

module.exports.updatePicture = async (req, res) => {
    const {msgv} = req.user
    try {
        const find_filter = {"msgv": msgv}
        const update_filter = {$set: {"image": req.body.image}};
        const update_option = {new: true}
        const picup = await teacher.updateOne(find_filter, update_filter, update_option);
        if(!picup){
            return res(400).send('Cannot update picture!')
        }
        res.json(picup); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
  };