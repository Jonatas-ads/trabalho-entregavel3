const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // Porta onde o servidor vai rodar

// Middlewares para o Express entender JSON e dados de formulários HTML
app.use(express.json()); //
app.use(express.urlencoded({ extended: true }));

// Configura para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// ==================== ROTA GET ====================
app.get('/api/mensagem', (req, res) => {
    res.send('Requisição GET bem-sucedida! Servidor ativo.');
});

// ==================== 4 ROTAS POST (PARA TESTAR NO POSTMAN) ====================

// POST 1: Exemplo padrão do material
app.post('/api/post-example', (req, res) => {
    const data = req.body; //[cite: 4]
    console.log('Dados recebidos (POST 1):', data);
    res.send('Requisição POST bem-sucedida!'); //[cite: 4]
});

// POST 2: Rota para cadastro de usuário
app.post('/api/usuario', (req, res) => {
    const { nome, cargo } = req.body;
    console.log(`Usuário recebido (POST 2): ${nome}, ${cargo}`);
    res.json({ status: 'Sucesso', mensagem: `Usuário ${nome} cadastrado!` });
});

// POST 3: Rota para envio de feedback
app.post('/api/feedback', (req, res) => {
    const { comentario } = req.body;
    console.log('Feedback recebido (POST 3):', comentario);
    res.status(201).json({ status: 'Criado', texto: comentario });
});

// POST 4: Rota para cálculo simples
app.post('/api/calcular', (req, res) => {
    const { n1, n2 } = req.body;
    const resultado = Number(n1) + Number(n2);
    console.log(`Cálculo (POST 4): ${n1} + ${n2} = ${resultado}`);
    res.json({ soma: resultado });
});

// Inicializando o servidor ouvindo na porta 3000[cite: 3]
app.listen(port, () => {
    console.log(`Servidor Express está rodando na porta ${port}`); //[cite: 3]
});