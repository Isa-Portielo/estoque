import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/route.js';
import categoriaRoutes from './routes/CategoriaRoutes.js';
import fornecedorRoutes from './routes/FornecedorRoutes.js';
import produtoRoutes from './routes/ProdutoRoutes.js';
import registroRoutes from './routes/RegistroRoutes.js';

const PORT = 3000
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, '/public')));
app.set('views', join(__dirname, '/views'));

// Rotas
app.use(categoriaRoutes)
app.use(fornecedorRoutes)
app.use(produtoRoutes)
app.use(registroRoutes)
app.use(routes)
app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
export default app;