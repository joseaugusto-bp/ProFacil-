import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AlunoService {
  async criarAluno(data: { nome: string; email: string }) {
    // Regra de Negócio: Não pode criar aluno sem e-mail
    if (!data.email) {
      throw new Error('O e-mail é obrigatório para cadastrar um aluno.');
    }

    return await prisma.aluno.create({
      data: {
        nome: data.nome,
        email: data.email
      }
    });
  }

  async listarAlunos() {
    return await prisma.aluno.findMany({
      include: { turma: true }
    });
  }
}
