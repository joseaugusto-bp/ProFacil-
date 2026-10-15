import { useState, type FormEvent } from 'react';
import { Alert, Button, Container, Flex, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconSchool } from '@tabler/icons-react';
import { useMediaQuery, useReducedMotion } from '@mantine/hooks';
import backgroundVideo from '../../video.mp4';
import { Navigate, useNavigate } from 'react-router-dom';
import { DarkModeToggle } from '../../components/DarkModeToggle';
import { caminhoPerfil, useAuth } from '../../auth/context';
import './login.css';
export function LoginScreen() {
  const { entrar, usuario } = useAuth();
  const navigate = useNavigate();
  const desktop = useMediaQuery('(min-width: 48em)');
  const reducedMotion = useReducedMotion();
  const [email, setEmail] = useState(''), [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null), [enviando, setEnviando] = useState(false);
  if (usuario) return <Navigate to={caminhoPerfil(usuario.role)} replace />;
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setErro(null); setEnviando(true);
    try { const user = await entrar(email, senha); setSenha(''); navigate(caminhoPerfil(user.role), { replace: true }); }
    catch (error) { setErro(error instanceof Error ? error.message : 'Falha ao entrar.'); }
    finally { setEnviando(false); }
  };
  return <Flex className="login-shell">
    <Flex className="login-brand" direction="column" align="center" justify="center" gap="md">
      {desktop && !reducedMotion && <video className="login-video" autoPlay muted loop playsInline aria-hidden><source src={backgroundVideo} type="video/mp4" /></video>}
      <Stack className="login-logo" align="center"><IconSchool size={100} aria-hidden /><Title order={1}>ProFácil</Title><Text>Gestão escolar</Text></Stack>
    </Flex>
    <Flex flex={1} align="center" justify="center" p="xl" pos="relative">
      <div style={{ position: 'absolute', top: 16, right: 16 }}><DarkModeToggle /></div>
      <Container size="xs" w="100%">
        <form onSubmit={submit}>
          <Stack>
            <Title order={2} c="brand">Entrar</Title>
            {erro && <Alert color="red" role="alert">{erro}</Alert>}
            <TextInput label="E-mail" type="email" autoComplete="username" required value={email} onChange={event => setEmail(event.currentTarget.value)} />
            <PasswordInput label="Senha" autoComplete="current-password" required value={senha} onChange={event => setSenha(event.currentTarget.value)} />
            <Button type="submit" loading={enviando}>Entrar</Button>
            <Text size="sm" c="dimmed">Solicite à coordenação o cadastro ou a recuperação de acesso.</Text>
          </Stack>
        </form>
      </Container>
    </Flex>
  </Flex>;
}
