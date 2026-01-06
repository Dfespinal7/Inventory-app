import { pool } from "../db.js"
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
dotenv.config()
export const getAllusers = async (req, res) => {
    try {
        const result = await pool.query('SELECT id,name, email, role,isactivate,numberphone  FROM users ORDER BY id ASC')
        const user = result.rows
        res.json(user)
    } catch (e) {
        console.log('error', e.message)
        return res.status(500).json({ message: 'error al obtener los usuarios' })
    }
}

export const register = async (req, res) => {
    try {
        const { name, email, password, role, isactivate, numberphone } = req.body
        if (!email || !password || !name || !role) {
            return res.status(401).json({ message: 'Todos los campos son obligatorios' })
        }
        const exist = await pool.query('select * from users where email=$1', [email])
        if (exist.rows.length > 0) {
            return res.status(400).json({ message: "El usuario que intenta registrar, ya existe" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "La contraseña debe ser mayor a 8 caracteres" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const result = await pool.query('INSERT INTO users(name,email,password,role,isactivate,numberphone)VALUES($1,$2,$3,$4,$5,$6) RETURNING *', [name, email, hashPassword, role, isactivate, numberphone])
        const user = result.rows[0]
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
        res.cookie('token', token)

        res.json({ message: 'user registrado correctamente', user })
    }
    catch (e) {
        console.error('Error en register:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
export const createUserByAdmin = async (req, res) => {
    try {
        const { name, email, password, role, isactivate, numberphone } = req.body
        if (!email || !password || !name || !role) {
            return res.status(401).json({ message: 'Todos los campos son obligatorios' })
        }
        const exist = await pool.query('select * from users where email=$1', [email])
        if (exist.rows.length > 0) {
            return res.status(400).json({ message: "El usuario que intenta registrar, ya existe" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "La contraseña debe ser mayor a 8 caracteres" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const result = await pool.query('INSERT INTO users(name,email,password,role,isactivate,numberphone)VALUES($1,$2,$3,$4,$5,$6) RETURNING *', [name, email, hashPassword, role, isactivate, numberphone])
        const user = result.rows[0]

        res.json({ message: 'user registrado correctamente', user })
    }
    catch (e) {
        console.error('Error en register:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
export const logout = (req, res) => {
    res.clearCookie('token')
    res.json({ message: "sesión cerrada correctamente" })
}

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'Debe ingresar todos los campos del formulario' })
    }
    const validEmail = await pool.query('SELECT * FROM users where email=$1', [email])
    if (validEmail.rows.length === 0) {
        return res.status(404).json({ message: 'El correo no se encuentra registrado' })
    }
    const user = validEmail.rows[0]
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.status(400).json({ message: 'Contraseña incorrecta' })
    }
    console.log(user.isactivate)
    if (!user.isactivate) {
        return res.status(500).json({ message: 'Usuario desahibilitado temporalmente, comuniquese con el administrador' })
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
    res.cookie('token', token)
    const userLog = {
        name: user.name,
        email: user.email,
        role: user.role
    }
    res.json({ message: 'Bienvenido!!', userLog })
}
export const index = (req, res) => {
    res.json({ message: 'index' })
}

export const profile = async (req, res) => {
    const { id } = req.user
    const result = await pool.query('SELECT * FROM users where id=$1', [id])
    const user = result.rows[0]
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role })
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('Delete from users where id=$1', [id])
        res.json({ message: 'Usuario eliminado correctamente' })
    } catch (e) {
        res.status(500).json({ message: 'Error al eliminar usuario' })
        console.log(e.message)
    }
}
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, role, isactivate, numberphone } = req.body
        const existEmail = await pool.query('select * from users where email=$1', [email])//buscamos en base de datos si el email existe en la bd
        const existId = await pool.query('select * from users where id=$1', [id])//buscamos en la base de datos el usuario por id
        const emailId = existId.rows[0]//guardamos en constante el objeto del usuario buscado por id
        const emailBody = existEmail.rows[0]//guardamos en constante objeto buscado por email, si no se encontro guarda undefined
        if (emailBody  && emailId.id !== emailBody.id) {//valida que se cumplan las dos condiciones si email existe y si los correos, son diferentes
            return res.status(400).json({ message: "El correo que desea añadir a este usuario ya pertenece a otro usuario" })
        }

        const result = await pool.query('UPDATE users SET name=$1,email=$2,role=$3,isactivate=$4,numberphone=$5 where id=$6 RETURNING *', [name, email, role, isactivate, numberphone, id])
        res.json({ message: 'usuario actualizado correctamente', user: result.rows[0] })
    } catch (e) {
        res.status(500).json({ message: 'Error al actualizar usuario' })
        console.log(e.message)
    }
}