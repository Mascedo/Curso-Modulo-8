const express = require('express');
const medicosRoutes = require('./routes/medicosRoutes');
const pacientesRoutes = require('./routes/pacientesRoutes');
const consultasRoutes = require('./routes/consultasRoutes');
const relatoriosRoutes = require('./routes/relatoriosRoutes')

const app = express();
const port = 3000;

app.use(express.json());
app.use('/pacientes', pacientesRoutes);
app.use('/medicos', medicosRoutes);
app.use('/consultas', consultasRoutes);
app.use('/relatorios', relatoriosRoutes)

app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
