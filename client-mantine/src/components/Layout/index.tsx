import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { DarkModeToggle } from '../DarkModeToggle';

export function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header hiddenFrom="sm">
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          ProFácil
        </Group>
      </AppShell.Header>

      <Sidebar />

      <AppShell.Main bg="var(--mantine-color-gray-0)">
        {/* Adicionar o toggle no topo direito do layout principal */}
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
          <DarkModeToggle />
        </div>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
