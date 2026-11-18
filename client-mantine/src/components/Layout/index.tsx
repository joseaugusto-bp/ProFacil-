import { ActionIcon, AppShell, Burger, Group, Popover, Stack, Text } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { DarkModeToggle } from '../DarkModeToggle';
import { useAuth } from '../../auth/context';
import './panel.css';

export function Layout() {
  const [opened, { toggle, close }] = useDisclosure();
  const { usuario } = useAuth();

  return (
    <AppShell
      className="portal-shell"
      header={{ height: 72 }}
      navbar={{ width: 248, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding={{ base: 18, md: 32 }}
    >
      <AppShell.Header className="portal-header">
        <Group className="portal-header-content" h="100%" px={{ base: 18, md: 32 }} justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="white" aria-label="Alternar menu" />
            <Link to="/coordenador/dashboard" className="portal-logo" onClick={close} aria-label="ProFácil, visão geral">
              <img src="/logo-profacil.png" alt="" width={38} height={38} />
              <span>ProFácil</span>
            </Link>
          </Group>
          <Group gap="sm" wrap="nowrap">
            <DarkModeToggle />
            <Popover position="bottom-end" withArrow shadow="md">
              <Popover.Target>
                <ActionIcon variant="subtle" size="lg" radius="md" aria-label="Ver perfil" title="Ver perfil">
                  <IconUserCircle size={23} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <Stack gap={4} maw={280}>
                  <Text size="sm" fw={600}>{usuario?.nome}</Text>
                  <Text size="xs" c="dimmed">Coordenação</Text>
                  <Text size="xs" style={{ overflowWrap: 'anywhere' }}>{usuario?.email}</Text>
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </Group>
      </AppShell.Header>
      <Sidebar onNavigate={close} />
      <AppShell.Main>
        <div className="portal-content"><Outlet /></div>
      </AppShell.Main>
    </AppShell>
  );
}
