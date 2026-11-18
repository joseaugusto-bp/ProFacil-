# ProFácil — equipe, entrega final e fluxo Git

Planejamento preparado em 18/10/2026. Enunciado informado: envio de 02/11 a 08/11, até 23:59; apresentações entre 16 e 19/11. Confirmar no AVA o horário específico do grupo. Um integrante envia o PDF; guardar comprovante. O envio é condição para apresentar, mesmo sem pontuação direta.

Estado atual: a equipe está entregando a Fase 02. O planejamento de novembro abaixo é para a entrega final seguinte. Feedbacks da Fase 02 estão aguardando avaliação do professor; não são uma pendência para enviar a fase atual.

## 1. O que entregar

Documento de Especificação no template oficial, revisado segundo os feedbacks da Fase 02, coerente com o sistema que a banca verá. Links de repositório e materiais destinados à banca precisam funcionar sem login. Não tornar públicas senhas, contas de teste ou conexão PostgreSQL.

Recorte técnico atual: login, sessão e logout dos quatro perfis; cadastro/listagem de alunos pela coordenação; validações, permissões e persistência. O dashboard acadêmico é demonstrativo. Turmas, avaliações, notas, frequência, boletim, mensagens e indicadores reais ficam no backlog; o enunciado de envio final, por si só, não exige concluir todo esse backlog. Feedback específico do professor pode alterar as prioridades e ainda deve ser registrado.

## 2. Divisão sugerida — confirmar entre os quatro

A distribuição abaixo é uma proposta, não uma atribuição já aceita por cada integrante. Mantém o trabalho por perfil, mas prioriza revisão, demonstração e estabilidade; não exige implementar funcionalidades novas.

| Integrante | Frente principal | Entregas concretas | Revisão por |
|---|---|---|---|
| José Augusto | Coordenação e integração final | Conferir cadastro/listagem, duplicidade e persistência; centralizar feedbacks; revisar PRs; conferir recorte e evidências em 22.1–22.3; organizar PDF final e envio no AVA | Kauan revisa as mudanças de José |
| Kauan Oliveira | Professor e arquitetura | Testar entrada/saída de professor e impedimento de acesso à API de alunos; conferir arquitetura/diagrama da seção 20 contra o código; revisar PRs de José e mudanças compartilhadas | José |
| Luís Miguel | Aluno e interface | Testar entrada, sessão após recarregar, saída e bloqueios do aluno; verificar rótulos, erros, rolagem e telas em 360/768/1280; conferir descrição de frontend em 22.1; capturas com dados fictícios | José |
| Thiago Oliveira | Responsável, persistência e materiais | Testar entrada/saída e bloqueios do responsável; conferir evidência de Usuario/Aluno/Auditoria por leitura, sem segredos; validar links em janela sem login; revisar tecnologias da seção 21 e apoiar histórico/template/PDF | José; Kauan revisa arquitetura quando necessário |

As telas de professor/aluno/responsável continuam provisórias: validar acesso não significa validar fluxo de notas ou dependentes. Não declarar pronto o que só existe no schema. Para o próximo ciclo, cada integrante pode continuar a implementação do perfil, por tarefas e PRs próprios.

José pode coordenar a base, mas só um responsável designado aplica migrações; não executar db push, migrate reset ou testes destrutivos no Supabase compartilhado. Não compartilhar login pessoal do Supabase.

## 3. Catálogo de atividades e aceite

Issues no GitHub são opcionais. Organizar cada tarefa com descrição, responsável, revisor e evidência esperada; esses dados podem ficar no PR e neste quadro. FINAL-01 a FINAL-08 são apenas códigos internos de planejamento, não números obrigatórios de issue.

| Código | Atividade | Aceite |
|---|---|---|
| FINAL-01 | Registrar feedbacks da Fase 02 | Aguardando avaliação da Fase 02. Quando recebidos, registrar cada feedback com ação, responsável e estado |
| FINAL-02 | Regressão de login/sessão/logout | Quatro perfis verificados; sessão não dá acesso a recursos de outro perfil |
| FINAL-03 | Cadastro e consulta de alunos | Coordenação cadastra e recupera após recarregar; duplicidade e entrada inválida recusadas |
| FINAL-04 | Permissões negativas | Sem sessão: 401; perfil alheio: 403; origem/CSRF inválidos bloqueados |
| FINAL-05 | Documento do 6º período | Partes 00 e 02, seções 20, 21 e 22.1–22.3 coerentes; preservar formatação e seções de outros períodos |
| FINAL-06 | Links e repositório | Material destinado à banca acessível sem autenticação; nenhum segredo público |
| FINAL-07 | PDF e apresentação | Template oficial, figuras legíveis, títulos/sumário conferidos, roteiro compatível com o sistema |
| FINAL-08 | Envio e contingência | Um integrante envia no prazo e compartilha comprovante; PDF final salvo e versão de demonstração identificada |

