import { crud } from "../models/banco.models.js";


const crearUsuario = async (req, res) => {
    try {
        const {nombre, saldo} = req.body;
        const usuario = {nombre, saldo}
        await crud.crear(usuario)
        return {usuario}
    } catch (error){
        console.log(error);
        return res.status(500).json({ ok : false})
    }
}

const getTransferencias = async ( req, res) => {
    try {
        const transferencias = await crud.leerTransferencias()
        return res.json({transferencias})
    } catch (error){
        console.log(error);
        return res.status(500).json({ ok : false})
    }
}

const getUsuarios = async ( req, res) => {
    try {
        const usuarios = await crud.leerUsuarios()
        return res.json({usuarios})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok : false})
    }

}

export const bancoController = {
    crearUsuario,
    getTransferencias,
    getUsuarios
}