import { MantineProvider } from '@mantine/core';
import { theme } from './styles/theme';
import { AppRoutes } from './routes';
import { AuthProvider } from './auth/AuthProvider';
export default function App() {
  return <MantineProvider theme={theme} defaultColorScheme="light"><AuthProvider><AppRoutes /></AuthProvider></MantineProvider>;
}
