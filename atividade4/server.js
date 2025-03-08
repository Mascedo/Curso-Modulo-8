const express = require('express');
const produtosRoutes = require('./routes/produtosRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/produtos', produtosRoutes);

app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
