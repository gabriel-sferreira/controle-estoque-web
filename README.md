# 📦 Controle de Estoque Web

Sistema de controle de estoque com interface web moderna.

## 🚀 Tecnologias utilizadas
- Node.js
- Express
- PostgreSQL 15
- Docker
- HTML, CSS e JavaScript

## ⚙️ Funcionalidades
- ✅ Cadastrar produtos
- ✅ Listar produtos em tabela
- ✅ Editar produtos
- ✅ Deletar produtos

## 🐳 Como rodar o banco de dados
```bash
docker run --name postgres-cadastro -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=cadastro_db -p 5433:5432 -d postgres:15
```

## ▶️ Como rodar o projeto
```bash
npm install
node server.js
```

Acesse: http://localhost:3000