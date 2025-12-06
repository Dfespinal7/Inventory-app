import {Router} from 'express'
import { createProduct, deleteProduct, getAllProducts, getAproduct, updateProduct } from '../controllers/products.controllers.js'
import { validateToken } from '../middlewares/validateAuth.js'
import { validateAdmin } from '../middlewares/validateAdmin.js'

export const productsRouter=Router()

productsRouter.get('/products',getAllProducts)
productsRouter.post('/products',validateToken,validateAdmin,createProduct)
productsRouter.put('/product/:id',validateToken,validateAdmin,updateProduct)
productsRouter.delete('/product/:id',validateToken,validateAdmin,deleteProduct)
productsRouter.get('/product/:id',getAproduct)