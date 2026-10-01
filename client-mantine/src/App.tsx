import { MantineProvider } from '@mantine/core';
import { theme } from './styles/theme';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <AppRoutes />
    </MantineProvider>
  );
}
