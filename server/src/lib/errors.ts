import { Prisma } from '../../generated/prisma';
import type { ErrorRequestHandler, RequestHandler } from 'express';

export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string) { super(message); }
}
export const asyncRoute = (handler: RequestHandler): RequestHandler => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ApiError) {
    res.status(error.status).json({ erro: { codigo: error.code, mensagem: error.message } }); return;
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    res.status(409).json({ erro: { codigo: 'CONFLITO', mensagem: 'Já existe um registro com estes dados.' } }); return;
  }
  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).json({ erro: { codigo: 'JSON_INVALIDO', mensagem: 'JSON inválido.' } }); return;
  }
  if (typeof error === 'object' && error && 'type' in error && error.type === 'entity.too.large') {
    res.status(413).json({ erro: { codigo: 'CORPO_GRANDE', mensagem: 'Requisição excede o limite.' } }); return;
  }
  // Não devolver erros do ORM, stack traces, tokens ou credenciais.
  console.error('Falha interna na API:', error instanceof Error ? error.name : 'Erro desconhecido');
  res.status(500).json({ erro: { codigo: 'ERRO_INTERNO', mensagem: 'Não foi possível concluir a operação.' } });
};
