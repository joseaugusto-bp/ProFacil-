# Profácil — base compartilhada do PI

Estado: base técnica preparada para desenvolvimento por perfil. Autenticação, sessão e cadastro/listagem de alunos estão implementados; dashboard é demonstrativo. Turmas e áreas dos demais perfis ainda não implementam os fluxos acadêmicos.

## Comece aqui

1. Leia docs/GUIA_PARA_OS_DEVS.md para a divisão, contratos e critérios de aceite.
2. Use Node.js 24, PostgreSQL com btree_gist e npm.
3. Temporariamente, os quatro devs usam o mesmo PostgreSQL de desenvolvimento no Supabase. Cada um roda sua API e frontend localmente e mantém seu próprio server/.env. Somente o responsável pela base aplica migrações.
4. Confira GUIDELINE.md e os guias de frontend/backend antes de contribuir.

## Supabase compartilhado de desenvolvimento

A migração inicial foi preparada para um banco VAZIO. Ela não converte automaticamente um banco antigo com dados. O .env existente foi preservado e pode continuar apontando para o schema antigo.

O responsável cria/configura um projeto Supabase de desenvolvimento e distribui a conexão apenas à equipe, por canal privado. Cada dev configura server/.env a partir do exemplo. Para o Prisma 5, usar Session pooler (porta 5432) em DATABASE_URL e DIRECT_URL; esse modo aceita aplicação e migrações e funciona em IPv4. Instruções completas: docs/SUPABASE_COMPARTILHADO.md.

Todos os devs, no diretório server:

```sh
npm ci --ignore-scripts
npm run prisma:validate
npm run prisma:generate
npm test
```

Somente o responsável executa npm run db:deploy, após revisar o destino e as migrações. Os demais não aplicam migrações. Não executar migrate reset, db push ou a migração inicial contra o Supabase existente para “resolver” diferenças. Para reutilizar dados antigos: inventariar schema real, fazer backup e teste de restauração, escrever conversão específica e revisar antes da aplicação. Não marcar a migração como aplicada em banco incompatível.

## Primeiro coordenador

Não existe senha padrão nem cadastro público. O responsável cria o primeiro coordenador uma única vez no ambiente compartilhado. Em PowerShell, configure temporariamente:

```powershell
$env:ADMIN_EMAIL = 'coordenador@example.test'
$env:ADMIN_NAME = 'Coordenador de desenvolvimento'
$segredo = Read-Host 'Senha inicial (mínimo 12 caracteres, máximo 72 bytes)' -AsSecureString
$env:ADMIN_PASSWORD = [System.Net.NetworkCredential]::new('', $segredo).Password
npm run bootstrap
Remove-Item Env:ADMIN_PASSWORD
```

O comando cria um novo coordenador e recusa duplicidade; não redefine senha de usuário existente. Não use dados reais no ambiente de demonstração.

## Executar

Em server: npm run dev (API em 127.0.0.1:3000).
Em client-mantine: npm ci e npm run dev.
Abra http://localhost:5173. FRONTEND_ORIGIN no backend deve ser exatamente a origem usada no navegador. Vite encaminha /api ao backend.

Login usa cookie HttpOnly, SameSite=Strict e sessão opaca persistida no banco (hash do token). Em produção o cookie exige HTTPS/Secure. CSRF fica apenas em memória no frontend, recuperado em /api/auth/me. Sessão: 8 horas absolutas e 30 minutos de inatividade. Recuperação de senha e cadastro dos demais perfis continuam no backlog.

## Verificações

Backend: npm test, npm run prisma:validate e node scripts/check-generated.cjs.
Frontend: npm run lint e npm run build.
A CI em .github/workflows/ci.yml aplica a migração em PostgreSQL descartável e executa testes com banco.

Testes de banco locais são opt-in: RUN_DATABASE_TESTS=1, com DATABASE_URL e DIRECT_URL apontando para banco LOCAL cujo nome termina em _test. Aplique a migração antes. Sem essa variável, o teste de banco é pulado; demais testes continuam rodando. Não apontar testes para bases da equipe.

Build do backend regenera o Prisma antes de compilar, evitando usar tipos antigos. O gerador é invocado explicitamente da dependência local para evitar falha de resolução observada no diretório OneDrive. generated/ e dist/ são artefatos ignorados pelo Git.

## Contratos e limitações

docs/openapi.yaml descreve apenas endpoints existentes. Endpoints planejados e tarefas por perfil estão no guia de repasse.
O schema atende uma instituição por ambiente. Operação multi-institucional, uploads, comunicação, banco de questões, recuperação de senha e integrações externas ainda precisam de implementação e testes específicos.
Produção exige revisar proxy confiável, HTTPS, retenção, backups e monitoramento. O limitador de login atual é local a um processo.

## Stack

Frontend: React, TypeScript, Vite, Mantine (versão declarada no package.json), React Router, Mantine Charts/Recharts.
Backend: Express 4, TypeScript, Prisma 5, PostgreSQL, bcryptjs (algoritmo bcrypt).
Não foi feita migração de versão principal dos frameworks.
