import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import { userRoute } from './routes/users.routes.js';
import { categoryRoutes } from './routes/categories.routes.js';
import { productsRouter } from './routes/products.routes.js';
import { movementsRoutes } from './routes/movements.routes.js';
dotenv.config();

const app=express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(userRoute)
app.use(categoryRoutes)
app.use(productsRouter)
app.use(movementsRoutes)



const server=process.env.PORT

app.listen(process.env.PORT,()=>{
    console.log(`server ${server} corriendo`)
})