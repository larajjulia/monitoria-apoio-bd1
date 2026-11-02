async function fetchLivros(){
    try {
        const response = await fetch("http://127.0.0.1:8000/livros")
        const data = await response.json()
        const livroSelect = document.getElementById("livro")
        data.forEach(livro => {
            const option = document.createElement("option")
            option.value = livro.isbn;
            option.textContent = livro.titulo;
            livroSelect.appendChild(option)
        });
    } catch (error) {
        console.log(error)
    }
}

async function fetchGraficas(){
    try {
        const response = await fetch("http://127.0.0.1:8000/grafica")
        const data = await response.json()
        const graficaSelect = document.getElementById("grafica")
        data.forEach(grafica => {
            const option = document.createElement("option")
            option.value = grafica.id;
            option.textContent = grafica.nome;
            graficaSelect.appendChild(option)
        });
    } catch (error) {
        console.log(error)
    }
}

async function enviarParaImpressao(){
    try {
        const livro = document.getElementById("livro").value;
        const grafica = document.getElementById("grafica").value;
        const copias = document.getElementById("input-copias").value;
        const data = document.getElementById("input-data").value;

        const sendJson = {
            isbn: livro,
            grafica: grafica,
            copias: copias,
            data: data,
        }

        const response = await fetch("http://127.0.0.1:8000/impressos", {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(sendJson)
        })

        if(response.ok){
            alert("Solicitado com sucesso!")
        } else{
            alert("Erro na impressão.")
        }
    } catch (error) {
        alert("Erro no servidor.")
    }
}

fetchGraficas()
fetchLivros()