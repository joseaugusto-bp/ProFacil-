import { Alert, AppShell, Avatar, Button, Group, NavLink, Stack, Text } from '@mantine/core';
import { IconUsers, IconLayoutDashboard, IconUsersGroup, IconLogout, IconSchool } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../auth/context';
export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
 const location = useLocation();
 const { sair, usuario } = useAuth();
 const [erro, setErro] = useState<string | null>(null);
 const [saindo, setSaindo] = useState(false);
 return <AppShell.Navbar className="portal-sidebar" p="lg"><Stack h="100%" gap={28}>
  <Link to="/coordenador/dashboard" className="portal-logo" onClick={onNavigate}><img src="/logo-profacil.png" alt="" width={38} height={38} /><span>Pro<span>Fácil</span></span></Link>
  <div><Text className="portal-nav-label" mb="sm">ESPAÇO DA COORDENAÇÃO</Text><Stack gap={6}>
   <NavLink component={Link} to="/coordenador/dashboard" label="Visão geral" leftSection={<IconLayoutDashboard size={19} />} active={location.pathname === '/coordenador/dashboard'} onClick={onNavigate} />
   <NavLink component={Link} to="/coordenador/alunos" label="Alunos" leftSection={<IconUsers size={19} />} active={location.pathname === '/coordenador/alunos'} onClick={onNavigate} />
   <NavLink component={Link} to="/coordenador/turmas" label="Turmas" description="Em desenvolvimento" leftSection={<IconUsersGroup size={19} />} active={location.pathname === '/coordenador/turmas'} onClick={onNavigate} />
  </Stack></div>
  <div className="portal-sidebar-note"><IconSchool size={22} /><Text size="sm" fw={600} mt="sm">Cada aluno importa.</Text><Text size="xs" mt={6}>Acompanhe os sinais e aproxime escola e família.</Text></div>
  <Stack mt="auto" gap="sm">{erro && <Alert color="red" role="alert">{erro}</Alert>}
   <Group className="portal-account" wrap="nowrap"><Avatar color="blue" radius="xl" size={34}>{usuario?.nome.slice(0,1)}</Avatar><div><Text size="sm" fw={600} lineClamp={1}>{usuario?.nome}</Text><Text size="xs" className="portal-account-role">Coordenação</Text></div></Group>
   <Button className="portal-logout" variant="subtle" color="gray" justify="flex-start" leftSection={<IconLogout size={18} />} loading={saindo} onClick={async()=>{setSaindo(true);try{await sair();}catch{setErro('Não foi possível encerrar a sessão. Tente novamente.');}finally{setSaindo(false);}}}>Sair da conta</Button>
  </Stack>
 </Stack></AppShell.Navbar>;
}
