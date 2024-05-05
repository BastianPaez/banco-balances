import { pool } from '../connection/connection.js';

const crear = async (usuario) => {
    const querySql = "INSERT INTO usuarios (nombre, saldo) VALUES ($1 , $2) RETURNING *;";
    const { rows } = await pool.query(querySql, [usuario.nombre, usuario.saldo]);
    return rows
}

const leerTransferencias = async () => {
    const querySql = "SELECT TO_CHAR(fecha_transferencia, 'DD/MM/YYYY HH24:MI') AS fecha_formateada,nombre_usuario_origen,nombre_usuario_destino,monto_transferido FROM transferencias; "
    const { rows } = await pool.query(querySql);
    return rows
}

const leerUsuarios = async () => {
    const querySql = "SELECT nombre, saldo FROM usuarios";
    const { rows } = await pool.query(querySql);
    return rows
}


const transferirSaldo = async (nombreOrigen, nombreDestino, monto) => {
    try {
        await pool.query('BEGIN');

        const queryUdateOrigen = 'UPDATE usuarios SET saldo = saldo - $1 WHERE nombre = $2';
        await pool.query(queryUdateOrigen, [monto, nombreOrigen]);

        const queryUpdateDestino = 'UPDATE usuarios SET saldo = saldo + $1 WHERE nombre = $2';
        await pool.query(queryUpdateDestino, [monto, nombreDestino]);

        const queryInsertTransferencia = 'INSERT INTO transferencias (nombre_usuario_origen, nombre_usuario_destino, monto_transferido)VALUES ($1, $2, $3)';

        await pool.query(queryInsertTransferencia, [nombreOrigen, nombreDestino, monto]);

        await pool.query('COMMIT');

        return true
        
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error al realizar la transferencia:', error);
        return false;
    }


}

export const model = {
    crear,
    leerTransferencias,
    leerUsuarios,
    transferirSaldo
}