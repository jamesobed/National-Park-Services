"use strict";
const { Model, DataTypes } = require("sequelize");
const db = require("../config/database.config");
const usersParkInstance = require("./usersPark");

class userInstance extends Model {
  toJSON() {
    const attributes = { ...this.get() };

    delete attributes.password;
    delete attributes.otp;
    delete attributes.otpExpires;
    delete attributes.street;
    delete attributes.state;
    delete attributes.otp;
    delete attributes.gender;
    delete attributes.contactAddress;
    delete attributes.firstName;
    delete attributes.lastName;
    delete attributes.learningMode;
    delete attributes.phoneNumber;
    delete attributes.isVerified;
    delete attributes.role;

    return attributes;
  }
}

userInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    //   validate: {
    //     notNull: {
    //       msg: 'full name is required',
    //     },
    //     notEmpty: {
    //       msg: 'Please provide full name',
    //     },
    //   },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    //   validate: {
    //     notNull: {
    //       msg: 'last name is required',
    //     },
    //     notEmpty: {
    //       msg: 'Please provide last name',
    //     },
    //   },
    },
    learningMode: {
      type: DataTypes.STRING,
      allowNull: true,
    //   validate: {
    //     notNull: {
    //       msg: 'learning mode is required',
    //     },
    //     notEmpty: {
    //       msg: 'Please provide learning mode',
    //     },
    //   },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    //   validate: {
    //     notNull: {
    //       msg: 'email is required',
    //     },
    //     isEmail: {
    //       msg: 'Please provide a valid email',
    //     },
    //   },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    //   validate: {
    //     notNull: {
    //       msg: 'password is required',
    //     },
    //     notEmpty: {
    //       msg: 'Please provide a password',
    //     },
    //   },
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7nG8OgXmMOXXiwbNOc-PPXUcilcIhCkS9BQ&usqp=CAU',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
    contactAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp: {
      type: DataTypes.NUMBER,
      defaultValue: null,
    },
    otpExpires: {
      type: DataTypes.NUMBER,
      defaultValue: null,
    },
  },
  {
    sequelize: db,
    tableName: 'Users',
  }
);

userInstance.hasMany(usersParkInstance, {
  foreignKey: 'userId',
  as: 'usersPark',
});

usersParkInstance.belongsTo(userInstance, {
  foreignKey: 'userId',
  as: 'user',
});


module.exports = userInstance;


