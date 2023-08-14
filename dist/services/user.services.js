const uuidv4 = require('uuid').v4;
const bcryptjs = require('bcryptjs');
const userInstance = require('../model/userModel');
const { signUpSchema, options } = require('../utils/utils');
const tokenServices = require('../services/token.services');


async function registerUser(userData) {
    const { password, ...restData } = userData;
    const id = uuidv4();
    const validationResult = signUpSchema.validate(userData, options);

    if (validationResult.error) {
        return {
            status: 400,
            data: {
                Error: validationResult.error.details[0].message,
            }
        };
    }

    const duplicateEmail = await userInstance.findOne({ where: { email: userData.email } });

    if (duplicateEmail) {
        const passwordMatch = await bcryptjs.compare(password, duplicateEmail.password);
        
        if (passwordMatch) {
            const token = tokenServices.generateToken({ id: duplicateEmail.id });
            return {
                status: 200,
                data: {
                    message: 'Successfully logged in',
                    token,
                    user: duplicateEmail
                }
            };
        } else {
            return {
                status: 401,
                data: {
                    message: 'Invalid credentials',
                }
            };
        }
    }

    if (userData.phoneNumber) {
        const duplicatePhone = await userInstance.findOne({ where: { phoneNumber: userData.phoneNumber } });

        if (duplicatePhone) {
            return {
                status: 409,
                data: {
                    message: 'Phone number is used, please change phone number',
                }
            };
        }
    }

    const passwordHash = await bcryptjs.hash(password, 10);
    const token = tokenServices.generateToken({ id });

    const record = await userInstance.create({
        id: id,
        token,
        password: passwordHash,
        role: userData.role || 'user',
        ...restData,
    });

    const link = `${process.env.BACKEND_URL}/user/verify/${token}`;

    return {
        status: 201,
        data: {
            message: 'Successfully registered an account on ByteSphere',
            record
        }
    };
}


async function getAllUser() {
    const users = await userInstance.findAll();
    return {
        status: 200,
        data: {
            message: 'Successfully retrieved all users',
            users,
        }
    };
}
module.exports = {
    registerUser,getAllUser
};
