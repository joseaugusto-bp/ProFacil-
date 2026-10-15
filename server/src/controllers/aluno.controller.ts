import type { Request, Response } from 'express';
import { AlunoService } from '../services/aluno.service';
import { pagination } from '../lib/validation';
export class AlunoController {
  constructor(private service = new AlunoService()) {}
  criar = async (req: Request, res: Response) => { res.status(201).json({ dados: await this.service.criarAluno(req.body, res.locals.auth.usuario.id) }); };
  listar = async (req: Request, res: Response) => { const { pagina, limite } = pagination(req.query); res.json(await this.service.listarAlunos(pagina, limite)); };
}
