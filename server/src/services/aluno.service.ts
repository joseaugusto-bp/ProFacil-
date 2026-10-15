import { prisma } from '../lib/prisma';
import { email, objectBody, password, text } from '../lib/validation';
import { ApiError } from '../lib/errors';
import { hashPassword } from './auth.service';

const selectAluno = {
  id: true,
  usuario: { select: { id: true, nome: true, email: true, ativo: true, createdAt: true } },
  matriculas: { select: { id: true, inicio: true, fim: true, turma: { select: { id: true, nome: true, anoLetivo: true } } } },
} as const;
export class AlunoService {
  async criarAluno(body: unknown, autorId: string) {
    const data = objectBody(body);
    if (Object.keys(data).some(key => !['nome', 'email', 'senha'].includes(key))) throw new ApiError(400, 'CAMPO_INVALIDO', 'Campos permitidos: nome, email e senha.');
    const nome = text(data.nome, 'Nome', 2, 120);
    const address = email(data.email);
    const senha = await hashPassword(password(data.senha));
    // Nested write + auditoria na mesma transação; papel não vem do cliente.
    return prisma.$transaction(async tx => {
      const aluno = await tx.aluno.create({ data: { usuario: { create: { nome, email: address, senha, role: 'ALUNO' } } }, select: selectAluno });
      await tx.auditoria.create({ data: { autorId, acao: 'ALUNO_CRIADO', recursoId: aluno.id } });
      return aluno;
    });
  }
  async listarAlunos(pagina: number, limite: number) {
    const [dados, total] = await prisma.$transaction([
      prisma.aluno.findMany({ select: selectAluno, skip: (pagina - 1) * limite, take: limite, orderBy: { id: 'asc' } }),
      prisma.aluno.count(),
    ]);
    return { dados, paginacao: { pagina, limite, total } };
  }
}
