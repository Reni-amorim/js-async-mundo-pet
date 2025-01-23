const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("input-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        //Cria um novo leitor de arquivos
        const leitor = new FileReader();
        
        //Define o que acontece quando a leitura é completada com sucesso
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name });
        }

        //Define o que acontece quando ocorre um erro na leitura
        leitor.onerror = () => {
            reject(`Erro ao ler o arquivo ${arquivo.name}`);
        }

        //Inicia a leitura do arquivo
        leitor.readAsDataURL(arquivo);
    })
}

// Seleciona elementos HTML da página
const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

// Adiciona um ouvinte de evento para o input de upload de arquivo
inputUpload.addEventListener("change", async (evento) => {
    // Pegar o arquivo que foi selecionado
    const arquivo = evento.target.files[0];

    // Verifica se o arquivo é uma imagem
    if (arquivo) {
        try {
            // Aguarda a leitura do conteúdo do arquivo
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);

            //Atualiza a imagem principal com a url do arquivo
            imagemPrincipal.src = conteudoDoArquivo.url;

            // Atualiza o nome da imagem na página
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        }
        catch (erro) {
            //Em caso de erro na leitura do arquivo, exibe uma mensagem de erro
            console.error("erro na leitura do arquivo", erro);
        }
    }
})

// Cria uma variável e seleciona elementos HTML da página 
const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

//verifica o pressionamento da tecla enter
inputTags.addEventListener("keypress", (evento) => {
    // Se o enter for pressionado executa uma função
    if (evento.key === "Enter") {
        //Previne o padrão de reload da página
        evento.preventDefault();
        // pega o valor digitado, trim garante e remove espaços em branco no começo e final
        const tagTexto = inputTags.value.trim();
        //
        if (tagTexto !== "" && tagsDisponiveis.includes(tagTexto)) {
            // Cria um novo elemento li
            const tagNova = document.createElement("li");
            // Adiciona o texto digitado como novo paragrafo dentro da li
            tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
            // cria a tag como li filho da lista de tags
            listaTags.appendChild(tagNova);
            // Limpa o campo de input
            inputTags.value = "";
        } else {alert("Digite uma tag válida")};
    }
})

listaTags.addEventListener("click", (evento) => {
    //Verifica o local clicado
    if (evento.target.classList.contains("remove-tag")) {
        // Pega o elemento clicado no caso a classe remove-tag
        const tagToRemove = evento.target.parentElement;
        // Pega o elemento filho e remove através do remove child
        listaTags.removeChild(tagToRemove);
    } 
}) 

// Variável disponíveis
const tagsDisponiveis = ["gato-laranja", "gato-preto", "gato-branco"]

// Async function para buscar as tags disponíveis
async function buscarTags(tagtexto) {
    return new Promise((resolve) => {
        // Time out para simular a busca
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagtexto));
        }, 1000) 
    })
}

// função para remover tags

/*
let listaDeGatos = [
    { nome: "Gato 1", cor: "preto" },
    { nome: "Gato 2", cor: "branco" },
    { nome: "Gato 3", cor: "laranja" },
    { nome: "Gato 4", cor: "branco" },
    { nome: "Gato 5", cor: "laranja" }
];

let gatosLaranja = filtrarGatosPorCor(listaDeGatos, "laranja");
console.log(gatosLaranja);
function filtrarGatosPorCor(listaDeGatos, corDesejada) {
    return listaDeGatos.filter(gato => gato.cor === corDesejada);
}
    */