const express = require('express');
const livrosRoutes = require('./routes/livrosRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/livros', livrosRoutes);

app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
