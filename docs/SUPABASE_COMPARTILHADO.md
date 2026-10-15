# Supabase compartilhado — configuração temporária do PI

## Decisão
Os quatro integrantes executam backend e frontend nos próprios computadores, usando um PostgreSQL de desenvolvimento compartilhado no Supabase. Não precisam instalar PostgreSQL ou Docker para desenvolver os perfis.
Dados fictícios apenas. Um responsável pela base aplica mudanças de estrutura; os demais propõem migrações em PR.

## Responsável pela base — configuração inicial
1. Criar um projeto de desenvolvimento, por exemplo profacil-dev, preservando o projeto/banco antigo.
2. Como o acesso será exclusivamente pelo Prisma/backend, desativar a Data API nas configurações de API do projeto novo. As permissões do Express não protegem uma Data API paralela.
3. Em Connect, copiar a conexão Session pooler, porta 5432. Preservar host e usuário completos do painel e substituir apenas a senha; caracteres especiais da senha precisam de codificação de URL.
4. Configurar server/.env a partir do exemplo, sem alterar o frontend. No Prisma 5 deste projeto, a conexão Session pode ser usada tanto em DATABASE_URL quanto em DIRECT_URL. Não copiar exemplos de prisma.config.ts de versões novas para este projeto.
5. Manter sslmode=require. Um connection_limit=2 em DATABASE_URL limita o pool de cada backend neste ambiente pequeno; monitorar o total de conexões e ajustar conforme necessário.
6. Instalar dependências, validar e gerar o Prisma. Conferir o projeto de destino antes de aplicar a migração.
7. Apenas se não houver tabelas antigas do Profácil, aplicar npm run db:deploy uma vez. A migração cria tabelas, constraints, triggers e btree_gist; permissões e suporte da extensão devem estar disponíveis. Se o banco já tiver dados/schema antigo, primeiro preparar conversão específica com backup, sem reset.
8. Provisionar o primeiro coordenador com npm run bootstrap conforme README. Não executar o bootstrap repetidamente para o mesmo usuário.

O projeto profacil-dev já foi preparado pela integração Supabase em 15/10/2026. Não executar novamente a migração inicial pelo SQL Editor.

## Cada desenvolvedor
Receber a conexão por canal privado; não é necessário compartilhar a senha da conta pessoal do Supabase. Manter o arquivo server/.env no computador, fora do Git.

No diretório server:
```sh
npm ci --ignore-scripts
npm run prisma:validate
npm run prisma:generate
npm test
npm run dev
```

npm test sem RUN_DATABASE_TESTS executa os testes de domínio/HTTP e pula o cenário de banco real. Não habilitar o cenário de banco com o Supabase compartilhado.

No diretório client-mantine:
```sh
npm ci
npm run dev
```

Abrir http://localhost:5173. Não trocar a origem do navegador sem ajustar FRONTEND_ORIGIN do próprio backend.
A API usa 127.0.0.1:3000 e o Vite encaminha /api a ela. O navegador não recebe a URL PostgreSQL.
Após atualizar o código, regenerar Prisma e reiniciar a API. Se houver nova migração pendente, aguardar o responsável aplicá-la.

## Rotina da equipe
- Somente o responsável executa db:deploy no ambiente compartilhado. Nenhum dev usa db push ou migrate reset.
- Para criar novas migrações, o responsável usa ambiente isolado de modelagem/validação; os outros devs não precisam mantê-lo.
- Identificar dados de teste por integrante, por exemplo nomes com prefixo DEV-ALUNO ou DEV-PROFESSOR; não modificar registros de outro integrante sem combinar.
- Compartilhar uma base significa compartilhar também alterações e exclusões. Coordenação por issues e PRs continua necessária.
- Evitar mudanças de estrutura próximas da apresentação. Preparar ambiente de demonstração separado e com massa fictícia estável.
- Segredos PostgreSQL somente no backend e em canais privados. Nunca no frontend, screenshots, logs públicos, commits ou no guia.
- Conexão administrativa de migração deve ficar com o responsável. A separação por papéis de banco para os backends pode ser adotada depois; a política da equipe, sozinha, não é restrição técnica de permissões.
- A CI continua em PostgreSQL descartável; nunca cadastrar a URL do Supabase de desenvolvimento como destino dos testes de banco.
- Supabase Auth não está integrado: o login atual continua sendo a sessão do Profácil. Não criar uma segunda autenticação sem decisão de arquitetura.

## Estado verificado em 15/10/2026
- Projeto: profacil-dev; referência hsnwwitfeuqojkmiwcps; região ca-central-1.
- Aplicada a migração remota profacil_base_compartilhada: 18 tabelas de domínio, constraints, triggers e btree_gist no schema extensions.
- Histórico Prisma inicial registrado com o checksum exato do arquivo local: c9c93da5929eccbe0dd8c9b51322a6618f9ca0085c57d3992914de6095021d65. A migração 20261015000000_base_compartilhada está concluída; db:deploy deve reconhecer esse registro quando a conexão estiver configurada. Não editar a migração já aplicada.
- RLS habilitado nas 18 tabelas e em _prisma_migrations; anon/authenticated sem permissões de leitura ou escrita. Funções de trigger usam SECURITY INVOKER, search_path fixado e execução pública revogada.
- O Security Advisor retornou somente informes RLS Enabled No Policy. Isso é intencional: não usamos Supabase Auth nem acesso de usuários finais pela Data API. Não criar políticas permissivas para remover o informe. Referência: https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy
- O SQL operacional de proteção está em server/prisma/supabase-hardening.sql. Após futuras migrações, revisar também permissões e RLS das novas tabelas/funções antes de liberar uso.
- O histórico remoto Supabase registra o provisionamento; as próximas alterações da aplicação seguem o histórico Prisma, por um responsável.
- Backend local conectado ao projeto novo com TLS; consulta real e prisma migrate status confirmaram conexão e nenhuma migração pendente. Quatro contas fictícias (coordenador, professor, aluno e responsável) foram criadas; login, sessão, permissão de listagem de alunos e logout validados pela API. Credenciais ficam fora do repositório.
- A Data API não foi desativada pela integração; manter a recomendação do passo 2. As revogações e RLS acima já bloqueiam os papéis públicos nas tabelas atuais.

## Próximo passo local
No painel do projeto, abrir Connect e copiar a URI Session pooler (5432).
Preencher DATABASE_URL e DIRECT_URL em server/.env, substituindo a senha localmente com codificação de URL quando necessário. Não enviar a senha no chat.
Preservar sslmode=require e usar connection_limit=2 em DATABASE_URL.
Depois, o responsável executa npm run db:deploy para confirmar que não há migrações pendentes e provisiona o coordenador com npm run bootstrap.
Os demais devs recebem a configuração por canal privado e não executam migrações.

## Referências
- Supabase + Prisma: https://supabase.com/docs/guides/database/prisma
- Conexões: https://supabase.com/docs/guides/database/connecting-to-postgres
