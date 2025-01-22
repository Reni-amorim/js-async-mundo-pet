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