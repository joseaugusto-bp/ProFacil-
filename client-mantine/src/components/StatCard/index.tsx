import { Paper, Group, Text, ThemeIcon } from '@mantine/core';
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color?: string;
  description?: string;
}

export function StatCard({ title, value, icon: Icon, color = 'blue', description }: StatCardProps) {
  return (
    <Paper className="portal-card" withBorder p="lg" radius="lg" h="100%">
      <Group justify="space-between" align="flex-start">
        <div>
          <Text c="dimmed" fw={500} size="sm" mb="xs">
            {title}
          </Text>
          <Text fw={650} size="34px" lh={1.2}>
            {value}
          </Text>
        </div>
        <ThemeIcon color={color} variant="light" size={44} radius="md">
          <Icon size={24} stroke={1.5} />
        </ThemeIcon>
      </Group>

      {description && (
        <Text c="dimmed" size="xs" mt="lg">
          {description}
        </Text>
      )}
    </Paper>
  );
}
