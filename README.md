# Profácil — base compartilhada do PI

Estado: base técnica preparada para desenvolvimento por perfil. Autenticação, sessão e cadastro/listagem de alunos estão implementados; dashboard é demonstrativo. Turmas e áreas dos demais perfis ainda não implementam os fluxos acadêmicos.

Recorte da entrega do 6º período — Fase 02: login, sessão, logout dos quatro perfis e cadastro/listagem de alunos pela coordenação, com persistência, validações e permissões. O dashboard acadêmico permanece demonstrativo; turmas, vínculos acadêmicos, notas, frequência, boletim e indicadores reais são etapas futuras.

## Comece aqui

1. Leia docs/GUIA_PARA_OS_DEVS.md para a divisão, contratos e critérios de aceite.
2. Instale Node.js 24 e npm. PostgreSQL com btree_gist é a dependência do banco compartilhado; cada dev não precisa instalá-lo localmente.
3. Temporariamente, os quatro devs usam o mesmo PostgreSQL de desenvolvimento no Supabase. Cada um roda sua API e frontend localmente e mantém seu próprio server/.env. Somente o responsável pela base aplica migrações.
4. Confira GUIDELINE.md e os guias de frontend/backend antes de contribuir.

## Instalar as dependências e rodar pela primeira vez

O npm é instalado junto com o Node.js. Depois de instalar Node.js 24, abra um novo terminal e confira:

```sh
node --version
npm --version
```

Abra a pasta do projeto no VS Code e use o terminal integrado na raiz do ProFácil. Existem dois projetos Node separados: server e client-mantine. Instale as dependências em cada um; não há instalação única na raiz.

### 1. Configurar o ambiente do backend

Receba o arquivo server/.env ou os valores de configuração do responsável por canal privado. Se ainda não tem esse arquivo, copie server/.env.example para server/.env e preencha os valores antes de iniciar a API. Não sobrescreva um .env já configurado. Não coloque conexão do banco no frontend nem envie senhas ao Git.

### 2. Instalar e iniciar o backend — terminal 1

Partindo da raiz do projeto:

```sh
cd server
npm ci --ignore-scripts
npm run prisma:validate
npm run prisma:generate
npm run dev
```

npm ci instala as dependências de package.json nas versões fixadas no package-lock.json. No backend, --ignore-scripts evita geração implícita durante a instalação; prisma:generate a executa explicitamente depois. npm run dev também gera o cliente antes de iniciar. Mantenha esse terminal aberto: a API atende em http://127.0.0.1:3000. Não aplique migrações nem crie outro coordenador; o banco compartilhado já está preparado.

### 3. Instalar e iniciar o frontend — terminal 2

Abra outro terminal na raiz do projeto:

```sh
cd client-mantine
npm ci
npm run dev
```

Esse npm ci instala as dependências da interface. Mantenha o segundo terminal aberto e acesse http://127.0.0.1:5173 ou http://localhost:5173. Entre com a conta de teste recebida por canal privado.

### npm install ou npm ci?

Ambos instalam dependências. Para clonar e executar este projeto, use npm ci, porque o repositório já contém package-lock.json e a equipe deve usar as versões registradas. Use npm install ao adicionar ou atualizar uma dependência intencionalmente, revisando e versionando também a alteração do lockfile. Não é necessário executar os dois comandos em sequência.

### Nas próximas vezes

As dependências já instaladas ficam em node_modules. Inicie npm run dev em server e npm run dev em client-mantine, cada um no seu terminal. Rode npm ci novamente quando as dependências/lockfile mudarem ou precisar reinstalar. Pare a API antes de reinstalar ou regenerar o Prisma no Windows para evitar a DLL em uso.

Se aparecer ECONNREFUSED 127.0.0.1:3000 no terminal do Vite, confira se o backend iniciou no primeiro terminal e se o server/.env está preenchido.

## Supabase compartilhado de desenvolvimento

O projeto de desenvolvimento profacil-dev já foi provisionado, a migração inicial está aplicada e a conexão do backend foi verificada. Cada novo clone precisa receber sua configuração local por canal privado. A migração inicial é para banco vazio e não converte automaticamente uma base antiga com dados.

No ambiente atual, o responsável distribui a conexão já configurada apenas à equipe, por canal privado. A criação de outro projeto só é necessária para um ambiente novo. Cada dev configura server/.env a partir do exemplo. Para o Prisma 5, usar Session pooler (porta 5432) em DATABASE_URL e DIRECT_URL; esse modo aceita aplicação e migrações e funciona em IPv4. Instruções completas: docs/SUPABASE_COMPARTILHADO.md.

Todos os devs, no diretório server:

```sh
npm ci --ignore-scripts
npm run prisma:validate
npm run prisma:generate
npm test
```

Somente o responsável executa npm run db:deploy, após revisar o destino e as migrações. Os demais não aplicam migrações. Não executar migrate reset, db push ou a migração inicial contra o Supabase existente para “resolver” diferenças. Para reutilizar dados antigos: inventariar schema real, fazer backup e teste de restauração, escrever conversão específica e revisar antes da aplicação. Não marcar a migração como aplicada em banco incompatível.

## Primeiro coordenador

O ambiente compartilhado atual já tem coordenador e contas fictícias dos quatro perfis. Os devs usam essas contas, recebidas por canal privado; não repetem o bootstrap. Não existe senha padrão nem cadastro público. Somente em uma base nova sem coordenador, o responsável provisiona a primeira conta uma única vez. Nesse caso, em PowerShell, configure temporariamente:

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
Abra http://localhost:5173. Em desenvolvimento, quando FRONTEND_ORIGIN é uma origem HTTP local, localhost e 127.0.0.1 são aceitos na mesma porta configurada (5173 neste ambiente). Outras portas e domínios não são liberados automaticamente. Em produção, somente a origem HTTPS configurada é aceita. Vite encaminha /api ao backend.

Login usa cookie HttpOnly, SameSite=Strict e sessão opaca persistida no banco (hash do token). Em produção o cookie exige HTTPS/Secure. CSRF fica apenas em memória no frontend, recuperado em /api/auth/me. Sessão: 8 horas absolutas e 30 minutos de inatividade. Recuperação de senha e cadastro dos demais perfis continuam no backlog.

## Verificações

Resultados registrados em 18/10/2026: 13 testes de domínio/HTTP aprovados e 42 verificações HTTP com contas fictícias aprovadas; cadastro, duplicidade e persistência após recarregar conferidos. Os números descrevem baterias distintas, não uma soma de testes únicos. Consulte docs/VALIDACAO_TECNICA.md.

No Windows, pare a API antes de regenerar o Prisma, executar npm test ou build: o processo pode manter a DLL do cliente em uso. Reinicie a API depois.

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
