import { AppShell, NavLink, Title, Group, Stack } from '@mantine/core';
import { IconLayoutDashboard, IconUsers, IconReportAnalytics, IconDatabase, IconSchool } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { icon: IconLayoutDashboard, label: 'Dashboard', path: '/coordenador/dashboard' },
    { icon: IconUsers, label: 'Turmas', path: '/coordenador/turmas' },
    { icon: IconReportAnalytics, label: 'Notas', path: '/coordenador/notas' },
    { icon: IconDatabase, label: 'Banco de Questões', path: '/coordenador/questoes' },
  ];

  return (
    <AppShell.Navbar p="md">
      <Group mb="xl" justify="center" align="center">
        <IconSchool size={32} color="var(--mantine-color-brand-6)" />
        <Title order={3} c="brand">ProFácil</Title>
      </Group>

      <Stack gap="sm">
        {links.map((link) => (
          <NavLink
            key={link.label}
            active={location.pathname === link.path}
            label={link.label}
            leftSection={<link.icon size={20} stroke={1.5} />}
            onClick={() => navigate(link.path)}
            variant="filled"
            color="brand"
            style={{ borderRadius: '8px' }}
          />
        ))}
      </Stack>
    </AppShell.Navbar>
  );
}
