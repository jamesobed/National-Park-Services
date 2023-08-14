const uuidv4 = require('uuid').v4;
const { where } = require('sequelize');
const usersParkInstance = require('../model/usersPark');
const {  suserSveParkSchema,options } = require('../utils/utils');

async function registerUserPark(userParkData) {
    const id = uuidv4();
    const validationResult = suserSveParkSchema.validate(userParkData, options);

    if (validationResult.error) {
        return {
            status: 400,
            data: {
                Error: validationResult.error.details[0].message,
            }
        };
    }

    const record = await usersParkInstance.create({
        id: id,
        ...userParkData,
    })

    return {
        status: 201,
        data: {
            message: 'Successfully registered an account on ByteSphere',
            record
        }
    };
}

async function getAllUserParks(payload) {
    const records = await usersParkInstance.findAll(
{        where:{
    userId:payload
}
}    );
    return {
        status: 200,
        data: {
            message: 'Successfully retrieved all parks',
            records
        }
    };
}

async function getUserParkById(id) {
    const record = await usersParkInstance.findOne({ where: { id } });
    if (!record) {
        return {
            status: 404,
            data: {
                message: 'Park not found',
            }
        };
    }
    return {
        status: 200,
        data: {
            message: 'Successfully retrieved park',
            record
        }
    };
}

async function updateUserPark(id, userParkData) {

}

async function deleteUserPark(payload) {
    const {id,userId} = payload
    const record = await usersParkInstance.findOne({ where: { id } });
    if (!record) {
        return {
            status: 404,
            data: {
                message: 'Park not found',
            }
        };
    }
    if(record.userId !== userId){
        return {
            status: 401,
            data: {
                message: 'You are not authorized to delete this park',
            }
        };
    }
    
    await record.destroy();
    return {
        status: 200,
        data: {
            message: 'Successfully removed park from saved parks list',
        }
    };
}

async function getUserParkByUserId(userId) {
    const records = await usersParkInstance.findAll({ where: { userId } });
    if (!records) {
        return {
            status: 404,
            data: {
                message: 'Park not found',
            }
        };
    }
    return {
        status: 200,
        data: {
            message: 'Successfully retrieved park',
            records
        }
    };
}

module.exports = {
    registerUserPark,
    getAllUserParks,
    getUserParkById,
    updateUserPark,
    deleteUserPark,getUserParkByUserId
};
