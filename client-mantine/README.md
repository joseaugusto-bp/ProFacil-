# Profácil — frontend

Leia ../README.md e ../docs/GUIA_PARA_OS_DEVS.md antes de começar.
Stack e versões: package.json e package-lock.json. Interface em React/Mantine; não usa Tailwind.

Com Node 24: npm ci; npm run dev.
Abra http://localhost:5173 e mantenha a API em 127.0.0.1:3000. O proxy /api é configurado em vite.config.ts.

Login exige usuário provisionado na API. Não há login fictício nem senha padrão.
Coordenador possui painel demonstrativo; os outros perfis têm área autenticada de desenvolvimento. As tarefas de integração estão no guia.

Verificações: npm run lint e npm run build.
Padrões de componentes, API, sessão, responsividade e acessibilidade: GUIDELINES_FRONTEND.md.
