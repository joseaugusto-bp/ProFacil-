# Validação técnica do Profácil — consolidada em 18/10/2026

## Estado atual
- Recorte: login, sessão e logout dos quatro perfis; cadastro/listagem de alunos da coordenação; validações e permissões. Dashboard acadêmico demonstrativo.
- Última bateria de domínio/HTTP: 13 testes aprovados, zero falhas. A bateria usa dependências isoladas nos testes HTTP; não comprova sozinha persistência remota.
- Conferência com contas fictícias e persistência real: 42 verificações HTTP aprovadas para os quatro perfis, incluindo acesso por papel, ausência de sessão, origem, CSRF, senha incorreta e revogação após logout. As sessões criadas para a conferência foram encerradas.
- Cadastro pela interface, consulta após recarregar e rejeição de e-mail duplicado aprovados. Consulta SQL de leitura confirmou o registro DEV-TESTE Integração Fase 02, relação Usuario/Aluno e um evento ALUNO_CRIADO na auditoria. Não foram consultados senhas, hashes ou tokens nas evidências.
- Frontend: lint/build aprovados na rodada de integração. Backend: compilação TypeScript e cliente gerado conferidos.
- A tentativa inicial de testes HTTP sem permissão de rede foi bloqueada pelo sandbox; repetida com acesso local liberado, a bateria de 13 passou. A mensagem de erro interno durante a suíte é esperada no teste de sanitização de erro 500.
- Commit 1caaaf6 existe e seu push foi confirmado em rodada anterior; isso não significa que as alterações locais posteriores já foram enviadas. Resultado remoto da CI não foi conferido nesta consolidação.
- Não somar 12 testes da rodada histórica, 13 da bateria atual e 42 verificações HTTP como se fossem testes únicos.

## Limites atuais e próximas verificações
A interface foi observada em viewport estreito; falta auditoria completa de acessibilidade, contraste, dispositivos e tamanhos 360/768/1280. Paginação entre múltiplas páginas não exercitada com a massa atual. Não houve teste de carga nem nova execução de testes de banco destrutivos no Supabase compartilhado. Os testes de banco isolado abaixo são evidência histórica, não endpoints acadêmicos disponíveis. Backup/restauração e validação institucional continuam como preparação para uso real.

Os relatórios de conferência e evidências foram gerados fora do repositório. Somente versões sem segredos podem compor a entrega; nunca anexar arquivos de credenciais.

## Histórico — rodada de 15/10/2026
As seções seguintes registram as condições daquela rodada. Referências a conexão pendente, ausência de commit/push e falha de navegação são históricas, supersedidas pelo resumo atual quando aplicável. Não descrevem o estado atual da Fase 02.

### Resultado histórico
Backend e frontend compilados. Prisma Client regenerado e conferido contra o schema. Migração aplicada com sucesso a PostgreSQL 18 temporário. Doze testes passaram, sem falhas e sem testes pulados na rodada final.

### Verificações históricas executadas
- Prisma format/validate e geração a partir do schema atualizado.
- Backend: npm test, incluindo prebuild (geração), comparação do schema gerado e TypeScript.
- Frontend: npm run lint com --deny-warnings e npm run build; sem avisos de lint ou de tamanho de chunk na rodada final.
- Git diff --check sem erros de whitespace.
- OpenAPI: YAML parseado, cinco paths e 31 referências internas resolvidas. Isso não equivale a uma certificação completa de conformidade OpenAPI.
- Workflow de CI: YAML parseado; execução remota ainda não ocorreu.

### Cobertura histórica dos testes
Cinco testes de domínio: média da turma correta, pesos/zero/pendências, frequência por carga, limites/recálculo de risco e prazo inclusivo.
Seis testes HTTP isolados: ausência de sessão, perfil incorreto, erro assíncrono sem vazamento, origem/CSRF, cookie/logout e paginação.
Um cenário integrado com PostgreSQL real verifica, em conjunto:
- cadastro e auditoria, hash e DTO sem senha;
- login HTTP real, cookie/CSRF, criação e listagem de alunos, rejeição de papel enviado no body e logout;
- credenciais inválidas, expiração absoluta e inatividade;
- negação de perfil incompatível;
- vínculo de responsável antes/depois de validação e revogação, e acesso a outro aluno;
- autorização de vínculo docente;
- matrícula sem sobreposição;
- professor com duas disciplinas na mesma turma;
- nota sem entrega online, unicidade, limite 0–10 e período fechado;
- atualização otimista de nota e recusa de versão antiga;
- recusa de encerramento de matrícula que invalidaria histórico.

### Isolamento na rodada histórica
As URLs de teste foram definidas explicitamente para PostgreSQL local em porta temporária e bancos com sufixo _test. As migrações e fixtures não foram aplicadas ao banco indicado no .env original.
As instâncias temporárias de PostgreSQL e os servidores de QA foram encerrados. Os arquivos .env existentes foram preservados.

### Limitações registradas em 15/10
A conferência visual pelo navegador de automação não foi concluída: localhost expirou apesar da inicialização dos processos. Não há aprovação visual de responsividade, contraste ou navegação ponta a ponta no navegador.
Os testes existentes não constituem auditoria de segurança completa ou teste de carga. Uploads, comunicação, exportação e os fluxos acadêmicos ainda sem endpoint não estão validados como funcionalidades.
A migração inicial é para banco vazio; não é conversão automática de schema legado. O fluxo para preservar dados da equipe precisa ser planejado após inspeção daquele banco.
A CI foi adicionada ao repositório, mas não enviada nem executada remotamente. Nenhum commit ou push foi feito.

### Próximas verificações propostas em 15/10 — consultar estado atual acima
1. Configurar o Supabase compartilhado de desenvolvimento conforme SUPABASE_COMPARTILHADO.md e README. Os testes descritos neste relatório continuam referentes ao PostgreSQL local temporário; a conexão real do Supabase ainda precisa de verificação.
2. Fazer a rodada visual em 360, 768 e 1280 pixels, teclado e temas.
3. Implementar as tarefas por perfil do GUIA_PARA_OS_DEVS.md e integrar progressivamente.
4. Validar backup/restauração e regimento antes de uso real.

## Atualização — 18/10/2026: alunos integrados
O relatório anterior descreve a rodada inicial de 15/10. Nesta atualização:
- Nova tela /coordenador/alunos com GET paginado e POST reais, pelo cliente HTTP comum com sessão e CSRF.
- Login do coordenador, criação de aluno fictício pela interface e listagem após recarregar a página verificados no navegador contra o Supabase compartilhado.
- Aluno criado: DEV-TESTE Integração Fase 02, identificável na base; credenciais fora do repositório.
- Lint e build do frontend aprovados. Layout observado em viewport estreito; não equivale a auditoria completa de acessibilidade ou compatibilidade.
- Paginação implementada (20 por página); navegação entre múltiplas páginas não exercitada com a massa pequena atual.
- O dashboard acadêmico continua com fixtures. Cadastro não cria matrícula nem vínculo de responsável automaticamente.
- Esta rodada não executa resets ou testes destrutivos no Supabase; o registro fictício é mantido como evidência da integração.
- Tentativa de cadastrar o mesmo e-mail pela interface foi recusada com mensagem de duplicidade; formulário permaneceu editável, sem criar outro registro.
