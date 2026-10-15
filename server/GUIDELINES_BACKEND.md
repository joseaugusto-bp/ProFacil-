# Backend — regras de contribuição

Express 4 + TypeScript + Prisma 5 + PostgreSQL. Senhas com bcrypt via bcryptjs (não criptografia reversível).

- app.ts monta a API sem abrir porta; server.ts carrega ambiente e inicia o servidor.
- routes/controllers adaptam HTTP; services validam domínio e coordenam transações; lib/prisma.ts concentra o cliente.
- Use asyncRoute para handlers assíncronos. Erros de domínio usam ApiError; errorHandler padroniza respostas sem expor mensagens do ORM.
- Validação ocorre em runtime, além dos tipos TypeScript. Nunca confiar em role, autorId ou vínculo recebidos no body.
- DTOs usam select explícito e não retornam hash, token de sessão ou diagnóstico de banco.
- Sessão opaca em cookie: token original no cookie HttpOnly, hash no banco; CSRF em header nas escritas; origem validada. Não implementar JWT paralelo.
- Imports de Prisma: generated/prisma (caminho relativo adequado), nunca um cliente antigo de node_modules. Build regenera; scripts/check-generated.cjs verifica sincronismo.
- Acesso por vínculo: services/acesso.service.ts fornece consultas de autorização para leitura do aluno e escrita docente. Consulta de docente não autoriza, sozinha, lançamento de nota: carregar atividade, matrícula e período e validar correspondência.
- Listas são paginadas. Contratos existentes: docs/openapi.yaml.
- Domínio acadêmico: domain/academico.ts é a fonte de cálculo. Frequência em aula não é taxa de entrega.
- Edição de nota exige WHERE id + versao esperada, incremento de versão e auditoria na mesma transação. Zero linhas atualizadas deve virar 409, sem sobrescrita.
- Transferência fecha vínculo anterior e abre o novo na mesma transação; não reatribui matrícula histórica.
- Perfil ativo de responsável depende de vínculo validado, com vigência; CPF não concede acesso.
- Desenvolvimento temporário: Supabase compartilhado, com dados fictícios. Cada backend usa server/.env local; nenhum segredo vai ao frontend. Session pooler 5432 pode ser usado em DATABASE_URL e DIRECT_URL no Prisma 5. Consultar docs/SUPABASE_COMPARTILHADO.md.
- Migrações e SQL complementares são versionados. Só o responsável pela base aplica mudanças no Supabase; demais devs abrem PR. Não usar db push ou reset para ajustar banco da equipe.
- Antes de rodar teste de banco, verificar destino local com nome terminado em _test. Não usar .env da equipe.
- Não adicionar criação automática de usuários, senhas padrão ou seed com dados reais.

Funcionalidades acadêmicas ainda sem endpoint devem seguir o guia de repasse; existir no schema não equivale a serviço implementado.
