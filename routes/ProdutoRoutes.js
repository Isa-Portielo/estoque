import express from 'express';
const router = express.Router();

import ProdutoController from '../controllers/ProdutoController.js'
const controle = new ProdutoController();

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const caminhobase = 'produto/'

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', upload.single('foto'), controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)
router.get('/' + caminhobase + 'del/:id', controle.del)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', upload.single('foto'), controle.edt)
export default router