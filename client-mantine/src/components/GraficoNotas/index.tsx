import { Badge, Box, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { DonutChart } from '@mantine/charts';
import '@mantine/charts/styles.css';
import { resumoDemo } from '../../data/demo';
const data = [
 { name: 'Regular', value: resumoDemo.regulares, color: 'teal.6' },
 { name: 'Em risco', value: resumoDemo.risco, color: 'orange.6' },
 { name: 'Dados insuficientes', value: resumoDemo.semDados, color: 'gray.5' },
];
export function GraficoNotas() {
 return <Paper className="portal-card" withBorder p="lg" radius="lg" h="100%"><Group justify="space-between" mb={6}><Title order={2} size="h4">Situação acadêmica</Title><Badge color="gray" variant="light" size="xs">Simulação</Badge></Group><Text c="dimmed" size="xs">Distribuição dos alunos da prévia</Text>
  <Stack gap={24} mt={26}><Box pos="relative" mx="auto" w={200} h={200}><DonutChart data={data} size={200} thickness={24} tooltipDataSource="segment" /><div className="portal-chart-center"><strong>{resumoDemo.total}</strong><span>alunos</span></div></Box>
   <Stack gap={14}>{data.map(item=><Group key={item.name} justify="space-between"><Group gap={9}><Box w={8} h={8} bg={item.color} style={{borderRadius:'50%'}} /><Text size="sm" c="dimmed">{item.name}</Text></Group><Text size="sm" fw={600}>{item.value}</Text></Group>)}</Stack>
  </Stack>
 </Paper>;
}
