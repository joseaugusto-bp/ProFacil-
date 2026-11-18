import { BarChart } from '@mantine/charts';
import { Paper, SimpleGrid, Text, Title } from '@mantine/core';
import '@mantine/charts/styles.css';
import { turmasDemo } from '../../data/demo';

export function GraficosTurmas() {
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mb="lg">
      <Paper className="portal-card" withBorder p="lg" radius="md">
        <Title order={2} size="h4">Média por turma</Title>
        <Text size="xs" c="dimmed" mt={4} mb="xl">Notas disponíveis na simulação · escala de 0 a 10</Text>
        <BarChart
          h={240}
          data={turmasDemo}
          dataKey="turma"
          series={[{ name: 'media', label: 'Média', color: 'blue.6' }]}
          yAxisProps={{ domain: [0, 10] }}
          valueFormatter={value => value.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}
          maxBarWidth={42}
          withBarValueLabel
          barProps={{ radius: [4, 4, 0, 0] }}
        />
      </Paper>
      <Paper className="portal-card" withBorder p="lg" radius="md">
        <Title order={2} size="h4">Frequência por turma</Title>
        <Text size="xs" c="dimmed" mt={4} mb="xl">Média das frequências disponíveis na simulação</Text>
        <BarChart
          h={240}
          data={turmasDemo}
          dataKey="turma"
          series={[{ name: 'frequencia', label: 'Frequência', color: 'teal.6' }]}
          yAxisProps={{ domain: [0, 100] }}
          valueFormatter={value => `${value.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`}
          maxBarWidth={42}
          withBarValueLabel
          barProps={{ radius: [4, 4, 0, 0] }}
        />
      </Paper>
    </SimpleGrid>
  );
}
