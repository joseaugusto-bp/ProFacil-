# 📘 Diretrizes do Projeto (Profácil)

Este documento centraliza as regras de arquitetura, padrões de código e fluxo de trabalho para que toda a equipe desenvolva no mesmo ritmo e evite conflitos de código.

---

## 1. Fluxo de Trabalho e Git (Versionamento)
Como atualmente o desenvolvimento está centralizado, o fluxo é direto na branch principal.

### Regras de Versionamento:
- **`main`**: Todo o trabalho pode ser feito e commitado diretamente na branch `main`.
- Não é necessário criar branches separadas (`feature-XX`) ou abrir Pull Requests no momento.
- Faça commits lógicos e descritivos sempre que terminar uma parte funcional do projeto (ex: `feat: add dashboard coordenador`).

### Passos para enviar um código (Workflow):
1. Adicione os arquivos: `git add .`
2. Crie o commit: `git commit -m "sua mensagem"`
3. Envie para o repositório: `git push origin main`

---

## 2. Frontend (React + Mantine)

### Estrutura de Pastas (`/client-mantine/src`):
- `/components`: Apenas elementos reutilizáveis e visuais (Botões customizados, Cards de estatística, Gráficos).
- `/pages`: Telas completas que juntam vários componentes (Ex: `/pages/Coordenador/Dashboard`).
- `/routes`: Regras de quais URLs abrem quais telas.
- `/styles`: Temas globais (`theme.ts`) e configurações do Mantine.

### Regras Visuais:
- **Responsividade (Mobile-First):** Sempre teste as telas reduzindo o tamanho do navegador. Use o `SimpleGrid` ou `Grid` do Mantine para empilhar componentes no celular automaticamente.
- **Componentes Prontos:** Antes de tentar criar algo do zero (como um Modal ou Input), olhe a documentação oficial do [Mantine](https://mantine.dev/).
- **Aparência Limpa:** Siga a estética *SaaS Moderno* (sombras sutis, cantos levemente arredondados, pouco uso de linhas pretas pesadas).

---

## 3. Backend (Node.js + Prisma)

### Arquitetura (Padrão MSC):
O servidor está estruturado para que regras de banco e interface não se misturem.
- `/routes`: Recebe a chamada da internet (Frontend) e manda para o Controller.
- `/controllers`: Pega os dados que chegaram (`req.body`, `req.params`) e repassa para o Service. Responde com o status correto (ex: `200 OK` ou `400 Error`).
- `/services`: O "Cérebro". Aqui entram as regras de negócio reais (ex: checar se a data da atividade já passou antes de salvar).
- `/prisma`: Onde a modelagem do banco de dados reside (`schema.prisma`). Use apenas o Prisma Client para acessar os dados.

### Banco de Dados (Supabase):
- O banco de dados está centralizado no Supabase (PostgreSQL).
- Todos os devs devem usar o mesmo arquivo `.env` para apontar para a nuvem.
- Se você criar uma nova tabela no `schema.prisma`, **avise a equipe** antes de rodar `npx prisma db push` para que ninguém perca o sincronismo.
