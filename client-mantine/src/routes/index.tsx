import { createBrowserRouter, RouterProvider, Navigate, Link } from 'react-router-dom';
import { Badge, Button, Container, Paper, Stack, Text, Title } from '@mantine/core';
import { LoginScreen } from '../pages/Login';
import { Layout } from '../components/Layout';
import { TurmasCoordenador } from '../pages/Coordenador/Turmas';
import { RequireRole } from '../auth/RequireRole';
import { useAuth } from '../auth/context';
import { useState } from 'react';
function PerfilEmDesenvolvimento() {
  const { usuario, sair } = useAuth();
  const [erro, setErro] = useState<string | null>(null);
  return <Container py={60} size="sm"><Paper withBorder p="xl" radius="lg"><Stack align="center" gap="lg"><img src="/logo-profacil.png" alt="Profácil" width={72} height={72} style={{ background: '#14264a', borderRadius: 16, padding: 10 }} /><Badge variant="light">Em desenvolvimento</Badge><Title order={1} ta="center">Olá, {usuario?.nome}.</Title><Text c="dimmed" ta="center">Você está na área de {usuario?.role === 'RESPONSAVEL' ? 'responsável' : usuario?.role.toLowerCase()}. As funcionalidades deste perfil serão implementadas na próxima etapa.</Text>{erro && <Text role="alert" c="red">{erro}</Text>}<Button variant="light" onClick={async () => { try { await sair(); } catch { setErro('Não foi possível encerrar a sessão. Tente novamente.'); } }}>Sair da conta</Button></Stack></Paper></Container>;
}
const router = createBrowserRouter([
  { path: '/', element: <LoginScreen /> },
  { element: <RequireRole role="COORDENADOR" />, children: [
    { path: '/coordenador', element: <Layout />, children: [
      { index: true, element: <Navigate to="/coordenador/dashboard" replace /> },
      { path: 'dashboard', lazy: async () => ({ Component: (await import('../pages/Coordenador/Dashboard')).DashboardCoordenador }) },
      { path: 'turmas', element: <TurmasCoordenador /> },
      { path: 'alunos', lazy: async () => ({ Component: (await import('../pages/Coordenador/Alunos')).AlunosCoordenador }) },
    ] },
  ] },
  ...(['ALUNO', 'PROFESSOR', 'RESPONSAVEL'] as const).map(role => ({
    element: <RequireRole role={role} />,
    children: [{ path: '/' + role.toLowerCase(), element: <PerfilEmDesenvolvimento /> }],
  })),
  { path: '*', element: <Container py="xl"><Title>Página não encontrada</Title><Button component={Link} to="/">Voltar ao início</Button></Container> },
]);
export function AppRoutes() { return <RouterProvider router={router} />; }
