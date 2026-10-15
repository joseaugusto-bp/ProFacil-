import { Alert, Button, Center, Loader, Stack, Text } from '@mantine/core';
import { Navigate, Outlet } from 'react-router-dom';
import { caminhoPerfil, useAuth, type Role } from './context';
export function RequireRole({ role }: { role: Role }) {
  const { usuario, carregando, erro, atualizar } = useAuth();
  if (carregando) return <Center mih="100dvh"><Loader aria-label="Consultando sessão" /></Center>;
  if (erro) return <Center mih="100dvh"><Stack><Alert color="red">{erro}</Alert><Button onClick={() => void atualizar()}>Tentar novamente</Button></Stack></Center>;
  if (!usuario) return <Navigate to="/" replace />;
  if (usuario.role !== role) return <Navigate to={caminhoPerfil(usuario.role)} replace />;
  return <><Text size="xs" c="dimmed" ta="center">Sessão: {usuario.nome}</Text><Outlet /></>;
}
