import { Title, Container, SimpleGrid, Grid, Tabs, Box } from '@mantine/core';
import { IconUsers, IconAlertTriangle, IconChartBar, IconChecklist, IconLayoutDashboard, IconAlertCircle, IconChalkboard, IconBooks } from '@tabler/icons-react';
import { StatCard } from '../../../components/StatCard';
import { TabelaAlerta } from '../../../components/TabelaAlerta';
import { GraficoNotas } from '../../../components/GraficoNotas';

export function DashboardCoordenador() {
  return (
    <Container fluid p="xl">
      <Title order={1} mb="xl" c="brand">Painel de Coordenação</Title>
      
      <Tabs defaultValue="visao-geral" variant="outline" radius="md">
        <Tabs.List mb="xl">
          <Tabs.Tab value="visao-geral" leftSection={<IconLayoutDashboard size={16} />}>
            Visão Geral
          </Tabs.Tab>
          <Tabs.Tab value="alunos-risco" leftSection={<IconAlertCircle size={16} />}>
            Alunos Críticos
          </Tabs.Tab>
          <Tabs.Tab value="analise-turmas" leftSection={<IconChalkboard size={16} />}>
            Análise de Turmas
          </Tabs.Tab>
          <Tabs.Tab value="professores-materias" leftSection={<IconBooks size={16} />}>
            Professores & Matérias
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="visao-geral">
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mb="xl">
            <StatCard 
              title="Total de Alunos" 
              value="1.240" 
              icon={IconUsers} 
              color="blue"
              description="Matriculados no ano letivo"
            />
            <StatCard 
              title="Média Geral" 
              value="7.8" 
              icon={IconChartBar} 
              color="teal"
              description="Considerando todas as turmas"
            />
            <StatCard 
              title="Alunos em Risco" 
              value="34" 
              icon={IconAlertTriangle} 
              color="red"
              description="Com média abaixo de 6.0"
            />
            <StatCard 
              title="Frequência Média" 
              value="92%" 
              icon={IconChecklist} 
              color="grape"
              description="Presença registrada"
            />
          </SimpleGrid>

          <Grid>
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <TabelaAlerta />
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <GraficoNotas />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="alunos-risco">
          <Box p="md" style={{ border: '1px dashed #ccc', borderRadius: '8px' }}>
            <Title order={3} c="dimmed" mb="sm">Área de Alunos Críticos</Title>
            <p>Conteúdo reservado para o futuro (Lista expandida, filtros, contato com responsáveis, etc).</p>
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="analise-turmas">
          <Box p="md" style={{ border: '1px dashed #ccc', borderRadius: '8px' }}>
            <Title order={3} c="dimmed" mb="sm">Área de Turmas</Title>
            <p>Conteúdo reservado para o futuro (Desempenho comparativo entre as classes do colégio).</p>
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="professores-materias">
          <Box p="md" style={{ border: '1px dashed #ccc', borderRadius: '8px' }}>
            <Title order={3} c="dimmed" mb="sm">Área de Professores e Matérias</Title>
            <p>Conteúdo reservado para o futuro (Ranking de médias por professor, mapeamento de dificuldades, etc).</p>
          </Box>
        </Tabs.Panel>
      </Tabs>

    </Container>
  );
}
