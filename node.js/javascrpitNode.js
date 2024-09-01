const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Adicionar Helmet para melhorar a segurança HTTP
app.use(helmet());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'usuarios'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados.');
});

// Rota de registro
app.post('/register', (req, res) => {
    const { name, telefone, email, password } = req.body;

    // Escapar entradas para evitar SQL Injection
    const escapedName = db.escape(name);
    const escapedTelefone = db.escape(telefone);
    const escapedEmail = db.escape(email);

    // Criptografar a senha
    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = `INSERT INTO usuarios (nome, telefone, email, senha) VALUES (${escapedName}, ${escapedTelefone}, ${escapedEmail}, '${hashedPassword}')`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao registrar usuário.');
            throw err;
        }
        res.send('Registro criado com sucesso!');
    });
});

// Rota de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Escapar entrada para evitar SQL Injection
    const escapedEmail = db.escape(email);

    const sql = `SELECT senha FROM usuarios WHERE email = ${escapedEmail}`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao fazer login.');
            throw err;
        }

        if (result.length > 0) {
            const hashedPassword = result[0].senha;

            // Verificar a senha
            if (bcrypt.compareSync(password, hashedPassword)) {
                res.send('Login realizado com sucesso!');
            } else {
                res.status(401).send('Senha incorreta.');
            }
        } else {
            res.status(404).send('Usuário não encontrado.');
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

// npm init -y
// npm install express mysql bcryptjs body-parser
