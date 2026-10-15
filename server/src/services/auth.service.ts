import { createHash, randomBytes } from 'node:crypto';
import { compare, hash, hashSync } from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { ApiError } from '../lib/errors';
import { email, objectBody, password } from '../lib/validation';

const DUMMY_HASH = hashSync('comparacao-sem-usuario-valido', 12);
export const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;
export const SESSION_IDLE_MS = 30 * 60 * 1000;
const tokenHash = (token: string) => createHash('sha256').update(token).digest('hex');
const publicSelect = { id: true, nome: true, email: true, role: true, aluno: { select: { id: true } }, professor: { select: { id: true } }, responsavel: { select: { id: true } } } as const;
export type CurrentUser = {
  id: string; nome: string; email: string;
  role: 'ALUNO' | 'PROFESSOR' | 'COORDENADOR' | 'RESPONSAVEL';
  aluno: { id: string } | null; professor: { id: string } | null; responsavel: { id: string } | null;
};
export type AuthContext = { usuario: CurrentUser; csrfToken: string };
export class AuthService {
  async entrar(body: unknown) {
    const data = objectBody(body);
    const address = email(data.email);
    const secret = data.senha;
    if (typeof secret !== 'string' || !secret.length || Buffer.byteLength(secret, 'utf8') > 72) throw new ApiError(401, 'CREDENCIAIS_INVALIDAS', 'E-mail ou senha inválidos.');
    const user = await prisma.usuario.findUnique({ where: { email: address } });
    const valid = await compare(secret, user?.senha ?? DUMMY_HASH);
    if (!user?.ativo || !valid) throw new ApiError(401, 'CREDENCIAIS_INVALIDAS', 'E-mail ou senha inválidos.');
    const token = randomBytes(32).toString('hex');
    const csrfToken = randomBytes(32).toString('hex');
    await prisma.sessao.create({ data: { id: tokenHash(token), usuarioId: user.id, csrfToken, expiraEm: new Date(Date.now() + SESSION_DURATION_MS) } });
    return { token, csrfToken, usuario: await prisma.usuario.findUniqueOrThrow({ where: { id: user.id }, select: publicSelect }) };
  }
  async autenticar(token?: string): Promise<AuthContext> {
    if (!token || !/^[a-f0-9]{64}$/.test(token)) throw new ApiError(401, 'SESSAO_INVALIDA', 'Entre novamente.');
    const id = tokenHash(token);
    const session = await prisma.sessao.findUnique({ where: { id }, include: { usuario: { select: { ...publicSelect, ativo: true } } } });
    const now = new Date();
    if (!session || !session.usuario.ativo || session.expiraEm <= now || now.getTime() - session.ultimaAtividade.getTime() >= SESSION_IDLE_MS) {
      if (session) await prisma.sessao.deleteMany({ where: { id } });
      throw new ApiError(401, 'SESSAO_INVALIDA', 'Entre novamente.');
    }
    const updated = await prisma.sessao.updateMany({ where: { id, expiraEm: { gt: now }, ultimaAtividade: { gt: new Date(now.getTime() - SESSION_IDLE_MS) } }, data: { ultimaAtividade: now } });
    if (updated.count !== 1) throw new ApiError(401, 'SESSAO_INVALIDA', 'Entre novamente.');
    const { ativo: _ativo, ...usuario } = session.usuario;
    return { usuario, csrfToken: session.csrfToken };
  }
  async sair(token?: string) {
    if (token && /^[a-f0-9]{64}$/.test(token)) await prisma.sessao.deleteMany({ where: { id: tokenHash(token) } });
  }
}
export async function hashPassword(value: unknown) { return hash(password(value), 12); }
