import 'dotenv/config';
import { prisma } from '../lib/prisma';
import { hashPassword } from '../services/auth.service';
import { email, text } from '../lib/validation';
async function main() {
  const address = email(process.env.ADMIN_EMAIL);
  const nome = text(process.env.ADMIN_NAME, 'ADMIN_NAME', 2, 120);
  const senha = await hashPassword(process.env.ADMIN_PASSWORD);
  // Sem senha padrão ou atualização silenciosa de usuário existente.
  await prisma.usuario.create({ data: { nome, email: address, senha, role: 'COORDENADOR', coordenador: { create: {} } } });
  console.log('Coordenador criado. Nenhuma credencial foi exibida.');
}
main().catch(() => { console.error('Não foi possível criar o coordenador. Verifique configuração, migrações e duplicidade.'); process.exitCode = 1; }).finally(() => prisma.$disconnect());
