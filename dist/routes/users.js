"use strict";
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const userParkCOntroller_1 = require("../controller/userpark.controller");
const auth_1 = require("../middleware/auth");

const router = express_1.Router();

// Routes
router.post('/signup-signin', userController_1.registerUser);
router.get('/all-users',auth_1, userController_1.getAllUser);

router.post('/save-park',auth_1, userParkCOntroller_1.registerUserPark);
router.get('/all-saved-parks',auth_1, userParkCOntroller_1.getAllUserParks);
router.get('/park/:id',auth_1, userParkCOntroller_1.getUserParkById);
router.patch('/update-park/:id',auth_1, userParkCOntroller_1.updateUserPark);
router.delete('/remove-park/:id',auth_1, userParkCOntroller_1.deleteUserPark);


module.exports = router;
