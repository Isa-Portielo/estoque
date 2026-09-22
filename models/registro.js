import conexao from '../config/conexao.js'

const Registro = conexao.Schema({
    produto: {type: conexao.Types.ObjectId, ref: "Produto"},
    tipo:{type:String, required:true},
    quantidade: {type:Number, required:true},
    data:{type:Date, required:true},
})

export default conexao.model('Registro',Registro)