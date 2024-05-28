import {Router} from 'express';
import {bancoController} from '../controller/banco.controller.js'



const router = Router();

router.post('/usuario',bancoController.crearUsuario);
router.get('/usuarios', bancoController.getUsuarios);
router.put('/usuario', bancoController.editarUsuario);
router.delete('/usuario', bancoController.deleteUsuario)
router.post('/transferencia', bancoController.transferir)
router.get('/transferencias',bancoController.getTransferencias);


export default router;