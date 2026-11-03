 export default class SiteController {
 
    constructor(caminhoBase='site/'){

      this.caminhoBase = caminhoBase;

        this.home = async (req, res) => {
          res.render(caminhoBase+'index')
        };
        this.configuracoes = async (req, res) => {
          res.render(caminhoBase +"configuracoes")
        };
        this.produtos = async (req, res) => {
          res.render(caminhoBase +"produtos")
        };
        this.registros = async (req, res) => {
          res.render(caminhoBase +"registros")
        };

    }
 }