Sequência sugerida: agora até 01/11, recolher feedbacks e regressões; 02–05/11, revisar documento e PRs; 06/11, congelar versão e ensaiar; 07/11, exportar/conferir e enviar; 08/11, margem para correções. São marcos internos propostos, não prazos adicionais do professor.

## 4. Preparar o computador

Seguir README.md: instalar Node.js 24/npm; configurar server/.env recebido por canal privado; instalar dependências nas duas pastas. A raiz não tem uma instalação Node única.

```sh
cd server
npm ci --ignore-scripts
npm run prisma:validate
npm run prisma:generate
cd ../client-mantine
npm ci
cd ..
```

Antes dos testes/builds, parar a API em seu terminal com Ctrl+C: no Windows ela pode manter a DLL Prisma em uso. Não alterar o banco para resolver falha local de geração. Não definir RUN_DATABASE_TESTS para o Supabase compartilhado.

Ativar a verificação antes do push em CADA clone, a partir da raiz:

```sh
git config --local core.hooksPath .githooks
git config --get core.hooksPath
```

O resultado deve ser .githooks. Esse comando substitui a configuração de hooks desse clone; se já existirem hooks pessoais, combinar a integração antes. Este guia não instala Git hooks nos computadores dos colegas automaticamente.

## 5. Criar e catalogar branches

Todos desenvolvem somente em branches de tarefa, inclusive José. A main local serve para receber atualizações; a main remota recebe mudanças por PR revisado e checks aprovados. Não fazer commits de desenvolvimento nem push direto na main.

Uma branch por tarefa pequena; não uma branch enorme por pessoa ou semestre.

Formato: tipo/perfil-descricao-curta. Não é necessário criar issue nem colocar número na branch. Tipos: feature (funcionalidade), fix (correção), docs (documentação), chore (manutenção). Perfis: coordenador, professor, aluno, responsavel ou compartilhado. Usar minúsculas, hífens e sem acentos/espaços.

Exemplos: fix/aluno-erro-sessao, feature/coordenador-cadastro, docs/revisao-documento e chore/compartilhado-validacao. O perfil pode ser omitido quando o assunto já estiver claro, como docs/revisao-documento.

Antes de trocar de branch, conferir git status. Se houver trabalho local, fazer um commit focado na branch correta ou combinar seu tratamento; não usar reset --hard ou clean para apagar alterações.

```sh
git status
git checkout main
git pull --ff-only origin main
git checkout -b fix/aluno-erro-sessao
```

Se pull --ff-only falhar, a main local divergiu. Parar e pedir revisão ao líder; não resolver com force push. O pull atualiza seu computador; não envia mudanças ao GitHub.

No PR registrar tarefa, responsável, revisor, descrição e evidências. Se a equipe decidir usar issues ou labels depois, elas podem complementar a organização; não são obrigatórias.

## 6. Alterar, conferir e commitar

```sh
git status
git diff
git diff --check
```

Revisar o conteúdo ANTES de adicionar ao índice. Não subir .env, arquivos CONTAS_TESTE*, senhas, node_modules ou dist. .gitignore não remove segredos já versionados nem protege um print com senha; se encontrar segredo no histórico, parar e combinar revogação/limpeza.

Verificações locais, na raiz, com a API parada:

```sh
node scripts/verify-before-push.cjs
```

O script valida Prisma, testa/builda backend e executa lint/build do frontend. Não habilita testes destrutivos de banco e recusa RUN_DATABASE_TESTS ativo para esta rotina. A CI testa banco em PostgreSQL descartável.

Adicionar somente os arquivos da tarefa. Exemplo (substitua pelos caminhos reais):

```sh
git add client-mantine/src/pages/Aluno/index.tsx
git diff --cached
git diff --cached --check
git commit -m "fix(aluno): apresenta erro ao perder a sessão"
```

O caminho do exemplo pode não existir no estágio atual: não crie arquivos só para copiar o comando. Mensagens úteis dizem o que mudou; evitar “arrumei tudo” ou “teste”. Commit salva no computador; ainda não publica.

## 7. Atualizar sua branch com rebase

Rebase reaplica SEUS commits sobre a main atualizada. Usar somente em branch de tarefa sob seu controle. Não fazer rebase da main nem de branch que outro colega está editando.

```sh
git status
git checkout main
git pull --ff-only origin main
git checkout fix/aluno-erro-sessao
git rebase main
```

