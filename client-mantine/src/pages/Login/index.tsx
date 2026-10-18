import { useState, type FormEvent } from 'react';
import { Alert, Button, MantineProvider, PasswordInput, TextInput } from '@mantine/core';
import { IconArrowRight, IconLock } from '@tabler/icons-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { caminhoPerfil, useAuth } from '../../auth/context';
import './login.css';

export function LoginScreen() {
  const { entrar, usuario } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(''), [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null), [enviando, setEnviando] = useState(false);
  if (usuario) return <Navigate to={caminhoPerfil(usuario.role)} replace />;
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setErro(null); setEnviando(true);
    try { const user = await entrar(email, senha); setSenha(''); navigate(caminhoPerfil(user.role), { replace: true }); }
    catch (error) { setErro(error instanceof Error ? error.message : 'Falha ao entrar.'); }
    finally { setEnviando(false); }
  };
  return <MantineProvider forceColorScheme="dark"><main className="login-shell">
    <section className="login-panel" aria-labelledby="login-title">
      <a className="login-wordmark" href="/" aria-label="Profácil, início"><span className="login-mark"><img src="/logo-profacil.png" alt="" width="39" height="39" /></span>Pro<span>Fácil</span></a>
      <div className="login-form-wrap">
        <span className="login-eyebrow">SEU PORTAL ESCOLAR</span>
        <h1 id="login-title">Bom ter você<br />por aqui.</h1>
        <p className="login-intro">Entre na sua conta e acompanhe o que acontece na sua escola.</p>
        <form onSubmit={submit} className="login-form" aria-busy={enviando}>
          {erro && <Alert color="red" role="alert" id="login-error">{erro}</Alert>}
          <TextInput label="E-mail" placeholder="Seu e-mail de acesso" type="email" autoComplete="username" required size="md" radius="sm" value={email} aria-describedby={erro ? 'login-error' : undefined} onChange={event => setEmail(event.currentTarget.value)} />
          <PasswordInput label="Senha" placeholder="Digite sua senha" autoComplete="current-password" required size="md" radius="sm" value={senha} aria-describedby={erro ? 'login-error' : undefined} visibilityToggleButtonProps={{ 'aria-label': 'Mostrar ou ocultar senha' }} onChange={event => setSenha(event.currentTarget.value)} />
          <Button type="submit" loading={enviando} size="md" radius="sm" color="blue" rightSection={<IconArrowRight size={18} aria-hidden />}>Entrar no portal</Button>
        </form>
        <p className="login-help">Primeiro acesso ou esqueceu sua senha?<br /><strong>Solicite ajuda à coordenação da escola.</strong></p>
      </div>
      <div className="login-footer"><IconLock size={14} aria-hidden /><span>Acesso exclusivo à comunidade escolar</span></div>
    </section>
    <section className="login-brand" aria-label="Profácil">
      <div className="login-art" aria-hidden="true"><div className="login-orbit orbit-one" /><div className="login-orbit orbit-two" /><div className="login-orbit orbit-three" /><div className="login-stars" /></div>
      <div className="login-brand-content">
        <img className="login-brand-logo" src="/logo-profacil.png" alt="" width="160" height="160" />
        <p className="login-brand-name">ProFácil</p>
      </div>
    </section>
  </main></MantineProvider>;
}
