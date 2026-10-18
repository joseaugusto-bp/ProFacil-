import { Avatar, Badge, Group, Paper, Table, Text, Title } from '@mantine/core';
import { alunosDemo } from '../../data/demo';
export function TabelaAlerta() {
 return <Paper className="portal-card" withBorder p="lg" radius="lg" h="100%"><Group justify="space-between" mb={6}><Title order={2} size="h4">Alunos que precisam de atenção</Title><Badge color="orange" variant="light">{alunosDemo.filter(a=>a.status==='EM_RISCO').length} alunos</Badge></Group><Text c="dimmed" size="xs" mb="lg">Prévia com dados fictícios · priorize o acompanhamento</Text>
  <Table.ScrollContainer minWidth={590}><Table verticalSpacing="md" horizontalSpacing="sm" highlightOnHover><Table.Thead><Table.Tr><Table.Th>Aluno</Table.Th><Table.Th>Turma</Table.Th><Table.Th>Média</Table.Th><Table.Th>Frequência</Table.Th></Table.Tr></Table.Thead><Table.Tbody>
   {alunosDemo.filter(a=>a.status==='EM_RISCO').map(a=><Table.Tr key={a.id}><Table.Td><Group gap={10} wrap="nowrap"><Avatar color="blue" size={32} radius="xl">{a.nome.split(' ').slice(0,2).map(n=>n[0]).join('')}</Avatar><Text size="sm" fw={500}>{a.nome}</Text></Group></Table.Td><Table.Td><Text size="xs" c="dimmed">{a.turma}</Text></Table.Td><Table.Td><Badge variant="light" color={(a.media??10)<6?'orange':'teal'} radius="sm">{a.media?.toFixed(1).replace('.',',')??'Sem dados'}</Badge></Table.Td><Table.Td><Text size="sm" fw={500} c={a.frequencia!==null&&a.frequencia<75?'orange':undefined}>{a.frequencia===null?'Sem dados':a.frequencia+'%'}</Text></Table.Td></Table.Tr>)}
  </Table.Tbody></Table></Table.ScrollContainer><Text size="xs" c="dimmed" mt="lg">Referência do PI: média abaixo de 6,0 ou frequência abaixo de 75%.</Text>
 </Paper>;
}
