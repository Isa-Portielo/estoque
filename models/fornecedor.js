import conexao from '../config/conexao.js'

const Fornecedor = conexao.Schema({
    nome: {type:String, required:true},
    cpf:{type:String, required:true},
    email: {type:String, required:true},
    celular:{type:String, required:true},
   
 
})

export default conexao.model('Fornecedor',Fornecedor)