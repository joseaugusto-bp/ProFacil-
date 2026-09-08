import { Router } from 'express';
import { AlunoController } from '../controllers/aluno.controller';

const alunoRoutes = Router();
const alunoController = new AlunoController();

alunoRoutes.post('/', alunoController.criar);
alunoRoutes.get('/', alunoController.listar);

export { alunoRoutes };
