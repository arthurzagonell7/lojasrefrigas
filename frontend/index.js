function addToCart(nomeProduto, preco){
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let produto = carrinho.find(item => item.nome === nomeProduto);
    if(produto){
        produto.qtd++;
    }else{
        carrinho.push({nome: nomeProduto, preco: preco, qtd: 1});
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function carregarCarrinho(){
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


if (window.location.pathname.includes('carrinho.html')) {
    carregarCarrinho();
}

function limparCarrinho(){
    localStorage.removeItem("carrinho");
    localStorage.clear();
}


// document.addEventListener("DOMContentLoaded", () => {

//     let dados = JSON.parse(localStorage.getItem('informacoes'))
//     console.log(dados)

//     if (dados.perfil === "admin") {

//         let html = document.getElementById('informacoes')

//         html.innerHTML = `<div style="display: flex flex-direction: column; align-items: end">
//                           Perfil: ${dados.perfil}
//                           </div>`
//         html.style.display = 'block'
//     }

//     dados.perfil === 'admin'
//         ? document.getElementById('cadastrar_produto').style.display = 'block'
//         : document.getElementById('cadastrar_produto').style.display = 'none'

// })

async function cadastrarProduto(event) {
    event.preventDefault()

    const title = document.getElementById('title').value
    const price = Number(document.getElementById('price').value)
    const file = document.getElementById('file').files[0]

    let formData = new FormData();

    formData.append('nome', title)
    formData.append('preco', price)
    formData.append('file', file)

    const response = await fetch('http://localhost:3000/produtos/cadastrar', {
        method: "POST",
        body: formData
    })

    const results = await response.json()

    if (results.sucess) {
        alert(results.message)
    } else {
        console.log(results.data)
        alert(results.message)
    }
}

async function listarProdutos() {
    const response = await fetch('http://localhost:3000/produtos/listar', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const results = await response.json()

    if (results.sucess) {
        let productData = results.data
        const images = 'http://localhost:3000/uploads/'
        let html = document.getElementById('produtos_catalogo')

        
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
          `


          html.innerHTML += card
        });
    } else {
        alert(results.message)
    }
}

window.addEventListener("load", () => {
    listarProdutos()

    if (localStorage.getItem("informacoes")) {
        let html = document.getElementById('infoUser')
        let dados = JSON.parse(localStorage.getItem('informacoes'))

        dados.perfil === 'admin'
            ? document.getElementById('cadastrar_produto').style.display = 'block'
            : document.getElementById('cadastrar_produto').style.display = 'none'

        dados.perfil === 'usuario'
            ? document.getElementById('infoUser').style.display = 'none':

        html.innerHTML = `<div style="display: none; background-color: red;" id="infoUser"></div>
            <div>
            Perfil:${dados.perfil}
            </div>`

        html.style.display = 'block'
    }
})

function formEditarProduto(product) {
    console.log(product)
    let modal = document.getElementById('editar_produto')
    let images = 'http://localhost:3000/uploads/'
 
    document.getElementById('id_produto').value = product.ProdutoID
    document.getElementById('editar_titulo').value = product.Nome
    document.getElementById('editar_preco').value = product.Preco
    document.getElementById('imagem_produto').src = images + product.image
 
    modal.style.display = "block"
}

async function atualizarProduto(event) {
    event.preventDefault()

    let id = document.getElementById('id_produto').value
    let titulo = document.getElementById('editar_titulo').value
    let preco = document.getElementById('editar_preco').value
    let file = document.getElementById('editar_imagem').files[0]
    
    let formData = new FormData()

    formData.append('titulo', titulo)
    formData.append('preco', preco)
    formData.append('file', file)

    const response = await fetch(`http://localhost:3000/produtos/editar/${id}`, {
        method: "PUT",
        body: formData
    })

    const results = await response.json()
    console.log(results)

    if (results.sucess) {
        alert(results.message)
    } else {
        console.log(results.data)
        alert(results.message)
    }
    
}