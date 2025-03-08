const express = require('express');
const funcionariosRoutes = require('./routes/funcionariosRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/funcionarios', funcionariosRoutes);

app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
