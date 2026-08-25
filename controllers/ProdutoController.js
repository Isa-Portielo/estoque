
import Produto from '../models/produto.js'
import Categoria from '../models/categoria.js'
import Fornecedor from '../models/fornecedor.js'

export default class ProdutoController{

    constructor(caminhoBase='produto/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
             const categorias = await Categoria.find({})
            const fornecedores = await Fornecedor.find({})

            res.render(caminhoBase + "add", {
                categorias: categorias,
                fornecedores: fornecedores
            })
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
           
            await Produto.create({
                nome: req.body.nome,
                detalhes: req.body.detalhes,
                quantidade: req.body.quantidade,
                preco: req.body.preco,
                categoria: req.body.categoria,
                fornecedor: req.body.fornecedor
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Produto.find({})
            res.render(caminhoBase + 'lst', {Produto:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Produto.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Produto:resultado})
        }

         this.openEdt = async(req, res)=>{
            const id = req.params.id
            console.log(id)
            const produto = await Produto.findById(id) 
            console.log(produto)
            res.render(caminhoBase + "edt", 
                {Produto:produto})
        }


        this.edt = async(req, res)=>{
        await Produto.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        }
        
         this.del = async(req, res)=>{
        await Produto.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}