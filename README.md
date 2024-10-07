# lojasrefrigas

Descrição Geral
Este documento HTML é uma página de catálogo para uma loja virtual chamada "Lojas Refrigas". A página exibe uma lista de produtos, permite o cadastro de novos produtos e a edição de produtos existentes. Ela utiliza Bootstrap para ícones e possui funcionalidades de interação com JavaScript.

Estrutura do Documento
1. Cabeçalho (<head>)
Meta Tags:

charset="UTF-8": Define a codificação de caracteres da página.
viewport: Permite que a página seja responsiva em diferentes dispositivos.
Título: "Lojas Refrigas".

Links:

Bootstrap Icons: Para ícones utilizados na interface.
style.css: Para estilos personalizados da página.
2. Corpo (<body>)
2.1 Cabeçalho (<header>)
Contém:
Imagens de logotipo da loja.
Ícones de carrinho de compras e login, que redirecionam para as páginas correspondentes (carrinho.html e logar.html).
2.2 Cadastro de Produto
Uma seção oculta (<div id="cadastrar_produto">) que contém:
Campos para inserir o nome, preço e imagem do produto.
Um botão que chama a função cadastrarProduto para adicionar um novo produto.
2.3 Catálogo de Produtos (<main>)
A seção de produtos (<section id="produtos_catalogo">) contém vários itens, cada um com:
Imagem do produto.
Nome e preço do produto.
Botões para comprar o produto (chama addToCart com o nome e preço do produto) e para adicionar aos favoritos (um ícone de coração).
2.4 Edição de Produto
Uma seção oculta (<div id="editar_produto">) que permite a edição de produtos:
Campos para editar título, preço e imagem do produto selecionado.
Um botão que chama a função atualizarProduto para aplicar as alterações.
3. Scripts
Um script (index.js) que contém as funcionalidades JavaScript, como as funções para cadastrar e atualizar produtos.
Funcionalidades
Visualização de Produtos: Exibe uma lista de produtos com suas informações e opções de compra.
Cadastro de Produtos: Permite adicionar novos produtos através de um formulário.
Edição de Produtos: Possibilita atualizar os detalhes de um produto existente.
Adicionar ao Carrinho: Função para adicionar produtos selecionados ao carrinho de compras.
Interface Responsiva: Utiliza Bootstrap para garantir que a página funcione em diferentes dispositivos.
Instruções de Uso
Acessando a Página:

Abra o arquivo HTML em um navegador web.
Visualizando Produtos:

Os produtos serão listados automaticamente no catálogo.
Adicionando Produtos ao Carrinho:

Clique no botão "Comprar" ao lado do produto desejado.
Cadastrando Novos Produtos:

Para adicionar um produto, preencha os campos do formulário na seção "Cadastrar Produto" e clique no botão "Inserir".
Editando Produtos:

Para editar um produto, você deve implementar um método para exibir os detalhes do produto selecionado na seção de edição. Após fazer as alterações, clique em "Atualizar".

Descrição Geral
Este código JavaScript implementa funcionalidades para gerenciar um carrinho de compras, bem como cadastrar, listar e editar produtos em uma loja virtual. O código interage com o armazenamento local (Local Storage) do navegador e com uma API backend para gerenciar os produtos.

Estrutura do Código
1. Adicionar Produto ao Carrinho
javascript

function addToCart(nomeProduto, preco) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let produto = carrinho.find(item => item.nome === nomeProduto);
    
    if (produto) {
        produto.qtd++;
    } else {
        carrinho.push({nome: nomeProduto, preco: preco, qtd: 1});
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}
Descrição: Adiciona um produto ao carrinho de compras. Se o produto já existir, aumenta a quantidade.
Parâmetros:
nomeProduto: Nome do produto a ser adicionado.
preco: Preço do produto.
2. Carregar Carrinho
javascript

