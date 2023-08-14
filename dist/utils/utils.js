"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");

const sendEmail = Joi.object().keys({
    from: Joi.string(),
    to: Joi.string(),
    subject: Joi.string().required(),
    text: Joi.string(),
    html: Joi.string().required(),
});
const suserSveParkSchema = Joi.object().keys({
    userId: Joi.string(),
    parkId: Joi.string(),
    parkName: Joi.string().required(),
    parkName: Joi.string().required(),
    parkLocation: Joi.string().required(),
    
});

const signUpSchema = Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().trim().lowercase().required(),
    phoneNumber: Joi.string(),
    avatar: Joi.string(),
    role: Joi.string(),
    learningMode: Joi.string(),
    contactAddress: Joi.string(),
    street: Joi.string(),
    state: Joi.string(),
    gender: Joi.string(),
    isVerified: Joi.boolean(),
    password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        ,
    confirmPassword: Joi.any()
        .equal(Joi.ref('password'))
        
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' }),
}).with('password', 'confirmPassword');

module.exports = {
    sendEmail,
    signUpSchema,suserSveParkSchema
};
