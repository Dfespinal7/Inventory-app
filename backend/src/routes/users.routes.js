import { Router } from "express";
import { createUserByAdmin, deleteUser, getAllusers, index, login, logout, profile, register, updateUser } from "../controllers/users.controllers.js";
import { validateToken } from "../middlewares/validateAuth.js";
import { validateAdmin } from "../middlewares/validateAdmin.js";

export const userRoute=Router()

userRoute.get('/users',getAllusers)
userRoute.post('/register',register)
userRoute.post('/logout',logout)
userRoute.post('/login',login)
userRoute.get('/',validateToken,validateAdmin,index)
userRoute.get('/profile',validateToken,profile)
userRoute.delete('/user/:id',validateToken,validateAdmin,deleteUser)
userRoute.put('/user/:id',validateToken,validateAdmin,updateUser)
userRoute.post('/admin/register',validateToken,validateAdmin,createUserByAdmin)