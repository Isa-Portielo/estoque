//importar o Model
import Registro from '../models/registro.js'
import Produto from '../models/produto.js'

export default class RegistroController{

    constructor(caminhoBase='Registro/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            const produtos = await Produto.find({})

            res.render(caminhoBase + "add", {
            produtos: produtos
             })
        }
        this.add = async(req, res)=>{
           
            await Registro.create({
                produto: req.body.produto,
                tipo: req.body.tipo,
                quantidade: req.body.quantidade,
                data: req.body.data
            });
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
            console.log(id)
            const registro = await Registro.findById(id) 
            console.log(registro)
            res.render(caminhoBase + "edt", 
                {Registro:registro})
        }


        this.edt = async(req, res)=>{
        await Registro.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        }
        
         this.del = async(req, res)=>{
        await Registro.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}