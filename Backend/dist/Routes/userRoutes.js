"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("../Controllers/userController");
const verifyUser_1 = require("../Middleware/verifyUser");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.post('/register', userController_1.register),
    exports.userRoutes.post('/logIn', userController_1.logIn),
    exports.userRoutes.get('/getUsers/:page', verifyUser_1.verifyUser, userController_1.getUsers),
    exports.userRoutes.get('/getByEmail', verifyUser_1.verifyUser, userController_1.getUserByEmail),
    exports.userRoutes.get('/getById', verifyUser_1.verifyUser, userController_1.getUserById),
    exports.userRoutes.put('/deactivate', verifyUser_1.verifyUser, userController_1.deactivate),
    exports.userRoutes.put('/update', verifyUser_1.verifyUser, userController_1.updateUser),
    exports.userRoutes.get('/inactive', userController_1.getInactive);
