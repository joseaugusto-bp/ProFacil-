import { Paper, Title, Text, Stack } from '@mantine/core';
import { DonutChart } from '@mantine/charts';
import '@mantine/charts/styles.css';
import { resumoDemo } from '../../data/demo';
const data = [
  { name: 'Regular', value: resumoDemo.regulares, color: 'teal.6' },
  { name: 'Em risco', value: resumoDemo.risco, color: 'red.6' },
  { name: 'Dados insuficientes', value: resumoDemo.semDados, color: 'gray.6' },
];
export function GraficoNotas() {
  return <Paper withBorder p="md" radius="md"><Stack align="center"><Title order={3} size="h4">Situação acadêmica — simulação</Title><DonutChart data={data} size={180} thickness={25} tooltipDataSource="segment" />{data.map(item => <Text key={item.name} size="sm">{item.name}: {item.value} alunos</Text>)}</Stack></Paper>;
}
