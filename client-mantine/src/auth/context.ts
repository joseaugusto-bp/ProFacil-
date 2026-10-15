import { createContext, useContext } from 'react';
export type Role = 'COORDENADOR' | 'PROFESSOR' | 'ALUNO' | 'RESPONSAVEL';
export type Usuario = { id: string; nome: string; email: string; role: Role };
export type Auth = { usuario: Usuario | null; carregando: boolean; erro: string | null; atualizar: () => Promise<void>; entrar: (email: string, senha: string) => Promise<Usuario>; sair: () => Promise<void> };
export const AuthContext = createContext<Auth | null>(null);
export const caminhoPerfil = (role: Role) => '/' + role.toLowerCase() + (role === 'COORDENADOR' ? '/dashboard' : '');
export function useAuth() { const result = useContext(AuthContext); if (!result) throw new Error('AuthProvider ausente.'); return result; }
