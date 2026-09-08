import express from 'express';
import cors from 'cors';
import { alunoRoutes } from './routes/aluno.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/alunos', alunoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
