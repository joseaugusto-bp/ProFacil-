# 🎨 Diretrizes de Desenvolvimento Frontend

Este documento serve como guia para manter o padrão e a organização do código no lado do cliente (React). Se você for utilizar alguma IA para auxiliar na codificação, certifique-se de instruí-la a seguir estas mesmas regras para não quebrar a arquitetura do projeto.

## 🛠️ Nosso Stack Técnico
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Roteamento:** `react-router-dom` v6+
- **Biblioteca de UI:** Mantine UI (v7)
- **Ícones:** `@tabler/icons-react`
- **Gráficos:** `@mantine/charts` e `recharts`

## 📂 Arquitetura de Pastas
O código-fonte dentro de `src/` está organizado da seguinte forma:
- `/components`: **Exclusivo para componentes visuais reaproveitáveis** (ex: botões customizados, cards de métricas, tabelas genéricas). Não coloque lógica de rotas aqui.
- `/pages`: **Exclusivo para as telas completas do sistema**. Cada tela deve ser uma junção dos componentes. Exemplo: `/pages/Coordenador/Dashboard`.
- `/routes`: **Onde definimos as URLs** e qual página será carregada (o arquivo `index.tsx` centraliza isso com o `createBrowserRouter`).
- `/styles`: Tema global e customizações visuais padrão do Mantine.

## 📐 Regras de Ouro de Código
1. **Zero CSS Customizado (Sempre que possível):**
   O Mantine é flexível o suficiente para que não precisemos de arquivos `.css` isolados. Use as propriedades `style` ou as *props* diretas do Mantine (como `p="md"`, `mt="xl"`, `c="brand"`) para espaçamentos e cores.

2. **Proibido Tailwind ou Bootstrap:**
   Nós já usamos o Mantine UI. Misturar outras bibliotecas de CSS vai gerar conflitos, código sujo e quebrar o visual da plataforma.

3. **Design Mobile-First:**
   O layout deve funcionar em celulares. Ao invés de definir larguras fixas (`width: 800px`), utilize os componentes `Grid` ou `SimpleGrid` do Mantine, que se adaptam automaticamente ao tamanho da tela. Exemplo: `<SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>`.

4. **Padronização Visual (SaaS Moderno):**
   - Evite cores extravagantes no fundo. Use tons neutros (branco, cinza claro).
   - Para agrupar informações, utilize o componente `<Paper withBorder shadow="sm" radius="md">`. Isso garante a padronização das "caixinhas" com sombra e bordas delicadas em todo o sistema.
