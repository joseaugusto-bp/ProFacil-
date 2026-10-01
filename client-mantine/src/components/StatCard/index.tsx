import { Paper, Group, Text, ThemeIcon } from '@mantine/core';
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color?: string;
  description?: string;
}

export function StatCard({ title, value, icon: Icon, color = 'brand', description }: StatCardProps) {
  return (
    <Paper withBorder p="md" radius="md" shadow="sm">
      <Group justify="space-between" align="flex-start">
        <div>
          <Text c="dimmed" tt="uppercase" fw={700} size="xs" mb="xs">
            {title}
          </Text>
          <Text fw={700} size="xl">
            {value}
          </Text>
        </div>
        <ThemeIcon color={color} variant="light" size={38} radius="md">
          <Icon size={24} stroke={1.5} />
        </ThemeIcon>
      </Group>

      {description && (
        <Text c="dimmed" size="sm" mt="md">
          {description}
        </Text>
      )}
    </Paper>
  );
}
