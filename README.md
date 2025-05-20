# Simple TaskList API

API simples de uma aplicação de task list. Meu intuito na criação desse projeto foi para botar em prática tudo o que havia aprendido na época, principalmente princípios da arquitetura de software imprescindíveis para criação de sistemas robustos.

O usuário pode criar sua conta, se autenticar - utilizei a estratégia de autenticação via JWT - e fazer todo o CRUD das tarefas.

## Tecnologias utilizadas:

- Typescript;
- Node.js;
- Fastify;
- MongoDB;
- Mongoose;
- Bcryptjs;
- Zod;
- Nodemailer;
- Bull;
- Vitest.

## Princípios aplicados:

- S.O.L.I.D.;
- T.D.D.;
- Clean Code;
- Clean Architecture;
- In-Memory Repository;
- Background Jobs - Para envio de e-mail assíncrono.

## Requisitos funcionais

- [x] Deve ser possível cadastrar um usuário;
- [x] Deve ser possível se autenticar;
- [x] O usuário deve poder criar uma nova tarefa;
- [x] O usuário deve poder listar suas tarefas;
- [x] O usuário deve poder obter uma tarefa;
- [x] O usuário deve poder atualizar uma tarefa;
- [x] O usuário deve poder deletar uma tarefa;
- [x] O usuário deve poder marcar e desmarcar uma tarefa como concluída.

## Regras de negócio

- [x] Não deve ser possível cadastrar um usuário com e-mail duplicado.

## Requisitos não funcionais

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estarem persistidos em um banco de dados MongoDB;
- [x] A listagem de tarefas precisa estar paginada com 20 itens por página;
- [x] O usuário deve ser identificado por um token JWT.
