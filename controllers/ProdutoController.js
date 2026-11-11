
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
        }
        this.add = async(req, res)=>{
           let fotoEnviada
           if(req.file!=null){
            console.log(" foi")
            fotoEnviada = req.file.buffer
           }
           else{
            console.log("nao foi")
            fotoEnviada = null
           }
            let pcategoria = null;
            if(req.body.categoria != null) {
            pcategoria= await Categoria.findById(req.body.categoria)
            }
            
            let pfornecedor = null;
            if(req.body.fornecedor != null) {
            pfornecedor= await Fornecedor.findById(req.body.fornecedor)
            }
 
            await Produto.create({
                nome: req.body.nome,
                detalhes: req.body.detalhes,
                quantidade: 0,
                preco: req.body.preco,
                foto:fotoEnviada,
                categoria: pcategoria,
                fornecedor: pfornecedor
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Produto.find({})
            .populate('categoria')
            .populate('fornecedor')
            
            console.log(resultado)
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

            const resultado = await Produto.findById(id)
            const pcategoria = await Categoria.find({});
            const pfornecedor = await Fornecedor.find({});

            res.render(caminhoBase + 'edt',{Produto:resultado,Categoria:pcategoria,Fornecedor:pfornecedor})
        }

        this.edt = async(req, res)=>{
            let fotoEnviada
           if(req.file!=null){
            console.log(" foi")
            fotoEnviada = req.file.buffer
           }
           else{
            console.log("nao foi")
            fotoEnviada = req.body.foto
           } 
            let pcategoria = null;
            if(req.body.categoria != null) {
            pcategoria= await Categoria.findById(req.body.categoria)
            }
            
            let pfornecedor = null;
            if(req.body.fornecedor != null) {
            pfornecedor= await Fornecedor.findById(req.body.fornecedor)
            }
            await Produto.findByIdAndUpdate(req.params.id,{
                nome: req.body.nome,
                detalhes: req.body.detalhes,
                quantidade: req.body.quantidade,
                preco: req.body.preco,
                foto:fotoEnviada,
                categoria: pcategoria,
                fornecedor: pfornecedor
            });

        res.redirect('/'+caminhoBase + 'lst');
        }
        
         this.del = async(req, res)=>{
        await Produto.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}