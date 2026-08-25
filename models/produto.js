import conexao from '../config/conexao.js'

const Produto = conexao.Schema({
    nome: {type:String, required:true},
    detalhes:{type:String, required:true},
    quantidade:{type:Number, required:true},
    preco:{type:Number, required:true},
    categoria: {type: conexao.Types.ObjectId, ref: "Categoria"},
    fornecedor: {type: conexao.Types.ObjectId, ref: "Fornecedor"}
})

export default conexao.model('Produto',Produto)