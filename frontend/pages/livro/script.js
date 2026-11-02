async function fetchLivros() {
    try {
        const response = await fetch("http://127.0.0.1:8000/livros")
        const livros = await response.json()
        return livros
    } catch (error) {
        console.log("Erro na requisição", error)
    }
}

async function fetchLivrosComFiltro() {
    try {
        const url = new URL("http://127.0.0.1:8000/livros")
        const params = new URLSearchParams();
        const editora = document.getElementById("filtro-editora").value
        if (editora) params.append("editora", editora);
        url.search = params.toString()

        const response = await fetch(url)
        return await response.json();
    } catch (error) {
        console.log("Erro na requisição", error)
    }
}

async function loadEditoraFiltro(){
    const response = await fetchLivros()
    const editorasUnicas = [...new Set(response.map(livro => livro.editora_id))];
    const editoraSelect = document.getElementById("filtro-editora")

    editorasUnicas.forEach(editora => {
        const option = document.createElement("option");
        option.value = editora;
        option.textContent = editora;
        editoraSelect.appendChild(option);
    })
}

async function loadLivros() {
    const livros = await fetchLivrosComFiltro()
    tableDiv = document.getElementById("livros");
    tableDiv.innerHTML = ''
    livros.forEach(livro => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <h2>${livro.titulo}</h2>
                    <p><strong>Data de Publicação: </strong>${new Date(livro.data_de_publicacao).toLocaleDateString()}</p>
                    <p><strong>Editora ID: </strong>${livro.editora_id}</p>
                    <p><strong>Endereço: </strong>${livro.endereco}</p>
                    <p><strong>ID: </strong>${livro.id}</p>
                    <p><strong>ISBN: </strong>${livro.isbn}</p>
                    <p><strong>Nome do Autor: </strong>${livro.nome}</p>
                    <p><strong>RG do Autor: </strong>${livro.rg}</p>
                    `;
        tableDiv.appendChild(row);
    })
}

loadEditoraFiltro()
loadLivros()