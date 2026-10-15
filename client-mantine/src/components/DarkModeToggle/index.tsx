import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
export function DarkModeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return <ActionIcon variant="subtle" color="gray" onClick={() => toggleColorScheme()} aria-label="Alternar tema" title="Alternar tema" size="lg" radius="xl">{colorScheme === 'dark' ? <IconSun size={22} /> : <IconMoonStars size={22} />}</ActionIcon>;
}
