import { createBrowserRouter, RouterProvider, Navigate, Link } from 'react-router-dom';
import { Button, Container, Stack, Text, Title } from '@mantine/core';
import { LoginScreen } from '../pages/Login';
import { Layout } from '../components/Layout';
import { TurmasCoordenador } from '../pages/Coordenador/Turmas';
import { RequireRole } from '../auth/RequireRole';
import { useAuth } from '../auth/context';
import { useState } from 'react';
function PerfilEmDesenvolvimento() {
  const { usuario, sair } = useAuth();
  const [erro, setErro] = useState<string | null>(null);
  return <Container py="xl"><Stack><Title order={1}>Área de {usuario?.role.toLowerCase()}</Title><Text>Perfil autenticado. As funcionalidades deste perfil serão implementadas na próxima etapa.</Text>{erro && <Text role="alert" c="red">{erro}</Text>}<Button onClick={async () => { try { await sair(); } catch { setErro('Não foi possível encerrar a sessão. Tente novamente.'); } }}>Sair</Button></Stack></Container>;
}
const router = createBrowserRouter([
  { path: '/', element: <LoginScreen /> },
  { element: <RequireRole role="COORDENADOR" />, children: [
    { path: '/coordenador', element: <Layout />, children: [
      { index: true, element: <Navigate to="/coordenador/dashboard" replace /> },
      { path: 'dashboard', lazy: async () => ({ Component: (await import('../pages/Coordenador/Dashboard')).DashboardCoordenador }) },
      { path: 'turmas', element: <TurmasCoordenador /> },
    ] },
  ] },
  ...(['ALUNO', 'PROFESSOR', 'RESPONSAVEL'] as const).map(role => ({
    element: <RequireRole role={role} />,
    children: [{ path: '/' + role.toLowerCase(), element: <PerfilEmDesenvolvimento /> }],
  })),
  { path: '*', element: <Container py="xl"><Title>Página não encontrada</Title><Button component={Link} to="/">Voltar ao início</Button></Container> },
]);
export function AppRoutes() { return <RouterProvider router={router} />; }
