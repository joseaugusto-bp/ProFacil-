import 'dotenv/config';
import { createApp } from './app';
import { prisma } from './lib/prisma';
const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT inválida.');
const server = createApp().listen(port, '127.0.0.1', () => { console.log('API disponível na porta ' + port); });
const shutdown = () => { server.close(() => { prisma.$disconnect().finally(() => process.exit(0)); }); };
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
