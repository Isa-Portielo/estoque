import express from 'express';
const router = express.Router();
import SiteController from '../controllers/SiteController.js'
const controle = new SiteController();

const caminhobase = 'site/'

router.get('/' + caminhobase, controle.home)
router.get('/' + caminhobase + 'configuracoes', controle.configuracoes)
router.get('/' + caminhobase + 'produtos', controle.produtos)
router.get('/' + caminhobase + 'registros', controle.registros)
router.post('/' + caminhobase + 'registros', controle.registrosAdd)

export default router