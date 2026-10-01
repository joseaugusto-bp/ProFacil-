import { Title, Text, Container } from '@mantine/core';

export function TurmasCoordenador() {
  return (
    <Container fluid p="xl">
      <Title order={1} mb="md">Gestão de Turmas</Title>
      <Text c="dimmed">Aqui será possível cadastrar novas classes, professores e exportar relatórios.</Text>
    </Container>
  );
}
