import { Link } from 'react-router-dom';
import { Alert, Button, Grid, Group, SimpleGrid, Text, Title } from '@mantine/core';
import { IconUsers, IconAlertTriangle, IconChecklist, IconHelp, IconInfoCircle } from '@tabler/icons-react';
import { StatCard } from '../../../components/StatCard';
import { TabelaAlerta } from '../../../components/TabelaAlerta';
import { GraficoNotas } from '../../../components/GraficoNotas';
import { resumoDemo } from '../../../data/demo';
import { useAuth } from '../../../auth/context';
export function DashboardCoordenador() {
 const { usuario } = useAuth();
 return <div>
  <Group justify="space-between" align="flex-start" mb={28}><div><Text className="portal-eyebrow" mb={8}>ACOMPANHAMENTO ESCOLAR</Text><Title order={1} className="portal-title">Olá, {usuario?.nome.startsWith('DEV-') ? 'coordenação' : usuario?.nome.split(' ')[0]}.</Title><Text c="dimmed" mt={8} size="sm">Veja o panorama acadêmico e quem precisa de atenção.</Text></div><Button component={Link} to="/coordenador/alunos" variant="light">Gerenciar alunos</Button></Group>
  <Alert className="portal-demo" icon={<IconInfoCircle size={19} />} color="blue" mb={26} title="Prévia do painel">Os indicadores abaixo usam dados fictícios. A integração com os registros acadêmicos ainda está em desenvolvimento.</Alert>
  <SimpleGrid cols={{ base: 1, xs: 2, lg: 4 }} spacing="lg" mb={28}>
   <StatCard title="Alunos na simulação" value={resumoDemo.total} icon={IconUsers} description="Base demonstrativa do painel" />
   <StatCard title="Precisam de atenção" value={resumoDemo.risco} icon={IconAlertTriangle} color="orange" description="Média ou frequência abaixo do limite" />
   <StatCard title="Situação regular" value={resumoDemo.regulares} icon={IconChecklist} color="teal" description="Dentro dos critérios de referência" />
   <StatCard title="Sem dados suficientes" value={resumoDemo.semDados} icon={IconHelp} color="gray" description="Aguardando registros acadêmicos" />
  </SimpleGrid>
  <Grid gap="lg" align="stretch"><Grid.Col span={{base:12,lg:8}}><TabelaAlerta /></Grid.Col><Grid.Col span={{base:12,lg:4}}><GraficoNotas /></Grid.Col></Grid>
  <Text size="xs" c="dimmed" mt={24}>ProFácil · Acompanhamento com contexto, cuidado e informação.</Text>
 </div>;
}
