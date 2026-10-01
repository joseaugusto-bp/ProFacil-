import { Paper, Title, Group, Text, Stack } from '@mantine/core';
import { DonutChart } from '@mantine/charts';
import { IconChartPie, IconCircleFilled } from '@tabler/icons-react';
import '@mantine/charts/styles.css';

const data = [
  { name: 'Acima da Média', value: 850, color: 'teal.6' },
  { name: 'Atenção (5 a 7)', value: 356, color: 'yellow.5' },
  { name: 'Em Risco (<5)', value: 34, color: 'red.6' },
];

export function GraficoNotas() {
  return (
    <Paper withBorder p="md" radius="md" shadow="sm" h="100%">
      <Group gap="xs" mb="xl">
        <IconChartPie size={20} color="var(--mantine-color-brand-6)" />
        <Title order={3} size="h4">Distribuição de Desempenho</Title>
      </Group>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
        <DonutChart
          data={data}
          size={180}
          thickness={25}
          tooltipDataSource="segment"
        />

        <Stack gap="xs" w="100%" px="md">
          {data.map((item) => (
            <Group key={item.name} justify="space-between">
              <Group gap="xs">
                <IconCircleFilled size={12} color={`var(--mantine-color-${item.color.replace('.', '-')})`} />
                <Text size="sm" c="dimmed">{item.name}</Text>
              </Group>
              <Text size="sm" fw={600}>{item.value} alunos</Text>
            </Group>
          ))}
        </Stack>
      </div>
    </Paper>
  );
}
