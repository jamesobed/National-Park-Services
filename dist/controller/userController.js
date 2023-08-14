const userService = require('../services/user.services');

async function registerUser(req, res) {
    try {
        const result = await userService.registerUser(req.body);
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: `Failed to register ${err.message}`,
            route: '/register',
        });
    }
}
async function getAllUser(req, res) {
    try {
        const result = await userService.getAllUser();
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: `Failed to get all user ${err.message}`,
            route: '/getAllUser',
        });
    }
}
module.exports = {
    registerUser,getAllUser
};
