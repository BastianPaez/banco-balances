import {Router} from 'express';
import {bancoController} from '../controller/banco.controller.js'



const router = Router();

router.post('/',bancoController.crearUsuario)

export default router;