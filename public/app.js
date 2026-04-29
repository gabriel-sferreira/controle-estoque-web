const API = 'http://localhost:3000';

async function carregarProdutos() {
    const res = await fetch(`${API}/produtos`);
    const produtos = await res.json();
    const tbody = document.getElementById('tabela-body');
    tbody.innerHTML = '';

    produtos.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>${p.quantidade}</td>
                <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
                <td>
                    <button class="btn-editar" onclick="editarProduto(${p.id}, '${p.nome}', ${p.quantidade}, ${p.preco})">✏️ Editar</button>
                    <button class="btn-deletar" onclick="deletarProduto(${p.id})">🗑️ Deletar</button>
                </td>
            </tr>
        `;
    });
}

async function salvarProduto() {
    const id = document.getElementById('produto-id').value;
    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const preco = document.getElementById('preco').value;

    if (!nome || !quantidade || !preco) {
        alert('Preencha todos os campos!');
        return;
    }

    if (id) {
        await fetch(`${API}/produtos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, quantidade, preco })
        });
    } else {
        await fetch(`${API}/produtos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, quantidade, preco })
        });
    }

    cancelarEdicao();
    carregarProdutos();
}

function editarProduto(id, nome, quantidade, preco) {
    document.getElementById('produto-id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('quantidade').value = quantidade;
    document.getElementById('preco').value = preco;
    document.getElementById('form-titulo').textContent = '✏️ Editar Produto';
}

async function deletarProduto(id) {
    if (confirm('Deseja deletar este produto?')) {
        await fetch(`${API}/produtos/${id}`, { method: 'DELETE' });
        carregarProdutos();
    }
}

function cancelarEdicao() {
    document.getElementById('produto-id').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('form-titulo').textContent = 'Cadastrar Produto';
}

carregarProdutos();