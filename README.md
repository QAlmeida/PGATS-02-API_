# API de Transferências

Esta API permite registro, login, consulta de usuários e transferências de valores entre usuários, com regras de negócio para aprendizado de testes e automação de APIs.

## Tecnologias
- Node.js
- Express
- Swagger (documentação)

## Instalação

1. Clone o repositório:
   ```sh
   git clone <repo-url>
   cd PGATS-02-API
   ```
2. Instale as dependências:
   ```sh
   npm install express swagger-ui-express
   ```

## Como rodar

- Para rodar o servidor:
  ```sh
  node server.js
  ```
- A API estará disponível em `http://localhost:3000`
- A documentação Swagger estará em `http://localhost:3000/api-docs`

## Endpoints

- `POST /register` — Registro de usuário
- `POST /login` — Login de usuário
- `GET /users` — Listar usuários
- `POST /transfer` — Transferência de valores

## Regras de Negócio
- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.
- Banco de dados em memória (os dados são perdidos ao reiniciar o servidor).

## Estrutura de Diretórios
- `controller/` — Lógica dos endpoints
- `service/` — Regras de negócio
- `model/` — Dados em memória
- `app.js` — Configuração do Express
- `server.js` — Inicialização do servidor
- `swagger.json` — Documentação da API

## Testes
A API foi estruturada para facilitar testes automatizados (ex: com Supertest), importando o `app.js` sem iniciar o servidor.
