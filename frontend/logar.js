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
    })

    let results = await response.json();

    if (results.success) {
        let userData = results.data;

        localStorage.setItem('informacoes', JSON.stringify(userData))

        alert(results.message)

        window.location.href = "./index.html";
    } else {
        alert(results.message)
    }
}

function sair(event) {
    localStorage.removeItem('informacoes')
    window.location.href = "index.html"
}