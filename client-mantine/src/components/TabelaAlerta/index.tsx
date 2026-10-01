import { Paper, Table, Badge, Title, Group, Button } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

// Dados fictícios para o esqueleto visual
const alunosEmRisco = [
  { id: 1, nome: 'João Pedro Silva', turma: '9º Ano A', media: 4.5, faltas: 12 },
  { id: 2, nome: 'Ana Beatriz Souza', turma: '1º Ano B', media: 5.2, faltas: 8 },
  { id: 3, nome: 'Carlos Eduardo', turma: '2º Ano A', media: 3.8, faltas: 15 },
  { id: 4, nome: 'Mariana Santos', turma: '9º Ano C', media: 5.8, faltas: 4 },
];

export function TabelaAlerta() {
  const rows = alunosEmRisco.map((aluno) => (
    <Table.Tr key={aluno.id}>
      <Table.Td fw={500}>{aluno.nome}</Table.Td>
      <Table.Td>{aluno.turma}</Table.Td>
      <Table.Td>
        <Badge color={aluno.media < 5 ? 'red' : 'orange'} variant="light">
          {aluno.media.toFixed(1)}
        </Badge>
      </Table.Td>
      <Table.Td>{aluno.faltas} faltas</Table.Td>
      <Table.Td>
        <Button variant="light" color="brand" size="xs">
          Ver Detalhes
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder p="md" radius="md" shadow="sm">
      <Group justify="space-between" mb="md">
        <Group gap="xs">
          <IconAlertCircle size={20} color="var(--mantine-color-red-6)" />
          <Title order={3} size="h4">Alunos em Risco Acadêmico</Title>
        </Group>
        <Button variant="subtle" color="gray" size="sm">
          Ver todos os 34
        </Button>
      </Group>

      <Table striped highlightOnHover verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Aluno</Table.Th>
            <Table.Th>Turma</Table.Th>
            <Table.Th>Média Atual</Table.Th>
            <Table.Th>Frequência</Table.Th>
            <Table.Th>Ação</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}
