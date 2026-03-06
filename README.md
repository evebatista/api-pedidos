# API de gerenciamento de pedidos

API simples desenvolvida em Node.js para gerenciamento de pedidos.

## Tecnologia
- Node.js
- Express
- JavaScript

## Como executar o projeto

1. Clonar o repositório
git clone https://github.com/evebatista/api-pedidos

2. Instalar dependências
npm install

3. Executar o servidor
node server.js

Servidor rodará em:
http://localhost:3000

## Endpoints

Criar pedido
POST /order

Listar pedidos
GET /order/list

Buscar pedido
GET /order/:id
