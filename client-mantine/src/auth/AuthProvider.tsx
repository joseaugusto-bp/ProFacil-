import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { api, ApiError, setCsrfToken } from '../services/api';
import { AuthContext, type Usuario } from './context';
type Session = { dados: { usuario: Usuario; csrfToken: string } };
export function AuthProvider({ children }: { children: ReactNode }) {
  const epoch = useRef(0);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const consultar = useCallback(async () => {
    const current = ++epoch.current;
    try {
      const result = await api<Session>('/auth/me');
      if (current === epoch.current) { setCsrfToken(result.dados.csrfToken); setUsuario(result.dados.usuario); setErro(null); }
    } catch (error) {
      if (current !== epoch.current) return;
      setUsuario(null); setCsrfToken(null);
      setErro(error instanceof ApiError && error.status === 401 ? null : 'Não foi possível consultar a sessão. Verifique a API.');
    } finally { if (current === epoch.current) setCarregando(false); }
  }, []);
  const invalidar = useCallback(() => { ++epoch.current; }, []);
  // oxlint-disable-next-line react/set-state-in-effect -- Sincronização com API; estados são atualizados após await.
  useEffect(() => { void consultar(); return invalidar; }, [consultar, invalidar]);
  const atualizar = async () => { setCarregando(true); await consultar(); };
  const entrar = async (email: string, senha: string) => {
    ++epoch.current; setCarregando(false);
    const result = await api<Session>('/auth/login', { method: 'POST', body: JSON.stringify({ email, senha }) });
    setCsrfToken(result.dados.csrfToken); setUsuario(result.dados.usuario); setErro(null);
    return result.dados.usuario;
  };
  const sair = async () => {
    ++epoch.current;
    try { await api<void>('/auth/logout', { method: 'POST' }); }
    catch (error) { if (!(error instanceof ApiError && error.status === 401)) throw error; }
    setCsrfToken(null); setUsuario(null);
  };
  return <AuthContext.Provider value={{ usuario, carregando, erro, atualizar, entrar, sair }}>{children}</AuthContext.Provider>;
}
