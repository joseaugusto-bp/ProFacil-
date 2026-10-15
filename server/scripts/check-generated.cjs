// A comparação evita compilar silenciosamente contra um cliente antigo.
const fs = require('node:fs');
const path = require('node:path');
const base = path.resolve(__dirname, '..');
const expected = fs.readFileSync(path.join(base, 'prisma/schema.prisma'), 'utf8').replace(/\r\n/g, '\n').trim();
const generated = fs.readFileSync(path.join(base, 'generated/prisma/schema.prisma'), 'utf8').replace(/\r\n/g, '\n').trim();
if (expected !== generated) { console.error('Prisma Client desatualizado. Execute npm run prisma:generate.'); process.exit(1); }
console.log('Prisma Client alinhado ao schema.');
