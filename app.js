const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middlewares para o Express entender JSON e dados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// ==================== ROTA GET ====================
app.get('/api/mensagem', (req, res) => {
    res.send('Requisição GET bem-sucedida! Servidor ativo.');
});

// ==================== ROTAS POST ====================

// POST 1: Exemplo padrão
app.post('/api/post-example', (req, res) => {
    const data = req.body;
    console.log('Dados recebidos (POST 1):', data);
    res.send('Requisição POST bem-sucedida!');
});

// POST 2: Cadastro de usuário
app.post('/api/usuario', (req, res) => {
    const { nome, cargo } = req.body;
    console.log(`Usuário recebido (POST 2): ${nome}, ${cargo}`);
    res.json({ status: 'Sucesso', mensagem: `Usuário ${nome} cadastrado!` });
});

// POST 3: Feedback
app.post('/api/feedback', (req, res) => {
    const { comentario } = req.body;
    console.log('Feedback recebido (POST 3):', comentario);
    res.status(201).json({ status: 'Criado', texto: comentario });
});

// POST 4: Rota para TODAS as Operações Matemáticas (Soma, Subtração, Multiplicação e Divisão)
app.post('/api/calcular', (req, res) => {
    const { n1, n2, operacao } = req.body;
    
    const num1 = Number(n1);
    const num2 = Number(n2);
    let resultado;

    if (operacao === 'soma' || operacao === '+') {
        resultado = num1 + num2;
    } else if (operacao === 'subtracao' || operacao === '-') {
        resultado = num1 - num2;
    } else if (operacao === 'multiplicacao' || operacao === '*') {
        resultado = num1 * num2;
    } else if (operacao === 'divisao' || operacao === '/') {
        if (num2 === 0) {
            return res.status(400).json({ erro: 'Divisão por zero não é permitida!' });
        }
        resultado = num1 / num2;
    } else {
        return res.status(400).json({ erro: 'Operação inválida. Use: soma, subtracao, multiplicacao ou divisao' });
    }

    console.log(`Cálculo (${operacao}): ${num1} e ${num2} = ${resultado}`);
    res.json({ operacao, n1: num1, n2: num2, resultado });
});

// Inicializando o servidor
app.listen(port, () => {
    console.log(`Servidor Express está rodando na porta ${port}`);
});
