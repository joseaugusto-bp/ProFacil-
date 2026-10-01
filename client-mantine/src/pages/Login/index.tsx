import { Container, Title, TextInput, PasswordInput, Checkbox, Anchor, Button, Group, Stack, Flex } from '@mantine/core';
import { IconUser, IconLock, IconSchool } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import backgroundVideo from '../../video.mp4';
import { DarkModeToggle } from '../../components/DarkModeToggle';
import { useNavigate } from 'react-router-dom';

export function LoginScreen() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Para fins de protótipo, estamos redirecionando direto para o dashboard do coordenador.
    // O sistema de rotas fará esse redirecionamento correto com base na autenticação futura.
    navigate('/coordenador/dashboard');
  };

  return (
    <Flex style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0 }}>
      
      {/* Lado Esquerdo - Vídeo e Logo */}
      <Flex 
        flex={1}
        direction="column"
        align="center"
        justify="center"
        style={{ 
          position: 'relative',
          backgroundColor: '#2D6D65', 
          color: 'white',
          overflow: 'hidden'
        }}
      >
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 3.5, ease: "easeOut" }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        >
          <video
            autoPlay
            muted
            loop={true}
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </motion.div>

        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(45, 109, 101, 0.6)', zIndex: 1 }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ zIndex: 2 }}
        >
          <Stack align="center" gap="sm">
            <IconSchool size={160} stroke={1.5} />
            <Title order={1} style={{ fontSize: '4rem', letterSpacing: '1px', fontWeight: 600 }}>ProFácil</Title>
          </Stack>
        </motion.div>
      </Flex>

      {/* Lado Direito - Formulário */}
      <Flex 
        flex={1}
        align="center"
        justify="center"
        style={{ position: 'relative' }}
      >
        <DarkModeToggle />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          style={{ width: '100%', maxWidth: '420px' }}
        >
          <Container size="xs" style={{ width: '100%' }}>
            <Title order={2} c="brand" mb="xl" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
              LOGIN
            </Title>

            <Stack gap="lg">
              <TextInput
                placeholder="Usuário"
                leftSection={<IconUser size={20} />}
                size="md"
                radius="xl"
              />

              <PasswordInput
                placeholder="Senha"
                leftSection={<IconLock size={20} />}
                size="md"
                radius="xl"
              />

              <Group justify="space-between" mt="xs">
                <Checkbox label="Lembrar" color="brand" />
                <Anchor size="sm" c="brand" fw={600} style={{ cursor: 'pointer' }}>
                  Esqueceu a senha?
                </Anchor>
              </Group>

              <Button fullWidth size="lg" radius="xl" color="brand" mt="xl" onClick={handleLogin}>
                Entrar
              </Button>
            </Stack>
          </Container>
        </motion.div>
      </Flex>

    </Flex>
  );
}
