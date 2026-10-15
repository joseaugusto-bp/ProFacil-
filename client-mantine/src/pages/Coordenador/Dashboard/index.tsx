import { Alert, Container, Grid, SimpleGrid, Title } from '@mantine/core';
import { IconUsers, IconAlertTriangle, IconChecklist, IconHelp } from '@tabler/icons-react';
import { StatCard } from '../../../components/StatCard';
import { TabelaAlerta } from '../../../components/TabelaAlerta';
import { GraficoNotas } from '../../../components/GraficoNotas';
import { resumoDemo } from '../../../data/demo';
export function DashboardCoordenador() {
  return <Container fluid py="md"><Title order={1} mb="md" c="brand">Painel de Coordenação</Title>
    <Alert color="yellow" mb="xl">Dados fictícios para validar a interface. Este painel ainda não consulta registros acadêmicos da API.</Alert>
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="xl">
      <StatCard title="Alunos simulados" value={resumoDemo.total} icon={IconUsers} />
      <StatCard title="Em risco" value={resumoDemo.risco} icon={IconAlertTriangle} color="red" />
      <StatCard title="Regulares" value={resumoDemo.regulares} icon={IconChecklist} color="teal" />
      <StatCard title="Dados insuficientes" value={resumoDemo.semDados} icon={IconHelp} color="gray" />
    </SimpleGrid>
    <Grid><Grid.Col span={{ base: 12, lg: 8 }}><TabelaAlerta /></Grid.Col><Grid.Col span={{ base: 12, lg: 4 }}><GraficoNotas /></Grid.Col></Grid>
  </Container>;
}
