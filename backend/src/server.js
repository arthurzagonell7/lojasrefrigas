const express = require("express");
const app = express();
const cors = require('cors')
const port = 3000;

app.use(express.json());
app.use(cors())

app.listen(port, () => console.log(`Rodando na porta ${port}`));

const connection = require('./db_config');
const upload = require('./multer');

app.post('/usuarios/cadastrar', (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.email,
        request.body.senha,
        request.body.endereco,
    );
    let query = "INSERT INTO usuarios(nome,email,senha,endereco) VALUES(?,?,?,?);";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "falha",
                    data: err
                })
        }
    })
})

app.post('/usuarios/listar', (request, response) => {
    let params = Array(
        request.body.email,
        request.body.senha,
        request.body.nome
    );

    const query = "SELECT * FROM usuarios WHERE email = (?);";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    sucess: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "falha",
                    data: err
                })
        }
    })

})

app.put('/usuarios/editar/:id', (request, response) => {
    let params = Array(
        request.body.name,
        request.params.id
    );
    let query = "UPDATE usuarios SET nome = ? WHERE usuarioid = ?";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    sucess: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "falha",
                    data: err
                })
        }
    })

})

app.delete('/usuarios/deletar/:id', (request, response) => {
    let params = Array(
        request.params.id,
    );
    let query = "DELETE FROM usuarios WHERE usuarioid = ?;"

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    sucess: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "falha",
                    data: err
                })
        }
    })

})

app.post('/login', (request, response) => {
    let params = Array(
        request.body.email
    )

    let query = "SELECT usuarioid,nome,email,senha,perfil FROM usuarios WHERE email = ?";

    connection.query(query, params, (err, results) => {
        if (results.length > 0) {
            let senhaDigita = request.body.senha
            let senhaBanco = results[0].senha

            if (senhaBanco === senhaDigita) {
                response
                    .status(200)
                    .json({
                        success: true,
                        message: "Login realizado com sucesso!",
                        data: results[0]
                    })

            } else {
                response
                    .status(400)
                    .json({
                        success: false,
                        message: "Verifique a senha."
                    })

            }
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Email não encontrado"
                })
        }
    })
})



app.post('/produtos/cadastrar', upload.single('file'), (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.preco,
        request.file.filename
    );
    let query = "INSERT INTO produtos(nome,preco,image) VALUES(?,?,?);";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "falha",
                    data: err
                })
        }
    })
})

app.put('/produtos/editar/:id', upload.single('file'), (request, response) => {
    let params = Array(
        request.body.titulo,
        request.body.preco, 
        request.file.filename,
        request.params.id
    )
    let query = `UPDATE produtos SET Nome = ?, Preco = ?, image = ? WHERE ProdutoID = ?`;
    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    sucess: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "falha",
                    data: err
                })
        }
    })

})

app.get('/produtos/listar', (request, response) => {
    let query = "SELECT * FROM produtos";

    connection.query(query, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    sucess: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "falha",
                    data: results
                })
        }
    })

})

app.use('/uploads', express.static(__dirname + '\\public'))

app.delete('/produtos/deletar/:id', (request, response) => {
    let params = Array(
        request.params.id,
    );
    let query = "DELETE FROM produtos WHERE produtoid = ?;"

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    sucess: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "falha",
                    data: err
                })
        }
    })

})