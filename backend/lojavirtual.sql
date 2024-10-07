CREATE DATABASE LojaVirtual;
USE LojaVirtual;


CREATE TABLE Usuarios (
    UsuarioID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Senha VARCHAR(255) NOT NULL,
    Endereco VARCHAR(255),
    DataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP
    perfil enum('admin','usuario')
);
CREATE TABLE Categorias (
    CategoriaID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT
);
CREATE TABLE Produtos (
    ProdutoID INT AUTO_INCREMENT PRIMARY KEY,
    Preco DECIMAL(10, 2) NOT NULL,
    image text,
    CategoriaID INT,
    FOREIGN KEY (CategoriaID) REFERENCES Categorias(CategoriaID)
);
CREATE TABLE Pedidos (
    PedidoID INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioID INT,
    DataPedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Pendente', 'Processando', 'Enviado', 'Concluído', 'Cancelado') DEFAULT 'Pendente',
    Total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);
CREATE TABLE DetalhesPedidos (
    DetalheID INT AUTO_INCREMENT PRIMARY KEY,
    PedidoID INT,
    ProdutoID INT,
    Quantidade INT NOT NULL,
    PrecoUnitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (PedidoID) REFERENCES Pedidos(PedidoID),
    FOREIGN KEY (ProdutoID) REFERENCES Produtos(ProdutoID)
);
CREATE TABLE Avaliacoes (
    AvaliacaoID INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioID INT,
    ProdutoID INT,
    Nota INT CHECK (Nota BETWEEN 1 AND 5),
    Comentario TEXT,
    DataAvaliacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID),
    FOREIGN KEY (ProdutoID) REFERENCES Produtos(ProdutoID)
);
CREATE TABLE Carrinhos (
    CarrinhoID INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioID INT,
    DataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);
CREATE TABLE ItensCarrinho (
    ItemCarrinhoID INT AUTO_INCREMENT PRIMARY KEY,
    CarrinhoID INT,
    ProdutoID INT,
    Quantidade INT NOT NULL,
    FOREIGN KEY (CarrinhoID) REFERENCES Carrinhos(CarrinhoID),
    FOREIGN KEY (ProdutoID) REFERENCES Produtos(ProdutoID)
);
