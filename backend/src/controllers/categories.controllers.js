import { pool } from "../db.js"

export const getAllCategories = async (req, res) => {
    try {
        const result = await pool.query('select * from categories ORDER BY id ASC')
        res.json(result.rows)
    } catch (e) {
        console.log('error', e.message)
        return res.status(500).json({ error: 'error al obtener categorias' })
    }
}

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        if (!name) {
            return res.status(400).json({ message: 'Debe ingresar el nombre de la categoria' })
        }
        const existCategory = await pool.query('select * from categories where name=$1', [name.toLowerCase()])
        if (existCategory.rows.length > 0) {
            return res.status(409).json({ message: 'la categoria que intenta crear ya existe' })
        }
        const result = await pool.query('INSERT INTO categories(name,description)VALUES($1,$2) RETURNING *', [name.toLowerCase(), description])
        res.json(result.rows)
    } catch (e) {
        console.log('error', e.message)
        return res.status(500).json({ message: 'error al crear categoria' })
    }
}

export const updateCategory = async (req, res) => {
    const { name, description } = req.body
    try {
        const { id } = req.params
        const validCategory = await pool.query('SELECT * FROM categories where id=$1', [id])
        if (validCategory.rows.length === 0) {
            return res.status(401).json({ message:'Categoria no encontrada' })
        }
        if (!name && !description) {
            return res.status(409).json({ message:'debe ingresar alguno de los campos' })
        }
        if (name && description) {
            const result = await pool.query('UPDATE categories SET name=$1,description=$2 WHERE id=$3 RETURNING *', [name.toLowerCase(), description, id])
            return res.json({ message: 'Categoria Actualizado', result:result.rows })
        }
        if (!name && description) {
            const result = await pool.query('UPDATE categories SET description=$1 WHERE id=$2 RETURNING *', [description, id])
            return res.json({ message: 'Categoria Actualizado', result:result.rows })
        }
        if (!description && name) {
            const result = await pool.query('UPDATE categories SET name=$1 WHERE id=$2 RETURNING *', [name.toLowerCase(), id])
            return res.json({ message: 'Categoria Actualizado', result:result.rows })
        }
    } catch (e) {
        console.log('error', e.message)
        return res.status(500).json({ message: 'error al editar categorias' })
    }
}

export const deleteCategory=async(req,res)=>{
    const {id}=req.params
    const result=await pool.query('DELETE from categories WHERE id=$1',[id])
    res.json({message:'Categoria eliminada correctamente'})
}