import { pool } from "../db.js"

export const createMovements = async (req, res) => {
    try {
        const { product_id, type, quantity,date } = req.body
        const user_id=req.user.id
        const lowerType = type.toLowerCase()
        if (lowerType !== 'entra' && lowerType !== 'sale') {
            return res.status(400).json({ message: 'tipo de accion no permitido' })
        }
        const getProduct = await pool.query('SELECT * FROM products where id=$1', [product_id])
        if (getProduct.rows.length === 0) {
            return res.status(401).json({ message: 'Producto no encontrado' })
        }

        const product = getProduct.rows[0]
        if (quantity > product.stock && lowerType === "sale") {
            return res.status(401).json({ message: `La cantidad de salida supera la del stock, la cantidad del producto es ${product.stock}` })
        }
        const result = await pool.query('INSERT INTO movements(product_id,type,quantity,date,user_id)VALUES($1,$2,$3,$4,$5) RETURNING *', [product_id, lowerType, quantity,date,user_id])
        const movement = result.rows[0]


        if (movement.type === 'entra') {
            const newStock = parseInt(movement.quantity) + parseInt(product.stock)
            const updateProduct = await pool.query('UPDATE products set stock=$1 WHERE id=$2 RETURNING *', [newStock, product.id])
            return res.json({ nuevo_stock: updateProduct.rows[0] })
        }
        if (movement.type === 'sale') {
            const newStock = parseInt(movement.quantity) - parseInt(product.stock)
            const updateProduct = await pool.query('UPDATE products set stock=$1 WHERE id=$2 RETURNING *', [newStock, product.id])
            return res.json({ nuevo_stock: updateProduct.rows[0] })
        }
    } catch (e) {
        console.log('error', e.message)
        return res.status(500).json({ message: 'Error al crear movimiento' })
    }

}

export const getAllMovements = async (req, res) => {
    try {
        const result = await pool.query('Select * from movements order by id ASC')
        res.json(result.rows)
    } catch (e) {
        console.log('error', e.message)
        return res.status(500).json({ message: 'Error al obtener movimientos' })
    }
}
export const deleteMovement = async (req, res) => {
    const { id } = req.params
    const getMovement = await pool.query('SELECT * FROM movements WHERE id=$1', [id])
    const movement = getMovement.rows[0]
    const getProduct = await pool.query('SELECT * FROM products WHERE id=$1', [movement.product_id])
    const product = getProduct.rows[0]
    if (movement.type === 'sale') {
        const newStock = parseInt(product.stock) + parseInt(movement.quantity)
        const updateProduct = await pool.query('UPDATE products set stock=$1 WHERE id=$2', [newStock, product.id])
        await pool.query('delete from movements where id=$1', [id])
        return res.json({ message: 'movimiento eliminado correctamente, se retorna al stock lo que salió' })
    }
    if (movement.type === 'entra') {
        const newStock = parseInt(product.stock) - parseInt(movement.quantity)
        const updateProduct = await pool.query('UPDATE products set stock=$1 WHERE id=$2', [newStock, product.id])
        await pool.query('delete from movements where id=$1', [id])
        return res.json({ message: 'movimiento eliminado correctamente, se retorna al stock lo que salió' })
    }
}