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
- Login mantém a identidade visual do protótipo; vídeo somente em desktop sem preferência de movimento reduzido.
- Antes do PR: npm run lint, npm run build e revisão dos fluxos nos tamanhos de referência.

Perfis de aluno, professor e responsável atualmente têm apenas área autenticada de desenvolvimento. Não declarar esses fluxos como prontos.
