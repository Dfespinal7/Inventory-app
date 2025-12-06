import { pool } from "../db.js"

export const validateAdmin=async(req,res,next)=>{
    const userId=req.user.id
    const getAUser=await pool.query('SELECT * FROM users where id=$1',[userId])
    const role=getAUser.rows[0].role.toLowerCase()
    if(role!=='admin'){
        return res.status(404).json({message:'Solo los admin pueden ejecutar esta accion'})
    }
    next()
}