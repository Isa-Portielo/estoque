import conexao from '../config/conexao.js'

const Registro = conexao.Schema({
    produto: {type: conexao.Types.ObjectId, ref: "Produto"},
    tipo:{type:String, required:true},
    quantidade: {type:Number, required:true},
    data:{type:String, required:true},
    hora:{type:String, required:true}
})

export default conexao.model('Registro',Registro)