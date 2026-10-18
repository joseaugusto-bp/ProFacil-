# Profácil — guia de repasse para a próxima entrega do PI
Revisão técnica: 18/10/2026. Objetivo: dividir o desenvolvimento por perfil com uma base e um contrato únicos.

## Recorte da entrega atual
Recorte da entrega do 6º período — Fase 02: login, sessão, logout dos quatro perfis e cadastro/listagem de alunos pela coordenação, com persistência, validações e permissões. O dashboard acadêmico permanece demonstrativo; turmas, vínculos acadêmicos, notas, frequência, boletim e indicadores reais são etapas futuras.
As tarefas por perfil e critérios acadêmicos das seções 5 a 7 são backlog para evolução, salvo o que estiver explicitamente identificado como implementado. Não são exigências adicionais desta Fase 02.

## 1. O que foi corrigido na base

- Cliente Prisma regenerado do schema atual, com geração automática antes do build e verificação de sincronismo.
- Cadastro de aluno cria Usuario + Aluno em transação, papel fixo ALUNO, senha bcrypt e auditoria; valida nome/e-mail/senha e não retorna hash.
- API de alunos exige coordenação e sessão. Listagem paginada integrada à tela /coordenador/alunos, com cadastro real e auditoria pelo endpoint existente.
- Tratamento assíncrono no Express 4, erros padronizados e diagnósticos internos ocultos.
- Login real, sessão opaca no banco, cookie HttpOnly, expiração, revogação/logout, CSRF, origem e limite de tentativas.
- Rotas por perfil. Perfis sem funcionalidades têm tela explícita de desenvolvimento.
- Aluno–responsável N:N com validação/vigência; matrícula e vínculo docente com histórico; disciplina identificada; período avaliativo; aulas/presença separadas de entrega.
- Professor pode ter duas disciplinas na mesma turma.
- Nota única por matrícula/atividade, decimal, intervalo 0–10 e versão; entrega única e identificador de requisição.
- Migração inicial com restrições temporais, integridade acadêmica e proteção de histórico.
- Funções de domínio para médias, frequência, risco e prazo, e serviços reutilizáveis de autorização por vínculo.
- Dashboard demonstrativo coerente, identificado como fictício. Links e botões sem destino deixaram de simular disponibilidade.
- Rolagem, login responsivo, campos rotulados e layout com tema.
- Testes e workflow de CI. Verifique o relatório de validação para distinguir checks executados de configurações apenas preparadas.

## 2. O que NÃO está implementado

Ainda precisam ser desenvolvidos: gestão real de turmas/matrículas/disciplinas/períodos, cadastro de professores/responsáveis, atividades, submissão, notas, presença, boletim e dashboard consultando dados reais. Comunicação, recuperação de senha, exportação e banco de questões também estão pendentes.

Schema, helper ou mock não significa funcionalidade integrada. Não atribuir status “concluído” a uma tela vazia ou endpoint proposto.

## 3. Antes de cada dev começar

1. Líder designa um responsável pela base e um revisor. Essa responsabilidade é adicional à divisão por perfil.
2. Usar temporariamente o Supabase de desenvolvimento compartilhado. Cada dev mantém seu server/.env com a conexão fornecida em canal privado, sem instalar PostgreSQL local. Não compartilhar login pessoal do Supabase nem enviar a conexão ao Git/frontend. Consulte SUPABASE_COMPARTILHADO.md.
3. Cada dev roda instalação, geração do Prisma, testes sem banco e builds. Somente o responsável aplica as migrações; a migração inicial exige destino sem tabelas antigas do Profácil. Testes de banco continuam isolados na CI, nunca no Supabase compartilhado.
4. Receber a conta do próprio perfil por canal privado. O banco compartilhado já tem coordenador e contas fictícias; os devs não executam bootstrap. Somente o responsável provisiona o primeiro coordenador em uma base nova sem essa conta; não há senha padrão.
5. Combinar issues e contratos antes de alterar dados compartilhados.
6. Trabalhar em feature/<issue>-<descricao>; integrar continuamente por PR, não juntar os quatro perfis só no fim.

