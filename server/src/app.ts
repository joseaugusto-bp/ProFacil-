import express from 'express';
import cors from 'cors';
import { timingSafeEqual } from 'node:crypto';
import { AuthService, type AuthContext, SESSION_DURATION_MS } from './services/auth.service';
import { AlunoService } from './services/aluno.service';
import { AlunoController } from './controllers/aluno.controller';
import { createAlunoRoutes } from './routes/aluno.routes';
import { ApiError, asyncRoute, errorHandler } from './lib/errors';

export const COOKIE = 'profacil_session';
function readToken(header?: string) {
  const cookies = (header ?? '').split(';').map(item => item.trim());
  return cookies.find(item => item.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1);
}
type Dependencies = { auth?: Pick<AuthService, 'entrar' | 'autenticar' | 'sair'>; alunos?: AlunoService; origin?: string; production?: boolean };
export function createApp(deps: Dependencies = {}) {
  const app = express();
  const auth = deps.auth ?? new AuthService();
  const origin = deps.origin ?? process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173';
  const production = deps.production ?? process.env.NODE_ENV === 'production';
  if (production && !origin.startsWith('https://')) throw new Error('FRONTEND_ORIGIN deve usar HTTPS em produção.');
  const allowedOrigins = new Set([origin]);
  const configuredOrigin = new URL(origin);
  if (!production && configuredOrigin.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(configuredOrigin.hostname)) {
    for (const host of ['localhost', '127.0.0.1']) {
      const localOrigin = new URL(origin); localOrigin.hostname = host;
      allowedOrigins.add(localOrigin.origin);
    }
  }
  const cookieOptions = { httpOnly: true, secure: production, sameSite: 'strict' as const, path: '/api' };
  app.disable('x-powered-by');
  app.use((_req, res, next) => { res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('Cache-Control', 'no-store'); next(); });
  app.use(cors({ origin: (requestOrigin, callback) => callback(null, !!requestOrigin && allowedOrigins.has(requestOrigin)), credentials: true, allowedHeaders: ['Content-Type', 'X-CSRF-Token'] }));
  app.use(express.json({ limit: '32kb' }));
  // Requisições de escrita exigem origem explícita inclusive para login.
  app.use('/api', (req, _res, next) => {
    if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) && !allowedOrigins.has(req.get('origin') ?? '')) return next(new ApiError(403, 'ORIGEM_INVALIDA', 'Origem não autorizada.'));
    next();
  });
  app.get('/api/health', (_req, res) => { res.json({ status: 'ok' }); });
  // Limite local por IP; ambiente distribuído exige armazenamento compartilhado.
  const attempts = new Map<string, { count: number; until: number }>();
  app.post('/api/auth/login', asyncRoute(async (req, res) => {
    const now = Date.now();
    for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key);
    const key = req.ip ?? 'unknown';
    const entry = attempts.get(key) ?? { count: 0, until: now + 15 * 60 * 1000 };
    if (entry.count >= 10 || attempts.size >= 10000) throw new ApiError(429, 'LIMITE_LOGIN', 'Aguarde antes de tentar novamente.');
    entry.count++; attempts.set(key, entry);
    const result = await auth.entrar(req.body);
    const previous = readToken(req.headers.cookie);
    if (previous) await auth.sair(previous);
    attempts.delete(key);
    res.cookie(COOKIE, result.token, { ...cookieOptions, maxAge: SESSION_DURATION_MS });
    res.json({ dados: { usuario: result.usuario, csrfToken: result.csrfToken } });
  }));
  app.use('/api', asyncRoute(async (req, res, next) => {
    const context: AuthContext = await auth.autenticar(readToken(req.headers.cookie));
    res.locals.auth = context;
    if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      const supplied = req.get('x-csrf-token') ?? '';
      const expected = context.csrfToken;
      if (Buffer.byteLength(supplied) !== Buffer.byteLength(expected) || !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) throw new ApiError(403, 'CSRF_INVALIDO', 'Atualize a sessão e tente novamente.');
    }
    next();
  }));
  app.get('/api/auth/me', (_req, res) => { res.json({ dados: res.locals.auth }); });
  app.post('/api/auth/logout', asyncRoute(async (req, res) => {
    await auth.sair(readToken(req.headers.cookie));
    res.clearCookie(COOKIE, cookieOptions); res.status(204).end();
  }));
  app.use('/api/alunos', (_req, res, next) => {
    if (res.locals.auth.usuario.role !== 'COORDENADOR') return next(new ApiError(403, 'ACESSO_NEGADO', 'Operação exclusiva da coordenação.'));
    next();
  }, createAlunoRoutes(new AlunoController(deps.alunos)));
  app.use((_req, _res, next) => { next(new ApiError(404, 'NAO_ENCONTRADO', 'Recurso não encontrado.')); });
  app.use(errorHandler);
  return app;
}
