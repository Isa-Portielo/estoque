
import Fornecedor from '../models/fornecedor.js'

export default class FornecedorController{

    constructor(caminhoBase='fornecedor/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
           
            await Fornecedor.create({
                nome: req.body.nome,
                cpf: req.body.cpf,
                email: req.body.email,
                celular: req.body.celular
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Fornecedor.find({})
            res.render(caminhoBase + 'lst', {Fornecedor:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Fornecedor.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Fornecedor:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            const id = req.params.id
            console.log(id)
            const fornecedor = await Fornecedor.findById(id) 
            console.log(fornecedor)
            res.render(caminhoBase + "edt", 
                {Fornecedor:fornecedor})
        }


        this.edt = async(req, res)=>{
        await Fornecedor.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        }
        
         this.del = async(req, res)=>{
        await Fornecedor.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}