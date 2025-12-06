import {Router} from 'express'
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../controllers/categories.controllers.js'
import { validateToken } from '../middlewares/validateAuth.js'
import { validateAdmin } from '../middlewares/validateAdmin.js'

export const categoryRoutes=Router()

categoryRoutes.get('/categories',getAllCategories)
categoryRoutes.post('/categorie',validateToken,validateAdmin, createCategory)
categoryRoutes.put('/categorie/:id',validateToken,validateAdmin, updateCategory)
categoryRoutes.delete('/categorie/:id',validateToken,validateAdmin,deleteCategory)