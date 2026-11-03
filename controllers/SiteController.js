 export default class SiteController {
 
    constructor(caminhoBase='site/'){

        this.home = async (req, res) => {
          res.render(caminhoBase + 'index')
        };
        this.configuracoes = (req, res) => {
          res.render(caminhoBase +"configuracoes")
        };
        this.produtos = (req, res) => {
          res.render(caminhoBase + "produtos")
        };
        this.registros = (req, res) => {
          res.render(caminhoBase + "registros")
        };

    }
 }