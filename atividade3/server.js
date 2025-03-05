const express = require('express');
const filmesRoutes = require('./routes/filmesRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/filmes', filmesRoutes);

app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
