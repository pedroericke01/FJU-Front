//módulo responsável por conter toda a lógica de manipulacao DOM sobre o elemento Nacao:

/* função para criar as nação */
export const Criar_Nacao = (codigo, nome, imagem, pontuacao)=>{
    
    /* criando as tags dinâmicamente: */
    const nacao = window.document.createElement("div");
    const conteiner_imagem = window.document.createElement("div");
    const tag_imagem = window.document.createElement("img");
    const conteiner_progresso = window.document.createElement("div");
    const progresso = window.document.createElement("p");

    /* atribuindo as respectivas classes a cada tag criada: */
    nacao.className = "nacao";

    //atribuindo o respectivo codigo da nacao:
    nacao.setAttribute("codigo", codigo);

    conteiner_imagem.className = "conteiner_imagem";
    conteiner_progresso.className = "conteiner_progresso";
    progresso.className = "progresso";

    /* atualizando o conteúdo interno de cada tag criada: */
    tag_imagem.src = `../images/imagens-nacao/${imagem}`;
    tag_imagem.alt = nome;
    progresso.innerText = pontuacao;

    /* estruturando a caixa das nações pelo DOM */
    nacao.appendChild(conteiner_imagem);
    conteiner_imagem.appendChild(tag_imagem);
    nacao.appendChild(conteiner_progresso);
    conteiner_progresso.appendChild(progresso);

    return nacao;
}
