import { Router } from "express";
import { createMovements, deleteMovement, getAllMovements } from "../controllers/movements.controllers.js";
import { validateToken } from "../middlewares/validateAuth.js";
import { validateAdmin } from '../middlewares/validateAdmin.js'

export const movementsRoutes=Router()

movementsRoutes.post('/movements',validateToken,validateAdmin, createMovements)
movementsRoutes.delete('/movement/:id',validateToken,validateAdmin,deleteMovement)
movementsRoutes.get('/movements',getAllMovements)