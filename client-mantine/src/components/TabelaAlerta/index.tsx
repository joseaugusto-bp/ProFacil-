import { Paper, Table, Badge, Title, Text } from '@mantine/core';
import { alunosDemo } from '../../data/demo';
export function TabelaAlerta() {
  return <Paper withBorder p="md" radius="md"><Title order={3} size="h4" mb="md">Alunos em risco — simulação</Title>
    <Table.ScrollContainer minWidth={520}><Table striped><Table.Thead><Table.Tr><Table.Th>Aluno</Table.Th><Table.Th>Turma</Table.Th><Table.Th>Média</Table.Th><Table.Th>Frequência</Table.Th><Table.Th>Situação</Table.Th></Table.Tr></Table.Thead><Table.Tbody>
      {alunosDemo.filter(a => a.status === 'EM_RISCO').map(a => <Table.Tr key={a.id}><Table.Td>{a.nome}</Table.Td><Table.Td>{a.turma}</Table.Td><Table.Td>{a.media?.toFixed(1) ?? 'Sem dados'}</Table.Td><Table.Td>{a.frequencia === null ? 'Sem dados' : a.frequencia + '%'}</Table.Td><Table.Td><Badge color="red">Em risco</Badge></Table.Td></Table.Tr>)}
    </Table.Tbody></Table></Table.ScrollContainer><Text size="sm" c="dimmed" mt="sm">Limites de referência do PI: média inferior a 6,0 ou frequência inferior a 75%.</Text>
  </Paper>;
}
