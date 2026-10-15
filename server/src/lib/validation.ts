import { ApiError } from './errors';
export function objectBody(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new ApiError(400, 'ENTRADA_INVALIDA', 'Envie um objeto JSON.');
  return value as Record<string, unknown>;
}
export function text(value: unknown, name: string, min: number, max: number): string {
  if (typeof value !== 'string' || value.trim().length < min || value.trim().length > max) throw new ApiError(400, 'ENTRADA_INVALIDA', name + ' inválido.');
  return value.trim();
}
export function email(value: unknown): string {
  const result = text(value, 'E-mail', 3, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result)) throw new ApiError(400, 'ENTRADA_INVALIDA', 'E-mail inválido.');
  return result;
}
export function password(value: unknown): string {
  if (typeof value !== 'string' || value.length < 12 || Buffer.byteLength(value, 'utf8') > 72) throw new ApiError(400, 'SENHA_INVALIDA', 'A senha deve ter pelo menos 12 caracteres e no máximo 72 bytes.');
  return value;
}
export function pagination(query: Record<string, unknown>) {
  const parse = (value: unknown, fallback: number, max: number) => {
    if (value === undefined) return fallback;
    if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value) || Number(value) > max) throw new ApiError(400, 'PAGINACAO_INVALIDA', 'Paginação inválida.');
    return Number(value);
  };
  return { pagina: parse(query.pagina, 1, 100000), limite: parse(query.limite, 20, 100) };
}
