# Validação da base compartilhada — 15/10/2026

## Resultado
Backend e frontend compilados. Prisma Client regenerado e conferido contra o schema. Migração aplicada com sucesso a PostgreSQL 18 temporário. Doze testes passaram, sem falhas e sem testes pulados na rodada final.

## Verificações executadas
- Prisma format/validate e geração a partir do schema atualizado.
- Backend: npm test, incluindo prebuild (geração), comparação do schema gerado e TypeScript.
- Frontend: npm run lint com --deny-warnings e npm run build; sem avisos de lint ou de tamanho de chunk na rodada final.
- Git diff --check sem erros de whitespace.
- OpenAPI: YAML parseado, cinco paths e 31 referências internas resolvidas. Isso não equivale a uma certificação completa de conformidade OpenAPI.
- Workflow de CI: YAML parseado; execução remota ainda não ocorreu.

## Cobertura dos testes
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

## Isolamento
As URLs de teste foram definidas explicitamente para PostgreSQL local em porta temporária e bancos com sufixo _test. As migrações e fixtures não foram aplicadas ao banco indicado no .env original.
As instâncias temporárias de PostgreSQL e os servidores de QA foram encerrados. Os arquivos .env existentes foram preservados.

## Limitações
A conferência visual pelo navegador de automação não foi concluída: localhost expirou apesar da inicialização dos processos. Não há aprovação visual de responsividade, contraste ou navegação ponta a ponta no navegador.
Os testes existentes não constituem auditoria de segurança completa ou teste de carga. Uploads, comunicação, exportação e os fluxos acadêmicos ainda sem endpoint não estão validados como funcionalidades.
A migração inicial é para banco vazio; não é conversão automática de schema legado. O fluxo para preservar dados da equipe precisa ser planejado após inspeção daquele banco.
A CI foi adicionada ao repositório, mas não enviada nem executada remotamente. Nenhum commit ou push foi feito.

## Próximas verificações da equipe
1. Configurar o Supabase compartilhado de desenvolvimento conforme SUPABASE_COMPARTILHADO.md e README. Os testes descritos neste relatório continuam referentes ao PostgreSQL local temporário; a conexão real do Supabase ainda precisa de verificação.
2. Fazer a rodada visual em 360, 768 e 1280 pixels, teclado e temas.
3. Implementar as tarefas por perfil do GUIA_PARA_OS_DEVS.md e integrar progressivamente.
4. Validar backup/restauração e regimento antes de uso real.