A migração não foi aplicada ao banco antigo da equipe. Se quiserem preservar os dados existentes, o responsável pela base deve inventariar o schema e preparar conversão específica com backup/restauração. Não executar db push, migrate reset nem “marcar como aplicada” a migração em schema incompatível.

## 4. Contrato existente e pronto para consumo

Contrato detalhado em docs/openapi.yaml. Prefixo: /api.

| Método e rota | Acesso | Uso |
|---|---|---|
| GET /health | Público | Saúde do processo; não atesta conectividade do banco |
| POST /auth/login | Origem configurada | body: email, senha; retorna usuario e csrfToken e define cookie |
| GET /auth/me | Sessão | retorna usuario e csrfToken atualizados |
| POST /auth/logout | Sessão + CSRF | revoga sessão e limpa cookie; 204 |
| GET /alunos?pagina=1&limite=20 | Coordenador | dados e paginacao; limite máximo 100 |
| POST /alunos | Coordenador + CSRF | nome, email, senha; cria usuário de aluno, sem matrícula automática |

Exemplo de cadastro:
```json
{"nome":"Aluno de exemplo","email":"aluno@example.test","senha":"senha-de-teste-longa"}
```

Resposta de criação: {dados: {id, usuario: {id,nome,email,ativo,createdAt}, matriculas: [...]}}.
Erro: {erro: {codigo,mensagem}}. Usar o cliente src/services/api.ts; ele já centraliza cookie, JSON e CSRF.

Não enviar role, usuarioId, autorId ou instituição para tentar atribuir privilégios. IDs de perfil vêm do usuário autenticado e os vínculos são consultados no banco.

## 5. Decisões comuns já definidas para o MVP

- Uma instituição por ambiente; isolamento multi-institucional não está implementado.
- Uma matrícula regular por aluno/ano em cada instante. Transferência encerra uma vigência e cria outra.
- Vínculos usam intervalos [inicio,fim); evento no instante de encerramento não pertence ao vínculo antigo.
- Matrícula e vínculo docente devem cobrir o evento letivo; ano e período precisam corresponder.
- Professor só escreve nos vínculos autorizados e em período aberto. Coordenador não altera notas implicitamente.
- Responsável consulta somente alunos com vínculo validado ativo; conhecer CPF não autoriza.
- Média ponderada por disciplina/período, sem converter pendência em zero. Média da turma é média das médias calculáveis, com cobertura.
- Frequência usa carga das aulas realizadas, excluindo canceladas e fora da matrícula. Entrega mede participação, nunca presença.
- Referência do PI: risco por média < 6 ou frequência < 75; dados insuficientes são explícitos e a correção recalcula/remove motivos.
- Nota pode existir sem entrega online (prova presencial).
- MVP tem uma entrega por matrícula/atividade, sem reenvio. Conclusão recebida pelo servidor até o prazo inclusive.
- Não habilitar anexos enquanto tipo, tamanho, armazenamento privado e autorização de download não estiverem implementados.
- Sessão: 8h absolutas/30min ociosas; cookie HttpOnly, Secure em produção, SameSite Strict; CSRF nas escritas.
- Recuperação, política de aprovação/recuperação definitiva e exceções de reabertura continuam sujeitas à validação institucional.

## 6. Backlog futuro por perfil

### Você — Coordenador
Responsabilidade: administração acadêmica e visão da instituição.

