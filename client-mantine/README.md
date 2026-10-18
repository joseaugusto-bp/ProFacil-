# Profácil — frontend

Leia ../README.md e ../docs/GUIA_PARA_OS_DEVS.md antes de começar.
Stack e versões: package.json e package-lock.json. Interface em React/Mantine; não usa Tailwind.

Com Node 24: npm ci; npm run dev.
Abra http://localhost:5173 e mantenha a API em 127.0.0.1:3000. O proxy /api é configurado em vite.config.ts.

Login exige usuário provisionado na API. Não há login fictício nem senha padrão.
A coordenação possui cadastro/listagem reais em /coordenador/alunos, com paginação, carregamento, vazio, validação, duplicidade e erro. O cadastro não cria matrícula nem vínculo de responsável automaticamente. O dashboard de indicadores continua demonstrativo; os outros perfis têm área autenticada de desenvolvimento. Login, sessão e logout são reais para os quatro perfis.

Verificações: npm run lint e npm run build.
Padrões de componentes, API, sessão, responsividade e acessibilidade: GUIDELINES_FRONTEND.md.

## Recorte e acesso local
Recorte da entrega do 6º período — Fase 02: login, sessão, logout dos quatro perfis e cadastro/listagem de alunos pela coordenação, com persistência, validações e permissões. O dashboard acadêmico permanece demonstrativo; turmas, vínculos acadêmicos, notas, frequência, boletim e indicadores reais são etapas futuras.
Em desenvolvimento, quando FRONTEND_ORIGIN é uma origem HTTP local, localhost e 127.0.0.1 são aceitos na mesma porta configurada (5173 neste ambiente). Outras portas e domínios não são liberados automaticamente. Em produção, somente a origem HTTPS configurada é aceita.
O login usa tema escuro fixo, logo oficial transparente e arte CSS. O painel acompanha a alternância claro/escuro.
