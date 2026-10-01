import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export function DarkModeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => toggleColorScheme()}
      title="Alternar tema"
      style={{ position: 'absolute', top: 20, right: 20 }}
      size="lg"
      radius="xl"
    >
      {dark ? <IconSun size={22} /> : <IconMoonStars size={22} />}
    </ActionIcon>
  );
}
