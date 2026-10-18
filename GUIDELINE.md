# Diretrizes compartilhadas — Profácil

## Organização
Frontend em client-mantine; API em server; contratos em docs. Uma instituição por ambiente.
A divisão de entrega é por perfil, com responsável principal para cada fluxo completo (tela, API, permissões e testes). Banco, identidade, indicadores e contratos são compartilhados e têm revisão conjunta. Consulte docs/GUIA_PARA_OS_DEVS.md.

## Recorte da Fase 02
Recorte da entrega do 6º período — Fase 02: login, sessão, logout dos quatro perfis e cadastro/listagem de alunos pela coordenação, com persistência, validações e permissões. O dashboard acadêmico permanece demonstrativo; turmas, vínculos acadêmicos, notas, frequência, boletim e indicadores reais são etapas futuras.
Critérios futuros por perfil não ampliam o aceite desta entrega. Os estados planejado, implementado e validado devem permanecer explícitos.

## Git
Main é a linha principal de integração. A política para novas contribuições é passar por PR revisado e CI aprovada, inclusive mudanças do líder técnico. Essa política não comprova que todo o histórico já seguiu esse fluxo; registrar exceções e resultados reais sem presumir revisão ou CI executada.
Branches curtas: feature/<issue>-<descricao>. Exemplo: feature/12-boletim-aluno.
Partir da main atualizada, fazer commits focados e atualizar a branch antes da revisão. Merge ou rebase conforme política do grupo; não reescrever main ou histórico compartilhado sem coordenação.
Não adicionar segredos, .env, dependências instaladas ou artefatos gerados.

## Contratos
docs/openapi.yaml documenta endpoints existentes. Propostas futuras ficam marcadas como planejadas no guia.
Mudança incompatível em DTO, rota, enum ou schema exige alinhamento entre os perfis. Não criar fórmulas, modelos de aluno ou autenticações paralelas.
Perfis são atribuídos no servidor; cliente não determina privilégios.
A UI não é barreira de autorização: validar usuário, recurso e vínculo na API.

## Banco
Decisão temporária: um projeto Supabase de desenvolvimento compartilhado, com dados fictícios. API e frontend rodam localmente para cada dev. Não é necessário instalar PostgreSQL local para desenvolver os perfis. Credenciais de banco ficam somente no server/.env individual e são transmitidas apenas à equipe por canal privado; não compartilhar login pessoal do Supabase nem versionar segredos.
Mudanças via migrations versionadas e revisadas. Um responsável pela base aplica as migrações; os demais propõem mudanças em PR. Não executar db push, migrate reset ou testes de banco destrutivos na base compartilhada. A CI continua usando PostgreSQL descartável.
A migração inicial desta revisão é para base vazia; conversão de base existente exige plano específico, backup e restauração testada.
As constraints e triggers da migração complementam o Prisma; preserve-as nas próximas migrações.

## Entrega
Critérios mínimos: schema válido, Prisma Client atualizado, build, testes críticos, revisão, contrato e documentação atualizados.
Diferenciar: planejado, implementado no backend, integrado e validado. Mock não é integração.
