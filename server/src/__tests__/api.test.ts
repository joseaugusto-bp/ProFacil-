import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';
import { once } from 'node:events';
import { createApp } from '../app';
import { ApiError } from '../lib/errors';
import type { AuthContext, CurrentUser } from '../services/auth.service';
import { AlunoService } from '../services/aluno.service';
const origin = 'http://localhost:5173';
const user: CurrentUser = { id: 'u1', nome: 'Coordenação', email: 'coord@example.test', role: 'COORDENADOR', aluno: null, professor: null, responsavel: null };
async function withApp(run: (url: string) => Promise<void>, role: CurrentUser['role'] = 'COORDENADOR', fail = false) {
 let active = true;
 const auth = {
  entrar: async () => ({ token: 'token-teste', csrfToken: 'csrf-teste', usuario: { ...user, role } }),
  autenticar: async (token?: string): Promise<AuthContext> => {
   if (token !== 'token-teste' || !active) throw new ApiError(401, 'SESSAO_INVALIDA', 'Entre novamente.');
   return { usuario: { ...user, role }, csrfToken: 'csrf-teste' };
  },
  sair: async () => { active = false; },
 };
 class TestAlunos extends AlunoService {
  override async listarAlunos(_pagina: number, _limite: number): ReturnType<AlunoService['listarAlunos']> {
   if (fail) throw new Error('postgres://segredo-interno');
   return { dados: [], paginacao: { pagina: 1, limite: 20, total: 0 } };
  }
 }
 const server: Server = createApp({ auth, alunos: new TestAlunos(), origin }).listen(0, '127.0.0.1');
 await once(server, 'listening');
 try { await run('http://127.0.0.1:' + (server.address() as AddressInfo).port); }
 finally { server.closeAllConnections(); await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())); }
}
test('alunos sem sessão recebem 401', () => withApp(async url => {
 assert.equal((await fetch(url + '/api/alunos')).status, 401);
}));
test('perfil de aluno não pode listar todos os alunos', () => withApp(async url => {
 assert.equal((await fetch(url + '/api/alunos', { headers: { cookie: 'profacil_session=token-teste' } })).status, 403);
}, 'ALUNO'));
test('erros assíncronos retornam 500 sem vazar diagnóstico', () => withApp(async url => {
 const response = await fetch(url + '/api/alunos', { headers: { cookie: 'profacil_session=token-teste' } });
 assert.equal(response.status, 500); assert.doesNotMatch(await response.text(), /segredo-interno|postgres/);
}, 'COORDENADOR', true));
test('origem inválida e falta de CSRF bloqueiam escrita', () => withApp(async url => {
 assert.equal((await fetch(url + '/api/auth/login', { method: 'POST', headers: { origin: 'https://outro.example' } })).status, 403);
 assert.equal((await fetch(url + '/api/alunos', { method: 'POST', headers: { origin, cookie: 'profacil_session=token-teste' } })).status, 403);
}));
test('cookie é HttpOnly e logout revoga acesso', () => withApp(async url => {
 const login = await fetch(url + '/api/auth/login', { method: 'POST', headers: { origin } });
 const cookie = login.headers.get('set-cookie') ?? '';
 assert.match(cookie, /HttpOnly/i); assert.match(cookie, /SameSite=Strict/i);
 const headers = { origin, cookie: 'profacil_session=token-teste', 'x-csrf-token': 'csrf-teste' };
 assert.equal((await fetch(url + '/api/auth/logout', { method: 'POST', headers })).status, 204);
 assert.equal((await fetch(url + '/api/auth/me', { headers })).status, 401);
}));
test('paginação inválida é recusada antes da consulta', () => withApp(async url => {
 assert.equal((await fetch(url + '/api/alunos?limite=1000', { headers: { cookie: 'profacil_session=token-teste' } })).status, 400);
}));
