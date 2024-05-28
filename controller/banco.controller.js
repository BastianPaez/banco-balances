import { model } from "../models/banco.models.js";
import { handleErrorPostgre } from "../connection/errors.database.js"


const crearUsuario = async (req, res) => {
    try {
        const { nombre, balance } = req.body;
        const usuario = await model.crear({ nombre, balance })
        return res.json({ usuario })
    } catch (error) {
        const { code, msg } = handleErrorPostgre(error);
        return res.status(code).json({ ok: false, msg })
    }
}

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await model.leerUsuarios()
        return res.json({ usuarios })
    } catch (error) {
        const { code, msg } = handleErrorPostgre(error);
        return res.status(code).json({ ok: false, msg })
    }

}

const editarUsuario = async (req, res) => {
    try {
        const { id, nombreNuevo, montoNuevo} = req.body

        const update = await model.updateUsuario({id, nombreNuevo, montoNuevo})
    
        return res.json( { ok: true, update})
    } catch (error) {
        console.log(error)
    }

}

const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.body;
        const usuario = await model.eliminarUsuario(id)
        return res.json({ ok: true, usuario })
    } catch (error) {
        const { code, msg } = handleErrorPostgre(error);
        return res.status(code).json({ ok: false, msg })
    }
}

const getTransferencias = async (req, res) => {
    try {
        const transferencias = await model.leerTransferencias()
        return res.json({ transferencias })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false })
    }
}


const transferir = async (req, res) => {
    try {
        const { emisor, receptor, monto } = req.body;
        const transferencia = await model.transferirSaldo(emisor, receptor, monto)
        return res.json({ ok: true, transferencia })
    } catch (error) {
        const { code, msg } = handleErrorPostgre(error);
        return res.status(code).json({ ok: false, msg })
    }
}


export const bancoController = {
    crearUsuario,
    getTransferencias,
    getUsuarios,
    transferir,
    deleteUsuario,
    editarUsuario
}