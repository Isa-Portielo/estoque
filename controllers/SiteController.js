import Produto from '../models/produto.js'
import Categoria from '../models/categoria.js'
import Fornecedor from '../models/fornecedor.js'
import Registro from '../models/registro.js'

 export default class SiteController {
 
    constructor(caminhoBase='site/'){

        this.home = async (req, res) => {
          const produtos = await Produto.find({}).populate('categoria');
          const registros = await Registro.find({})
          let totalEstoque = 0;
          let estoqueBaixo = 0;
          const produtosEstoqueBaixo = [];
          for (let i = 0; i < produtos.length; i++) {
            totalEstoque += produtos[i].quantidade;
            if (produtos[i].quantidade < 50) {
              estoqueBaixo++;
              produtosEstoqueBaixo.push(produtos[i]);
            }
          }
          res.render(caminhoBase + 'index', { produtos, registros, totalEstoque, estoqueBaixo, produtosEstoqueBaixo });
        };

        this.configuracoes = async (req, res) => {
          res.render(caminhoBase +"configuracoes")
        };

        this.produtos = async (req, res) => {
          const resultado = await Produto.find({})
                      .populate('categoria')
                      .populate('fornecedor')
          const categorias = await Categoria.find({})
              console.log(resultado)
          res.render(caminhoBase + "produtos", { produtos: resultado, categorias: categorias })
        };


        this.registros = async (req, res) => {
          const produtos = await Produto.find({});
          const registros = await Registro.find({})
            .populate('produto')

          res.render(caminhoBase + "registros", { produtos, registros, produtoSelecionado: req.query.produto || '' });
        };

        this.registrosAdd = async (req, res) => {
          const produto = await Produto.findById(req.body.produto);
          const quantidade = Number(req.body.quantidade);

          if (req.body.tipo === 'Entrada') {
            produto.quantidade += quantidade;
          } else {
            produto.quantidade -= quantidade;
          }

          await produto.save();
          await Registro.create({
            produto,
            tipo: req.body.tipo,
            quantidade,
            data: req.body.data,
            hora: req.body.hora
          });

          res.redirect('/' + caminhoBase + "registros");
        };
    }
 }