function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let itensCarrinho = document.querySelector("#itensCarrinho");
    let valorTotal = 0;
    itensCarrinho.innerHTML = '';

    carrinho.forEach(element => {
        let itemProduto = document.createElement('div');
        itemProduto.textContent = `${element.nome} - ${element.qtd} x R$ ${element.preco}`;
        itensCarrinho.appendChild(itemProduto);
        valorTotal += (element.qtd * element.preco);
    });
    
    document.querySelector("#valorTotal").textContent = valorTotal;
}
Descrição: Carrega os itens do carrinho e exibe suas informações na interface do usuário.
Objetos Manipulados:
Atualiza o DOM para mostrar a lista de produtos e o valor total.
3. Limpar Carrinho
javascript

function limparCarrinho() {
    localStorage.removeItem("carrinho");
    localStorage.clear();
}
Descrição: Remove todos os itens do carrinho do Local Storage.
4. Cadastrar Produto
javascript

async function cadastrarProduto(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const price = Number(document.getElementById('price').value);
    const file = document.getElementById('file').files[0];

    let formData = new FormData();
    formData.append('nome', title);
    formData.append('preco', price);
    formData.append('file', file);

    const response = await fetch('http://localhost:3000/produtos/cadastrar', {
        method: "POST",
        body: formData
    });

    const results = await response.json();

    if (results.sucess) {
        alert(results.message);
    } else {
        console.log(results.data);
        alert(results.message);
    }
}
Descrição: Envia uma solicitação para cadastrar um novo produto no servidor.
Parâmetros: Nenhum diretamente; usa valores de input do formulário.
5. Listar Produtos
javascript
async function listarProdutos() {
    const response = await fetch('http://localhost:3000/produtos/listar', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const results = await response.json();

    if (results.sucess) {
        let productData = results.data;
        const images = 'http://localhost:3000/uploads/';
        let html = document.getElementById('produtos_catalogo');

        productData.forEach(product => {
            let card = `
          <div class="produto">
              <img src="${images + product.image}" alt="">
              <h3>${product.Nome}</h3>
              <p>R$ ${product.Preco}</p>
              <button class="button" id="button" onclick="addToCart('${product.Nome}', ${product.Preco})">Comprar</button>
              <button class="bi bi-heart" class="button" id="button"></button>
              <button onclick='formEditarProduto(${JSON.stringify(product)})'>Editar</button>
          </div>
          `;
            html.innerHTML += card;
        });
    } else {
        alert(results.message);
    }
}
Descrição: Recupera e exibe a lista de produtos disponíveis do servidor.
6. Editar Produto
a. Exibir Formulário de Edição
javascript

function formEditarProduto(product) {
    console.log(product);
    let modal = document.getElementById('editar_produto');
    let images = 'http://localhost:3000/uploads/';

    document.getElementById('id_produto').value = product.ProdutoID;
    document.getElementById('editar_titulo').value = product.Nome;
    document.getElementById('editar_preco').value = product.Preco;
    document.getElementById('imagem_produto').src = images + product.image;

    modal.style.display = "block";
}
Descrição: Preenche o formulário de edição com os dados do produto selecionado e exibe o modal de edição.
b. Atualizar Produto
javascript

async function atualizarProduto(event) {
    event.preventDefault();

    let id = document.getElementById('id_produto').value;
    let titulo = document.getElementById('editar_titulo').value;
    let preco = document.getElementById('editar_preco').value;
    let file = document.getElementById('editar_imagem').files[0];

    let formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('preco', preco);
    formData.append('file', file);

    const response = await fetch(`http://localhost:3000/produtos/editar/${id}`, {
        method: "PUT",
        body: formData
    });

    const results = await response.json();
    console.log(results);

    if (results.sucess) {
        alert(results.message);
    } else {
        console.log(results.data);
        alert(results.message);
    }
}
Descrição: Envia uma solicitação para atualizar as informações de um produto existente no servidor.
7. Carregar Produtos ao Carregar a Página
javascript

window.addEventListener("load", () => {
    listarProdutos();
    // (código omitido para verificação de perfil de usuário)
});
Descrição: Quando a página é carregada, a função listarProdutos é chamada para exibir os produtos disponíveis.
Instruções de Uso
Adicionar Produto ao Carrinho:

Clique no botão "Comprar" ao lado do produto desejado para adicioná-lo ao carrinho.
Carregar Carrinho:

A função carregarCarrinho deve ser chamada na página de carrinho para exibir os itens.
Cadastrar Produto:

Preencha o formulário e clique no botão para cadastrar um novo produto.
Listar Produtos:

A função listarProdutos é chamada automaticamente ao carregar a página, exibindo os produtos.
Editar Produto:

Clique no botão "Editar" ao lado do produto desejado para abrir o formulário de edição.
Atualizar Produto:

Após editar as informações, clique no botão para atualizar o produto.
Limpar Carrinho:

A função limparCarrinho pode ser chamada para remover todos os itens do carrinho.

Descrição Geral
Este documento HTML representa uma página de login para uma aplicação. Os usuários podem inserir suas credenciais (e-mail e senha) para acessar a conta. A página inclui links para voltar à página inicial e para o cadastro de novos usuários.

Estrutura do Documento
1. Cabeçalho (<head>)
Meta Tags:

charset="UTF-8": Define a codificação de caracteres da página.
viewport: Permite que a página seja responsiva em diferentes dispositivos.
Título: "Página de Login".

Link de Estilo:

stylelogar.css: Para estilos personalizados da página.
2. Corpo (<body>)
2.1 Cabeçalho (<header>)
Contém:
Imagens de logotipo e ícone de carrinho da loja.
Um link para retornar à página inicial (index.html).
2.2 Formulário de Login
Uma seção (<div class="logar">) que contém:
Um título "Login".
Um formulário que inclui:
Campo de entrada para e-mail (<input type="email">), obrigatório.
Campo de entrada para senha (<input type="password">), obrigatório.
Um botão de login que chama a função logar(event) ao ser clicado.
Um botão de sair que chama a função sair(event) ao ser clicado.
Um botão de cadastro que redireciona para a página de cadastro (cadastro.html).
3. Scripts
Um script (logar.js) que contém as funcionalidades JavaScript para gerenciar o login e outras interações na página.
Funcionalidades
Login: Permite que o usuário insira suas credenciais e acesse sua conta.
Voltar à Página Inicial: Um botão que redireciona o usuário para a página inicial da loja.
Cadastro de Novos Usuários: Um botão que leva o usuário à página de cadastro.
Sair: Um botão que pode ser utilizado para efetuar logout (embora a implementação real não esteja incluída neste código).
Instruções de Uso
Acessando a Página:

Abra o arquivo HTML em um navegador web.
Fazendo Login:

Insira seu e-mail e senha nos campos correspondentes.
Clique no botão "Logar" para enviar os dados.
Sair:

Clique no botão "Sair" para efetuar logout (implementação deve ser definida no script logar.js).
Cadastrar Novo Usuário:

Clique no botão "Cadastrar" para ser redirecionado para a página de cadastro.
Voltar à Página Inicial:

Clique no ícone de voltar para retornar à página inicial.

Descrição Geral
Este código JavaScript contém duas funções principais: logar e sair. A função logar autentica um usuário com suas credenciais, enquanto a função sair remove as informações do usuário do armazenamento local e redireciona para a página inicial.

Estrutura do Código
1. Função logar
javascript

async function logar(event) {
    event.preventDefault();

    const email = document.getElementById('logar_email').value;
    const senha = document.getElementById('logar_senha').value;

    const data = { email, senha }

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    let results = await response.json();

    if (results.success) {
        let userData = results.data;

        localStorage.setItem('informacoes', JSON.stringify(userData));

        alert(results.message);

        window.location.href = "./index.html";
    } else {
        alert(results.message);
    }
}
Descrição:

Esta função é chamada quando o usuário tenta fazer login. Ela coleta o e-mail e a senha do usuário, envia uma solicitação ao servidor para autenticar as credenciais e, se bem-sucedido, armazena os dados do usuário no Local Storage e redireciona para a página inicial.
Parâmetros:

event: O evento de clique do botão que chama a função.
Processo:

Previne o comportamento padrão do formulário (recarregar a página).
Coleta os valores de e-mail e senha.
Envia uma solicitação POST ao endpoint de login no servidor com as credenciais.
Recebe a resposta do servidor em formato JSON.
Se a autenticação for bem-sucedida:
Armazena as informações do usuário no Local Storage.
Exibe uma mensagem de sucesso.
Redireciona o usuário para a página inicial (index.html).
Se a autenticação falhar, exibe uma mensagem de erro.
2. Função sair
javascript
function sair(event) {
    localStorage.removeItem('informacoes');
    window.location.href = "index.html";
}
Descrição:

Esta função é chamada quando o usuário clica no botão "Sair". Ela remove as informações do usuário do Local Storage e redireciona para a página inicial.
Parâmetros:

event: O evento de clique do botão que chama a função (não é utilizado diretamente nesta função).
Processo:

Remove as informações do usuário armazenadas no Local Storage.
Redireciona o usuário para a página inicial (index.html).
Instruções de Uso
Login:

A função logar é chamada quando o usuário clica no botão "Logar" na página de login.
O usuário deve inserir seu e-mail e senha, e a função tentará autenticar essas credenciais.
Logout:

A função sair deve ser chamada quando o usuário clica no botão "Sair".
O usuário será deslogado e redirecionado para a página inicial.

Descrição Geral
Este código define um servidor Express para gerenciar usuários e produtos em um sistema. As funcionalidades incluem cadastro, listagem, edição e remoção de usuários e produtos, além de um endpoint para login.

Estrutura do Código
Configurações Iniciais
javascript

const express = require("express");
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Rodando na porta ${port}`));

const connection = require('./db_config');
const upload = require('./multer');
Descrição:
Inicializa o servidor Express e configura o CORS e o suporte a JSON.
Escuta na porta 3000.
Importa configurações de conexão ao banco de dados e middleware para upload de arquivos.
Rotas de Usuários
1. Cadastrar Usuário
javascript

app.post('/usuarios/cadastrar', (request, response) => {
    // ... código ...
});
Descrição: Cadastra um novo usuário no banco de dados.
Parâmetros:
nome: Nome do usuário.
email: Email do usuário.
senha: Senha do usuário.
endereco: Endereço do usuário.
Resposta:
200: Usuário cadastrado com sucesso.
400: Erro ao cadastrar.
2. Listar Usuários
javascript

app.post('/usuarios/listar', (request, response) => {
    // ... código ...
});
Descrição: Lista um usuário com base no email fornecido.
Parâmetros:
email: Email do usuário.
Resposta:
200: Usuário encontrado.
400: Erro ao buscar usuário.
3. Editar Usuário
javascript

app.put('/usuarios/editar/:id', (request, response) => {
    // ... código ...
});
Descrição: Atualiza o nome de um usuário.
Parâmetros:
id: ID do usuário.
name: Novo nome do usuário.
Resposta:
200: Usuário atualizado com sucesso.
400: Erro ao atualizar.
4. Deletar Usuário
javascript

app.delete('/usuarios/deletar/:id', (request, response) => {
    // ... código ...
});
Descrição: Remove um usuário do banco de dados.
Parâmetros:
id: ID do usuário.
Resposta:
200: Usuário deletado com sucesso.
400: Erro ao deletar.
Rotas de Login
5. Login
javascript

app.post('/login', (request, response) => {
    // ... código ...
});
Descrição: Autentica um usuário.
Parâmetros:
email: Email do usuário.
senha: Senha do usuário.
Resposta:
200: Login bem-sucedido.
400: Email não encontrado ou senha incorreta.
Rotas de Produtos
6. Cadastrar Produto
javascript

app.post('/produtos/cadastrar', upload.single('file'), (request, response) => {
    // ... código ...
});
Descrição: Cadastra um novo produto.
Parâmetros:
nome: Nome do produto.
preco: Preço do produto.
file: Imagem do produto.
Resposta:
201: Produto cadastrado com sucesso.
400: Erro ao cadastrar.
7. Editar Produto
javascript

app.put('/produtos/editar/:id', upload.single('file'), (request, response) => {
    // ... código ...
});
Descrição: Atualiza os detalhes de um produto.
Parâmetros:
id: ID do produto.
titulo: Novo nome do produto.
preco: Novo preço do produto.
file: Nova imagem do produto.
Resposta:
200: Produto atualizado com sucesso.
400: Erro ao atualizar.
8. Listar Produtos
javascript

app.get('/produtos/listar', (request, response) => {
    // ... código ...
});
Descrição: Lista todos os produtos no banco de dados.
Resposta:
200: Produtos encontrados.
400: Erro ao buscar produtos.
9. Deletar Produto
javascript

app.delete('/produtos/deletar/:id', (request, response) => {
    // ... código ...
});
Descrição: Remove um produto do banco de dados.
Parâmetros:
id: ID do produto.
Resposta:
200: Produto deletado com sucesso.
400: Erro ao deletar.
Servindo Arquivos Estáticos
javascript

app.use('/uploads', express.static(__dirname + '\\public'));
Descrição: Serve arquivos de imagem da pasta pública.
Instruções de Uso
Inicialização do Servidor:

Certifique-se de que o banco de dados esteja configurado e em execução.
Execute o servidor com node nome_do_arquivo.js.
O servidor ficará disponível na porta 3000.
Interação com a API:

Use ferramentas como Postman ou cURL para enviar requisições HTTP para as rotas definidas.
Certifique-se de enviar o conteúdo correto no corpo das requisições.

Módulo de Upload de Arquivos com Multer
Este módulo configura o middleware multer, que é utilizado para gerenciar o upload de arquivos em aplicações Node.js. Ele permite que arquivos sejam enviados via formulários HTTP, facilitando o armazenamento em disco ou no sistema de arquivos.

Funcionalidades
Configuração de Armazenamento:

O armazenamento dos arquivos é definido por multer.diskStorage, que permite especificar a pasta de destino e o nome do arquivo quando ele é salvo.
Destino do Armazenamento:

Os arquivos serão armazenados na pasta ./src/public do projeto.
Nomeação dos Arquivos:

Os arquivos são renomeados para evitar conflitos e facilitar o gerenciamento. O nome do arquivo será composto pela data atual em milissegundos e pelo nome original do arquivo, com espaços substituídos por sublinhados (_).
O nome do arquivo será no formato: timestamp_nome_original.
Instruções de Uso
Instalação do Multer:

Certifique-se de que o multer está instalado no seu projeto. Caso não esteja, você pode instalá-lo utilizando npm:
bash

npm install multer
Importação do Módulo:

Para utilizar o módulo de upload em seu aplicativo, importe-o onde necessário:
javascript

const upload = require('./caminho/para/o/modulo'); // ajuste o caminho conforme necessário
Uso em Rotas:

Você pode usar o middleware upload em rotas que necessitam de upload de arquivos. Por exemplo:
javascript

const express = require('express');
const upload = require('./caminho/para/o/modulo'); // ajuste o caminho conforme necessário
const router = express.Router();

// Rota para upload de um único arquivo
router.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json({
        message: "Arquivo enviado com sucesso!",
        filename: req.file.filename
    });
});

module.exports = router;
Considerações Finais
Validação: É importante adicionar validações para garantir que apenas arquivos permitidos sejam enviados (por exemplo, tipos de arquivo ou tamanhos).
Segurança: Considere implementar medidas de segurança para evitar a execução de códigos maliciosos através do upload de arquivos.
Estrutura do Código
javascript
const multer = require('multer'); // Importa o multer

// Configuração do armazenamento do multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./src/public"); // Define o destino dos arquivos
    },
    filename: function(req, file, cb) {
        let nome_sem_espacos = file.originalname.trim(); // Remove espaços em branco
        let nome_array = nome_sem_espacos.split(' '); // Divide o nome em partes
        let nome_com_underline = nome_array.join('_'); // Une as partes com underscore
        return cb(null, `${Date.now()}_${nome_com_underline}`); // Define o novo nome do arquivo
    }
});

// Cria o middleware de upload com a configuração de armazenamento
let upload = multer({ storage });

// Exporta o middleware para uso em outras partes da aplicação
module.exports = upload;
