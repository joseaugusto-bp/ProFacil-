import { Badge, Paper, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconUsersGroup } from '@tabler/icons-react';
export function TurmasCoordenador() {
 return <div><Text className="portal-eyebrow" mb={8}>ORGANIZAÇÃO ESCOLAR</Text><Title order={1} className="portal-title" mb={8}>Turmas</Title><Text c="dimmed" size="sm" mb="xl">Um espaço para organizar vínculos e acompanhar cada turma.</Text><Paper className="portal-card" withBorder p={48} radius="lg"><Stack align="center" gap="md"><ThemeIcon size={64} radius="xl" variant="light"><IconUsersGroup size={30}/></ThemeIcon><Badge variant="light">Em desenvolvimento</Badge><Title order={2} size="h3" ta="center">As turmas terão seu espaço aqui.</Title><Text c="dimmed" size="sm" ta="center" maw={420}>O cadastro de turmas e os vínculos de alunos e professores ainda serão implementados. Esta tela não apresenta dados reais.</Text></Stack></Paper></div>;
}
