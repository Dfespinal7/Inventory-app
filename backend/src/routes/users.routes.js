import { Router } from "express";
import { getAllusers, index, login, logout, profile, register } from "../controllers/users.controllers.js";
import { validateToken } from "../middlewares/validateAuth.js";
import { validateAdmin } from "../middlewares/validateAdmin.js";

export const userRoute=Router()

userRoute.get('/users',getAllusers)
userRoute.post('/register',register)
userRoute.post('/logout',logout)
userRoute.post('/login',login)
userRoute.get('/',validateToken,validateAdmin,index)
userRoute.get('/profile',validateToken,profile)