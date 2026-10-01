# 📘 Diretrizes do Projeto (Profácil)

Este documento centraliza as regras de arquitetura, padrões de código e fluxo de trabalho para que toda a equipe desenvolva no mesmo ritmo e evite conflitos de código.

---

## 1. Fluxo de Trabalho e Git (Versionamento)
Utilizamos o modelo ágil **Trunk-Based Development**.

### Regras de Branches:
- **`main`**: É a fonte da verdade. **Apenas o Tech Lead (Arquiteto) tem permissão de dar push direto na main**.
- **`feature-XX`**: Os demais desenvolvedores devem criar branches separadas. Use o formato em minúsculas com o nome ou número da tarefa.
  - *Exemplo:* `git checkout -b feature-boletim-aluno`

### Passos para enviar um código (Restante da Equipe):
1. Puxe as atualizações mais recentes: `git pull origin main`
2. Crie a sua branch: `git checkout -b sua-feature`
3. Trabalhe no código e faça commits curtos.
4. Antes de enviar, atualize sua branch com a main:
   - `git pull --rebase origin main`
5. Suba sua branch: `git push origin sua-feature`
6. Abra um **Pull Request (PR)** para a `main`.

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
