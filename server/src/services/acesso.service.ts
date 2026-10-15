import { prisma } from '../lib/prisma';
import { ApiError } from '../lib/errors';
import type { CurrentUser } from './auth.service';
// IDs de perfil vêm da sessão autenticada; vínculos são consultados no banco.
export async function autorizarLeituraAluno(usuario: CurrentUser, alunoId: string, agora = new Date()) {
  if (usuario.role === 'COORDENADOR') return;
  if (usuario.role === 'ALUNO' && usuario.aluno?.id === alunoId) return;
  if (usuario.role === 'RESPONSAVEL' && usuario.responsavel) {
    const vinculo = await prisma.alunoResponsavel.findFirst({ where: {
      alunoId, responsavelId: usuario.responsavel.id, inicio: { lte: agora },
      OR: [{ fim: null }, { fim: { gt: agora } }],
    }, select: { id: true } });
    if (vinculo) return;
  }
  throw new ApiError(403, 'ACESSO_NEGADO', 'Acesso não autorizado.');
}
export async function autorizarDocente(usuario: CurrentUser, vinculoId: string, agora = new Date()) {
  if (usuario.role !== 'PROFESSOR' || !usuario.professor) throw new ApiError(403, 'ACESSO_NEGADO', 'Operação exclusiva do professor vinculado.');
  const vinculo = await prisma.professorTurma.findFirst({ where: {
    id: vinculoId, professorId: usuario.professor.id, inicio: { lte: agora },
    OR: [{ fim: null }, { fim: { gt: agora } }],
  } });
  if (!vinculo) throw new ApiError(403, 'ACESSO_NEGADO', 'Professor sem vínculo vigente.');
  return vinculo;
}
