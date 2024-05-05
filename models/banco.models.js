import { pool } from '../connection/connection.js';

const crear = async (usuario) => {
    const querySql = "INSERT INTO usuarios (nombre, saldo) VALUES ($1 , $2) RETURNING *;"
    const { rows } = await pool.query(querySql, [usuario.nombre, usuario.saldo])
    return rows
} 

export const crud = {
    crear
}