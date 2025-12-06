import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const validateToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'Token not found' })
    }
    try {
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verifyToken
        next()
    } catch (e) {
        console.log('error en el middleware token',e.message)
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
}