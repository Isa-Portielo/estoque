import conexao from '../config/conexao.js'

const Produto = conexao.Schema({
    nome: {type:String, required:true},
    detalhes:{type:String, required:true},
    quantidade:{type:Number, required:true},
    preco:{type:Number, required:true},
    foto:{type:Buffer,
        get: (valor) => {
           if (!valor) return null;
             return `data:image/jpeg;base64,${valor.toString('base64')}`;
         }
    },
    categoria: {type: conexao.Types.ObjectId, ref: "Categoria", required: false},
    fornecedor: {type: conexao.Types.ObjectId, ref: "Fornecedor", required: false}
})

export default conexao.model('Produto',Produto)