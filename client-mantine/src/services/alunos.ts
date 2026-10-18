import { api } from './api';
export type Aluno = {
 id: string;
 usuario: { id: string; nome: string; email: string; ativo: boolean; createdAt: string };
 matriculas: { id: string; inicio: string; fim: string | null; turma: { id: string; nome: string; anoLetivo: number } }[];
};
export type ListaAlunos = { dados: Aluno[]; paginacao: { pagina: number; limite: number; total: number } };
export type NovoAluno = { nome: string; email: string; senha: string };
export const listarAlunos = (pagina: number, signal?: AbortSignal) => api<ListaAlunos>('/alunos?pagina=' + pagina + '&limite=20', { signal });
export const criarAluno = (dados: NovoAluno) => api<{ dados: Aluno }>('/alunos', { method: 'POST', body: JSON.stringify(dados) });
