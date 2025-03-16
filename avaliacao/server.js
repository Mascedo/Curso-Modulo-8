const express = require('express');
const estudantesRoutes = require('./routes/estudantesRoutes');
const livrosRoutes = require('./routes/livrosRoutes');
const alugueisRoutes = require('./routes/alugueisRoutes')

const app = express();
const port = 3000;

app.use(express.json());
app.use('/estudantes', estudantesRoutes);
app.use('/livros', livrosRoutes);
app.use('/alugueis', alugueisRoutes)

app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));