Substitua fix/aluno-erro-sessao pelo nome real da sua branch. O fluxo é atualizar main, voltar para a branch em desenvolvimento e executar rebase main. --ff-only só permite avançar a main sem criar merge; se os históricos divergirem, o pull para para revisão. Antes de publicar, repita a atualização e execute as verificações.

Iniciar com árvore limpa. Se houver conflito, abrir os arquivos indicados, entender as duas alterações e remover os marcadores de conflito depois de resolver. Não escolher “ours/theirs” sem compreender. Em seguida:

```sh
git add caminho/do/arquivo-resolvido
git rebase --continue
```

Repetir se houver outros conflitos. Para desistir e voltar ao estado anterior ao rebase:

```sh
git rebase --abort
```

Não usar rebase --skip para “sumir com o erro”: ele descarta um commit. Depois do rebase, repetir os testes. Se a branch ainda não foi publicada, push normal. Se já foi publicada e o rebase mudou os commits, combinar com o revisor e usar --force-with-lease SOMENTE na sua branch de tarefa, nunca em main. Não usar --force.

## 8. Push e pull request

```sh
git push -u origin fix/aluno-erro-sessao
```

O hook executa antes do envio: bloqueia destino main, exige árvore limpa e executa as verificações. Se falhar, corrigir, commitar e repetir. Não contornar com --no-verify.

Se o rebase de uma branch já publicada foi combinado:

```sh
git push --force-with-lease origin fix/aluno-erro-sessao
```

No GitHub: Compare & pull request → base main → preencher modelo → solicitar revisão. Vincular issue somente se existir. PR mostra a proposta ANTES de entrar na main. Push para branch de tarefa é necessário para essa revisão remota; o objetivo não é impedir qualquer publicação, mas impedir integração sem validação.

Revisor confere diff, escopo, regras, segredos, resultados da CI e evidências; testa o fluxo quando necessário. O autor corrige na mesma branch e faz novos commits/pushes. Só integrar depois da aprovação e checks backend/frontend aprovados. Alterações de José devem ser revisadas por outro integrante; ele não aprova o próprio PR.

Após o merge, todos atualizam:

```sh
git checkout main
git pull --ff-only origin main
```

## 9. Proteção real no GitHub — configuração pelo administrador

Estado: arquivos/hook locais preparados; a proteção remota AINDA precisa ser ativada e verificada no painel do GitHub. CODEOWNERS e a CI não tornam revisão obrigatória por si sós.

No repositório, Settings → Branches (regra para main) ou Rules → Rulesets, conforme a interface disponível. Aplicar a main e exigir:

- Pull request antes de integrar e pelo menos uma aprovação.
- Pelo menos uma aprovação independente, inclusive para PRs de José. .github/CODEOWNERS indica @joseaugusto-bp para encaminhar revisões. Antes de tornar revisão de code owner obrigatória, adicionar também o usuário GitHub validado de um segundo revisor (por exemplo Kauan), com acesso de escrita; não deixar o líder como único revisor obrigatório de suas próprias mudanças.
- Descartar aprovações antigas quando novos commits mudarem o PR; exigir resolução das conversas.
- Checks obrigatórios da CI: selecionar os nomes backend e frontend efetivamente publicados pelo workflow Validação do PI após uma execução. Não inventar nomes de checks ausentes.
- Branch atualizada com main antes do merge, quando essa opção for adotada.
- Bloquear force push e exclusão de main; aplicar aos administradores e evitar exceções de bypass não justificadas.

Verificar a regra com uma tentativa controlada: push direto em main deve ser recusado; PR sem aprovação/checks não pode integrar. Não considerar proteção ativa apenas porque este guia existe. A disponibilidade depende da visibilidade/plano: GitHub Free permite proteção em repositórios públicos; privados podem exigir plano pago. Não alterar visibilidade sem revisar os materiais e a autorização do dono.

Hooks locais podem ser desativados. A barreira compartilhada é a regra do GitHub. Até ativá-la, combinar que só o líder integra e que ninguém publica diretamente em main; isso é acordo de equipe, não bloqueio técnico remoto.

Referências oficiais:
- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
- https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners

## 10. Checklist do PDF final

Feedbacks tratados; template oficial preservado; escopo do 6º período correto; prints com legenda e sem segredos; diagramas e endpoints coerentes; testes/evidências com data e limites; sumário/paginação conferidos; links públicos testados sem login; PDF aberto após exportar. Um integrante envia e compartilha comprovante antes de 08/11 às 23:59.

As contas e configurações são material PRIVADO. O guia sem credenciais pode estar no Git; o documento com contas deve circular apenas entre os integrantes, por canal privado.
