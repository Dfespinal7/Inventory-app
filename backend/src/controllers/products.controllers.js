import { pool } from "../db.js"

export const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id ASC')
        res.json(result.rows)
    } catch (e) {
        console.log('error', e.message)
        return res.status(500).json({ message: 'error al obtener los productos' })
    }
}

export const getAproduct=async(req,res)=>{
    const{id}=req.params
    const result=await pool.query('Select * from products where id=$1',[id])
    res.json(result.rows[0])
}   

export const createProduct = async (req, res) => {
    try {
        const { name, description, category_id, stock, unit_price } = req.body
        const validExist=await pool.query('SELECT * FROM products WHERE name=$1',[name.toLowerCase()])
        if(validExist.rows.length>0){
            return res.status(400).json({message:'El producto que intenta crear  ya existe'})
        }
        const result = await pool.query('INSERT INTO products(name,description,category_id,stock,unit_price)VALUES($1,$2,$3,$4,$5) RETURNING *', [name.toLowerCase(), description, category_id, stock, unit_price])
        const producto=result.rows[0]
        res.json({message:'Producto registrado exitosamente',producto})
    } catch (e) {
        console.log('error', e.message)
        return res.status(500).json({ message: 'error al crear producto' })
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { name, description, category_id, stock, unit_price } = req.body
        const { id } = req.params
        const result = await pool.query('UPDATE products set name=$1, description=$2,category_id=$3,stock=$4,unit_price=$5 WHERE id=$6 RETURNING *', [name, description, category_id, stock, unit_price, id])
        res.json({ message: 'Producto actualizado', producto: result.rows[0] })
    } catch (e) {
        console.log('error', e.message)
        return res.status(500).json({ message: 'error al actualizar productos' })
    }

}

export const deleteProduct=async(req,res)=>{
    try{
        const {id}=req.params
        const result=await pool.query('DELETE FROM products WHERE id=$1',[id])
        res.json({message:'Producto Eliminado correctamente'})
    }catch(e){
        console.log('error',e.message)
        return res.status(500).json({message:'Error al Eliminar este producto'})
    }
}