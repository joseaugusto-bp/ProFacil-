import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { DarkModeToggle } from '../DarkModeToggle';
export function Layout() {
  const [opened, { toggle, close }] = useDisclosure();
  return <AppShell header={{ height: 60 }} navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }} padding="md">
    <AppShell.Header><Group h="100%" px="md" justify="space-between"><Group><Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" aria-label="Alternar menu" />ProFácil</Group><DarkModeToggle /></Group></AppShell.Header>
    <Sidebar onNavigate={close} />
    <AppShell.Main bg="var(--mantine-color-body)"><Outlet /></AppShell.Main>
  </AppShell>;
}
