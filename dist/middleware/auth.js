'use strict';

const jwt = require('jsonwebtoken');
const userInstance  = require('../model/userModel');

const secret = process.env.JWT_SECRET;

async function auth(req, res, next) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({
                Error: 'Kindly sign in as a user',
            });
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                Error: 'Token not provided',
            });
        }

        let verified = jwt.verify(token, secret);


        if (!verified) {
            return res.status(401).json({
                Error: 'User not verified, you can\'t access this route',
            });
        }

        const { id } = verified;
        const user = await userInstance.findOne({ where: { id:id.id } });

        if (!user) {
            return res.status(404).json({
                Error: 'User not found',
            });
        }

        if (user.role !== 'user') {
            return res.status(403).json({
                Error: 'You are not authorized to access this route',
            });
        }

        req.user = user.dataValues;
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({
            Error: 'User not authenticated',
        });
    }
}

module.exports = auth
