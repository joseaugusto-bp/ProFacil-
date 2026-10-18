# Frontend — regras de contribuição

React + TypeScript + Vite + Mantine e React Router, nas versões do package.json/lockfile. Não usar Tailwind ou Bootstrap.

- components: elementos reutilizáveis; pages: telas; routes: rotas; services: HTTP; auth: sessão e contexto.
- src/services/api.ts é o cliente HTTP comum. Usar /api relativo, credentials e CSRF já centralizados. Não guardar token de autenticação em localStorage.
- AuthProvider consulta a sessão no servidor; RequireRole protege a navegação. O backend continua responsável por autorização sobre cada recurso.
- Cada perfil cria telas em pages/<Perfil> e propõe mudanças de rotas em PR pequeno; não duplicar layout ou sessão.
- Tipar DTOs conforme docs/openapi.yaml. Endpoints ainda planejados estão no guia de repasse.
- Componentes podem usar CSS responsivo/semântico quando necessário; priorizar Mantine e tokens do tema. HTML semântico é permitido.
- Suportar rolagem, teclado, foco, rótulos, erros associados, tema claro/escuro e largura de 360px. Não ocultar overflow global para mascarar layout.
- Sempre ter estados de carregamento, vazio e erro. Botões sem implementação devem estar indisponíveis ou identificados.
- Fixtures ficam em data/demo.ts e devem estar claramente identificadas. Não apresentar números simulados como resultados reais.
- Fórmulas reais pertencem ao backend. O frontend formata e apresenta indicadores, período, cobertura e motivos.
- Login atual: logo oficial transparente em public/logo-profacil.png, arte CSS e tema escuro fixo, sem vídeo. O painel oferece alternância claro/escuro. Respeitar prefers-reduced-motion nas animações; requisitos de acessibilidade e responsividade precisam de verificação própria.
- Antes do PR: npm run lint, npm run build e revisão dos fluxos nos tamanhos de referência.

Recorte da entrega do 6º período — Fase 02: login, sessão, logout dos quatro perfis e cadastro/listagem de alunos pela coordenação, com persistência, validações e permissões. O dashboard acadêmico permanece demonstrativo; turmas, vínculos acadêmicos, notas, frequência, boletim e indicadores reais são etapas futuras.

Perfis de aluno, professor e responsável atualmente têm apenas área autenticada de desenvolvimento. Não declarar esses fluxos acadêmicos como prontos. A tela /coordenador/alunos consome os endpoints reais; não substituir seus dados por fixtures.
