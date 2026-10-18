import { AppShell, Avatar, Badge, Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { DarkModeToggle } from '../DarkModeToggle';
import { useAuth } from '../../auth/context';
import './panel.css';
export function Layout() {
 const [opened, { toggle, close }] = useDisclosure();
 const { usuario } = useAuth();
 return <AppShell className="portal-shell" header={{ height: 76 }} navbar={{ width: 248, breakpoint: 'sm', collapsed: { mobile: !opened } }} padding={{ base: 18, md: 32 }}>
  <AppShell.Header className="portal-header"><Group h="100%" px={{ base: 18, md: 32 }} justify="space-between">
   <Group gap="sm"><Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" aria-label="Alternar menu" /><div><Text size="sm" fw={600}>Portal da coordenação</Text><Text size="xs" c="dimmed" visibleFrom="sm">Um olhar completo para a vida escolar</Text></div></Group>
   <Group gap="md"><Badge variant="light" color="blue" visibleFrom="md">Ambiente de desenvolvimento</Badge><DarkModeToggle /><Avatar color="blue" radius="xl" size={36} aria-label={usuario?.nome}>{usuario?.nome.slice(0, 1)}</Avatar></Group>
  </Group></AppShell.Header>
  <Sidebar onNavigate={close} />
  <AppShell.Main><div className="portal-content"><Outlet /></div></AppShell.Main>
 </AppShell>;
}