Tarefas em ordem:
- COORD-01: IMPLEMENTADO — /coordenador/alunos consome GET/POST /api/alunos, com formulário, paginação, vazio, carregamento, erro e validação; cadastro e persistência após recarregar verificados no navegador contra o Supabase.
- COORD-02: implementar CRUD controlado de turma, disciplina e período; listar ano/período explicitamente.
- COORD-03: implementar matrícula e transferência transacional preservando histórico.
- COORD-04: vincular professor a turma/disciplina e validar/revogar responsáveis.
- COORD-05: integrar dashboard às agregações reais do domínio, removendo os mocks apenas quando o endpoint estiver validado.

Aceite: criar contexto acadêmico utilizável pelo professor; transferência preserva dados anteriores; não conseguir atribuir dois vínculos regulares sobrepostos; dados demonstrativos claramente separados dos reais.

### Dev — Professor
Responsabilidade: fluxo de avaliação e registro da aprendizagem.

- PROF-01: consultar somente turmas/disciplinas com vínculo vigente.
- PROF-02: criar atividades/avaliações associadas ao vínculo docente e período.
- PROF-03: consultar entregas autorizadas.
- PROF-04: lançar/editar nota com controle de versão e auditoria na mesma transação.
- PROF-05: registrar aulas e presenças, sem usar entrega como presença.

Aceite: professor de uma disciplina não altera outra turma/disciplina; nota inválida e período fechado são recusados; edição concorrente devolve 409; notas alimentam o mesmo boletim usado por aluno e responsável.

### Dev — Aluno
Responsabilidade: acesso às atividades e ao próprio progresso.

- ALUNO-01: consultar atividades aplicáveis à matrícula e detalhes do período.
- ALUNO-02: enviar resposta textual dentro do prazo; repetição da mesma requisição não cria duplicata.
- ALUNO-03: consultar próprias notas/boletim e estado pendente/sem dados.
- ALUNO-04: apresentar confirmação de envio, erros e horário no fuso da instituição.

Aceite: trocar ID não permite acessar colega; prazo usa servidor; ausência de correção não aparece como zero; histórico continua acessível conforme política definida.

### Dev — Responsável
Responsabilidade: acompanhamento dos dependentes autorizados.

- RESP-01: listar apenas vínculos de dependentes ativos e validados.
- RESP-02: escolher dependente e consultar o MESMO boletim/atividades do domínio.
- RESP-03: exibir notas, frequência e pendências em modo de leitura.
- RESP-04: tratar vínculo revogado, ausência de dependentes e tentativa de acesso por ID alheio.

Aceite: um responsável pode ter vários dependentes e um aluno vários responsáveis; revogação afeta a próxima consulta; perfil não lança nota, presença ou entrega pelo aluno.

### Responsável pela base — adicional a um dos integrantes
- BASE-01: revisar contratos de endpoints futuros e PRs de schema.
- BASE-02: criar cadastro de professor/responsável exclusivamente pela coordenação, sem autoatribuição de perfil.
- BASE-03: apoiar períodos/matrículas e criação de fixtures fictícias para o fluxo conjunto.
- BASE-04: manter CI, revisão, migrations e instruções de ambiente.
- BASE-05: validar política de regimento, retenção e recuperação com orientador; registrar decisões.
- BASE-06: testar backup e restauração e documentar procedimento antes de dados reais.

## 7. Endpoints PROPOSTOS — ainda não disponíveis

Estes nomes são um contrato inicial para revisão conjunta. Antes de implementar, promover a rota e seus schemas para OpenAPI.

| Recurso | Rotas propostas | Responsável |
|---|---|---|
| Turmas/disciplinas/períodos | GET/POST /turmas, /disciplinas, /periodos; PATCH /periodos/:id para fechamento autorizado | Coordenador |
| Matrículas | POST /matriculas e POST /matriculas/:id/transferencias | Coordenador |
| Perfis/vínculos | POST /usuarios; POST /vinculos-docentes; POST /vinculos-responsaveis; PATCH para encerrar vigência | Base/Coordenador |
| Contexto docente | GET /professor/turmas | Professor |
| Atividades | GET/POST /atividades; GET /atividades/:id | Professor/Aluno |
| Entrega | POST /atividades/:id/entregas, com requisicaoId no body | Aluno |
| Notas | PUT /atividades/:id/notas/:matriculaId, com valor e versaoEsperada | Professor |
| Aulas/presenças | POST /aulas; PUT /aulas/:id/presencas/:matriculaId | Professor |
| Boletim | GET /alunos/:id/boletim?periodoId=... | Domínio compartilhado |
| Dependentes | GET /responsavel/dependentes | Responsável |
| Indicadores | GET /coordenador/indicadores?turmaId=...&periodoId=... | Coordenador |

