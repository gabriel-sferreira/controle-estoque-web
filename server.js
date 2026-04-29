const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
    host: 'localhost',
    port: 5433,
    database: 'cadastro_db',
    user: 'postgres',
    password: '123456'
});

// Criar tabela
async function criarTabela() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS produtos (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            quantidade INTEGER NOT NULL,
            preco DECIMAL(10,2) NOT NULL
        )
    `);
    console.log('✅ Tabela produtos pronta!');
}

// Rotas
app.get('/produtos', async (req, res) => {
    const result = await pool.query('SELECT * FROM produtos ORDER BY id');
    res.json(result.rows);
});

app.post('/produtos', async (req, res) => {
    const { nome, quantidade, preco } = req.body;
    const result = await pool.query(
        'INSERT INTO produtos (nome, quantidade, preco) VALUES ($1, $2, $3) RETURNING *',
        [nome, quantidade, preco]
    );
    res.json(result.rows[0]);
});

app.put('/produtos/:id', async (req, res) => {
    const { nome, quantidade, preco } = req.body;
    const result = await pool.query(
        'UPDATE produtos SET nome=$1, quantidade=$2, preco=$3 WHERE id=$4 RETURNING *',
        [nome, quantidade, preco, req.params.id]
    );
    res.json(result.rows[0]);
});

app.delete('/produtos/:id', async (req, res) => {
    await pool.query('DELETE FROM produtos WHERE id=$1', [req.params.id]);
    res.json({ message: 'Produto deletado!' });
});

criarTabela().then(() => {
    app.listen(3000, () => console.log('🚀 Servidor rodando em http://localhost:3000'));
});