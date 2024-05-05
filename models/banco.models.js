import { pool } from '../connection/connection.js';

const crear = async (usuario) => {
    const querySql = "INSERT INTO usuarios (nombre, saldo) VALUES ($1 , $2) RETURNING *;"
    const { rows } = await pool.query(querySql, [usuario.nombre, usuario.saldo])
    return rows
}

const leerTransferencias = async () => {
    const querySql = "SELECT TO_CHAR(fecha_transferencia, 'DD/MM/YYYY HH24:MI') AS fecha_formateada,nombre_usuario_origen,nombre_usuario_destino,monto_transferido FROM transferencias; "
    const { rows } = await pool.query(querySql)
    return rows
}

export const crud = {
    crear,
    leerTransferencias
}