Na nota: leitura da versão, comparação no WHERE e incremento devem fazer parte da escrita atômica; não basta ler a versão antes. Para criação, definir versaoEsperada=0; para edição, usar a versão recebida da API. Autor e horário vêm do servidor. Persistir auditoria na mesma transação.

Para entrega: consultar uma requisição anterior do MESMO aluno/atividade antes de repetir; uma requisicaoId de terceiro não pode expor dados. Validar prazo/vínculo na API e não só no botão. Não habilitar reenvio por um upsert silencioso.

Boletim é um serviço comum: criar uma vez e aplicar autorização para aluno, responsável e coordenação. Não implementar três fórmulas diferentes. Leitura por professor precisa validar explicitamente seu vínculo, caso seja adicionada ao contrato.

## 8. Regras de integração e áreas de edição

Cada dev trabalha principalmente em client-mantine/src/pages/<Perfil>, controller/route/service do seu módulo e testes correspondentes.
Arquivos compartilhados (schema.prisma, migrations, app.ts, routes/index.tsx, auth, domain e OpenAPI) exigem alinhamento/revisão, mas não ficam bloqueados para um único integrante.
Não alterar enums/DTOs ou gerar novas tabelas equivalentes sem alinhamento. O Supabase compartilhado é o ambiente temporário de integração: um responsável aplica migrações e combina alterações de dados. Usar registros fictícios identificáveis por dev e evitar editar os dados dos colegas. Preparar um projeto/base separado para demonstração quando possível.
Integração contínua em PRs pequenos; atualizar schema/cliente e usar dados fictícios consistentes.

## 9. Critério de pronto por tarefa de desenvolvimento

- Regra e contrato definidos; estados de erro/vazio/carregamento tratados.
- Backend autentica e autoriza o recurso, inclusive com IDs manipulados.
- Transação/constraints protegem integridade quando necessário.
- Testes de domínio e integração pertinentes aprovados.
- Frontend consome a API real; mock remanescente está identificado.
- Build, lint e CI aprovados; documento e contrato atualizados.
- Revisão de outro integrante.

## 10. Demonstração da Fase 02

Recorte atual: entrar com os quatro perfis; consultar/manter sessão e sair; coordenador cadastra aluno e consulta a lista; recarregar e confirmar persistência; recusar cadastro duplicado/entrada inválida e acesso de outros perfis à API de alunos; demonstrar os bloqueios de origem e CSRF. Apresentar indicadores como dados fictícios. Evidências: 13 testes automatizados e 42 verificações HTTP aprovados, mais cadastro e consulta direta de persistência; ver VALIDACAO_TECNICA.md.

## 11. Demonstração acadêmica futura — fora desta entrega

Coordenador cria/vincula contexto → professor cria avaliação e lança nota → aluno consulta/envia → responsável consulta somente seu dependente → dashboard reflete os mesmos registros.

Testar também: professor alheio recebe 403; responsável sem vínculo recebe 403; envio após prazo é recusado; nota corrigida atualiza risco; transferência preserva histórico; atualização com versão antiga não sobrescreve a nova.

O percurso acadêmico acima orienta uma próxima etapa; não é condição adicional para o recorte implementado desta entrega. Validar o planejamento futuro com o orientador antes de ampliar o escopo.
