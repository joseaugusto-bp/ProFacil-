let csrfToken: string | null = null;
export function setCsrfToken(value: string | null) { csrfToken = value; }
export class ApiError extends Error {
  status: number;
  codigo: string;
  constructor(status: number, codigo: string, message: string) { super(message); this.status = status; this.codigo = codigo; }
}
export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body) headers.set('Content-Type', 'application/json');
  if (csrfToken && !['GET', 'HEAD'].includes(options.method ?? 'GET')) headers.set('X-CSRF-Token', csrfToken);
  const response = await fetch('/api' + path, { ...options, headers, credentials: 'same-origin' });
  if (response.status === 204) return undefined as T;
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new ApiError(response.status, body?.erro?.codigo ?? 'ERRO_HTTP', body?.erro?.mensagem ?? 'Não foi possível concluir a operação.');
  return body as T;
}
