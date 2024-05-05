import {Router} from 'express';
import {bancoController} from '../controller/banco.controller.js'



const router = Router();

router.post('/',bancoController.crearUsuario);
router.get('/transferencias',bancoController.getTransferencias);
router.get('/usuarios', bancoController.getUsuarios);

export default router;