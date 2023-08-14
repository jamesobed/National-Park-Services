const userParkServices = require('../services/userPark.services');

async function registerUserPark(req, res) {
    try {
        const payload = {...req.body};
        payload.userId = req.user.id;
        const result = await userParkServices.registerUserPark(payload);
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: `Failed to register ${err.message}`,
            route: '/register',
        });
    }
}

async function getAllUserParks(req, res) {
    try {
        const payload = req.user.id;

        const result = await userParkServices.getAllUserParks(payload);
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: `Failed to get all user ${err.message}`,
            route: '/getAllUser',
        });
    }
}

async function getUserParkById(req, res) {
    try {
        const result = await userParkServices.getUserParkById(req.params.id);
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: `Failed to get user ${err.message}`,
            route: '/getUser',
        });
    }
}

async function updateUserPark(req, res) {
    try {
        const result = await userParkServices.updateUserPark(req.params.id, req.body);
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: `Failed to update user ${err.message}`,
            route: '/updateUser',
        });
    }
}

async function deleteUserPark(req, res) {
    try {
        const payload = {userId:req.user.id,id:req.params.id}
        const result = await userParkServices.deleteUserPark(payload);
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: `Failed to delete user ${err.message}`,
            route: '/deleteUser',
        });
    }

}

module.exports = {
    registerUserPark,
    getAllUserParks,
    getUserParkById,
    updateUserPark,
    deleteUserPark
};
