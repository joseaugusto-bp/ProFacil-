import { Alert, AppShell, Button, NavLink, Stack, Text, Title } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../auth/context';
export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const { sair } = useAuth();
  const [erro, setErro] = useState<string | null>(null);
  return <AppShell.Navbar p="md"><Stack h="100%">
    <Title order={3} c="brand">Coordenação</Title>
    {[{ label: 'Dashboard demonstrativo', path: '/coordenador/dashboard' }, { label: 'Turmas — em desenvolvimento', path: '/coordenador/turmas' }].map(link => <NavLink key={link.path} component={Link} to={link.path} label={link.label} active={location.pathname === link.path} onClick={onNavigate} />)}
    <Text size="sm" c="dimmed">Notas e banco de questões serão disponibilizados após implementação.</Text>
    {erro && <Alert color="red">{erro}</Alert>}
    <Button mt="auto" variant="light" onClick={async () => { try { await sair(); } catch { setErro('Não foi possível encerrar a sessão. Tente novamente.'); } }}>Sair</Button>
  </Stack></AppShell.Navbar>;
}
