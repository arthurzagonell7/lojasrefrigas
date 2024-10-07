async function cadastrar(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const data = { nome, endereco, email, senha }

    const response = await fetch('http://localhost:3000/usuarios/cadastrar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();
    console.log(results)
    if (results.success) {
        alert(results.message)
    } else {
        alert(alert.message)
    }


}
