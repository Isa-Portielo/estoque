import Registro from '../models/registro.js'
import Produto from '../models/produto.js'

export default class RegistroController{

    constructor(caminhoBase='registro/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            const produtos = await Produto.find({})

            res.render(caminhoBase + "add", {
            produtos: produtos
             })
        }
        this.add = async(req, res)=>{
            const produto = await Produto.findById(req.body.produto)
            const quantidade = Number(req.body.quantidade)

            if (req.body.tipo === 'Entrada') {
                produto.quantidade += quantidade
            } else {
                produto.quantidade -= quantidade
            }

            await produto.save()
            await Registro.create({
                produto,
                tipo: req.body.tipo,
                quantidade,
                data: req.body.data,
                hora: req.body.hora
            })

            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Registro.find({}).populate('produto')
            res.render(caminhoBase + 'lst', {Registro:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Registro.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Registro:resultado})
        }

         this.openEdt = async(req, res)=>{
            const id = req.params.id
            
            const registro = await Registro.findById(id) 
            const rproduto = await Produto.find({});
            res.render(caminhoBase + "edt", {Registro:registro,Produto:rproduto})
        }


        this.edt = async(req, res)=>{
            let rproduto = null;
            if(req.body.produto != null) {
                rproduto = await Produto.findById(req.body.produto)
            }
            await Registro.findByIdAndUpdate(req.params.id, {
                produto: rproduto,
                tipo: req.body.tipo,
                quantidade: req.body.quantidade,
                data: req.body.data,
                hora: req.body.hora
            })
            res.redirect('/'+caminhoBase + 'lst');
        }
        
         this.del = async(req, res)=>{
            await Registro.findByIdAndDelete(req.params.id)
            res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}
