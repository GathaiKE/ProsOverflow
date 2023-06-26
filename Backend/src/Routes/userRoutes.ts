import { Router } from "express";
import { deactivate, getInactive, getUserByEmail, getUserById, getUsers, logIn, register, updateUser } from "../Controllers/userController";
import { verifyUser } from "../Middleware/verifyUser";

export const userRoutes=Router()

userRoutes.post('/register', register),
userRoutes.post('/logIn',logIn),
userRoutes.get('/getUsers/:page',verifyUser,getUsers),
userRoutes.get('/getByEmail',verifyUser,getUserByEmail),
userRoutes.get('/getById',verifyUser,getUserById),
userRoutes.put('/deactivate',verifyUser,deactivate),
userRoutes.put('/update',verifyUser,updateUser),
userRoutes.get('/inactive',getInactive)