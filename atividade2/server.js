const express = require('express');
const estudantesRoutes = require('./routes/estudantesRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/estudantes', estudantesRoutes);

app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
