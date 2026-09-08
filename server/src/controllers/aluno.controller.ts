import { Request, Response } from 'express';
import { AlunoService } from '../services/aluno.service';

export class AlunoController {
  async criar(req: Request, res: Response) {
    try {
      const alunoService = new AlunoService();
      const novoAluno = await alunoService.criarAluno(req.body);
      res.status(201).json(novoAluno);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async listar(req: Request, res: Response) {
    const alunoService = new AlunoService();
    const alunos = await alunoService.listarAlunos();
    res.json(alunos);
  }
}
