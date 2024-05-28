import { pool } from '../connection/connection.js';

const crear = async (usuario) => {
    const query = {
        text: `INSERT INTO usuarios (nombre, balance) VALUES ($1 , $2) RETURNING *;`,
        values: [usuario.nombre, usuario.balance]
    }
    const { rows } = await pool.query(query);
    return rows[0]
}

const leerUsuarios = async () => {
    const querySql = "SELECT * FROM usuarios";
    const { rows } = await pool.query(querySql);
    return rows
}

const updateUsuario = async (usuarioUpdated) => {

    const query = {
        text: `UPDATE usuarios
        SET nombre = $1, balance = $2
        WHERE id = $3
         RETURNING *;`,
        values: [usuarioUpdated.nombreNuevo, usuarioUpdated.montoNuevo, usuarioUpdated.id]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const eliminarUsuario = async (id) => {

    const query = {
        text: `DELETE FROM usuarios WHERE id = $1 RETURNING *;`,
        values: [id]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}




const transferirSaldo = async (emisorId, receptorId, monto) => {
    try {
        await pool.query('BEGIN');
        
        const queryEmisor = {
            text: `UPDATE usuarios SET balance = balance - $1 WHERE id = $2;`,
            values: [monto, parseInt(emisorId) ]
        };
        await pool.query(queryEmisor);
        
        const queryReceptor = {
            text: `UPDATE usuarios SET balance = balance + $1 WHERE id = $2;`,
            values: [monto, parseInt(receptorId)]
        };
        await pool.query(queryReceptor);
        
        
        const queryTransferencia = {
            text: `INSERT INTO transferencias (emisor, receptor, monto)
            VALUES ($1, $2, $3)
            RETURNING *`,
            values: [parseInt(emisorId), parseInt(receptorId), monto]
        };
        const {rows} = await pool.query(queryTransferencia);
        
        await pool.query('COMMIT');
        
        return rows[0]
        
    } catch (error) {
        await pool.query('ROLLBACK');
        console.log('Error al realizar la transferencia:', error);
        return false;
    }
}
const leerTransferencias = async () => {
    const querySql = `SELECT 
            t.id AS id_transferencia,
            t.monto,
            t.fecha,
            u_emisor.nombre AS nombre_emisor,
            u_receptor.nombre AS nombre_receptor
        FROM 
            transferencias t
        JOIN 
            usuarios u_emisor ON t.emisor = u_emisor.id
        JOIN 
            usuarios u_receptor ON t.receptor = u_receptor.id;`
    const { rows } = await pool.query(querySql);
    return rows
}

export const model = {
    crear,
    leerTransferencias,
    leerUsuarios,
    eliminarUsuario,
    transferirSaldo,
    updateUsuario
}