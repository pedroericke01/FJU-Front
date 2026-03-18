//modulo responsável por conter toda a logica de manipulacao DOM sobre o elemento Tribo no meu sistema:

/* função para criar as tribos */
export const Criar_Tribo = (codigo, nome, imagem, pontuacao, animacao=false)=>{

    /* criando as tags dinÂmicamente */
    const tribo = window.document.createElement("div");
    const nome_tribo = window.document.createElement("h3");
    const conteiner_progresso = window.document.createElement("div");
    const barra_progresso = window.document.createElement("div");
    const conteiner_imagem = window.document.createElement("div");
    const imagem_tribo = window.document.createElement("img");
    const tag_pontuacao = window.document.createElement("p");

    /* atribuir as respectivas classes aos elementos DOM criados: */
    tribo.className = "tribo";
    
    //atribuindo o respectivo codigo da tribo:
    tribo.setAttribute("codigo", codigo);
    
    nome_tribo.className = "nome_tribo";
    conteiner_progresso.className = "progresso";
    barra_progresso.className = "barra_progresso";
    conteiner_imagem.className = "conteiner_imagem";
    tag_pontuacao.className = "pontuacao";
    
    /* atualizando os conteúdos dentro das tags específicas: */
    nome_tribo.innerText = nome;
    imagem_tribo.src = `../images/imagens-tribos/${imagem}`;
    imagem_tribo.alt = nome;
    tag_pontuacao.innerText = pontuacao;

    /* estruturando a caixa das tribos pelo DOM */
    if(animacao === false){
        tribo.appendChild(nome_tribo);
        tribo.appendChild(conteiner_imagem);
        conteiner_imagem.appendChild(imagem_tribo);
        tribo.appendChild(tag_pontuacao);    
    }else{
        tribo.appendChild(nome_tribo);
        tribo.appendChild(conteiner_progresso);
        conteiner_progresso.appendChild(barra_progresso);
        barra_progresso.appendChild(conteiner_imagem);
        conteiner_imagem.appendChild(imagem_tribo);
        tribo.appendChild(tag_pontuacao);
    }

    return tribo;
}
