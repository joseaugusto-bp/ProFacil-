# ⚙️ Diretrizes de Desenvolvimento Backend

Este documento serve como guia para manter o padrão e a organização do código no servidor (Node.js). Se você for utilizar alguma IA para auxiliar na codificação, certifique-se de instruí-la a seguir estas mesmas regras para não quebrar a arquitetura e a segurança do projeto.

## 🛠️ Nosso Stack Técnico
- **Plataforma:** Node.js com TypeScript
- **Framework Web:** Express
- **Banco de Dados:** PostgreSQL (Hospedado no Supabase)
- **ORM:** Prisma Client (`@prisma/client`)

## 📂 Arquitetura (Padrão MSC)
O backend foi desenhado usando o padrão **Model-Service-Controller** para garantir "Separação de Preocupações" (Separation of Concerns). Todo o código deve respeitar esse fluxo:

1. **Routes (`/routes`):** 
   Recebem as requisições HTTP e apontam exclusivamente para um Controller correspondente. *Proibido ter lógica de negócio aqui.*
2. **Controllers (`/controllers`):** 
   Extraem os dados da requisição (`req.body`, `req.params`), chamam a camada de Service, e formatam a resposta para o usuário final com o Status HTTP correto (ex: `200 OK`, `400 Bad Request`).
3. **Services (`/services`):** 
   O coração do sistema. É aqui que moram as **regras de negócio**. Exemplo: um service checa se o aluno tem permissão para enviar o trabalho ou se a data já passou.
4. **Modelos (`/prisma`):**
   O acesso ao banco de dados é feito estritamente pelo Prisma.

## 📐 Regras de Ouro de Código
1. **O Banco de Dados é a Fonte da Verdade:**
   Qualquer nova tabela ou coluna deve ser declarada no `schema.prisma`. 
   **Importante:** Antes de rodar `npx prisma db push` para subir uma alteração estrutural no Supabase, certifique-se de avisar o resto do time para evitar conflitos de versão.

2. **Segurança e Senhas:**
   O Prisma nunca deve retornar a senha (mesmo criptografada) do usuário para o Frontend nas listagens. Além disso, TODA criação de usuário requer que a senha passe pela biblioteca `bcrypt` no Service antes de ser inserida no banco.

3. **Uso Exclusivo do Prisma:**
   Não utilize bibliotecas SQL secundárias (como `pg` puro) e evite fazer raw queries (`$queryRaw`) a menos que seja uma agregação matemática avançada que o Prisma Client não suporte nativamente.

4. **Retornos Padronizados:**
   Toda requisição deve devolver um objeto JSON claro. Em caso de erro, a estrutura deve conter uma mensagem explicativa para o frontend exibir ao usuário.
   Exemplo de erro: `res.status(400).json({ error: "Data limite da atividade já expirou." })`
