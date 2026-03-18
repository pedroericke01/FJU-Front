//importando a classe que possui todo o conntrole sobre o elemento Tribo no meu sistema:
import { TriboService } from "./services/TriboService.js";
import { NacaoService } from "./services/NacaoService.js";
import { Renderizar_Dados } from "./utils/RenderizarDado.js";

//funcao para ocultar o painel de navegacao:
const ocultar_navegacao = (painel)=>{
    //ocultando o painel de navegacao:
    painel.style.display = "none";

    //removendo a classe exibir:
    painel.classList.remove("exibir");
}

//funcao para exibir o painel de navegacao:
const exibir_navegacao = (painel)=>{
    //ocultando o painel de navegacao:
    painel.style.display = "flex";

    //removendo a classe exibir:
    painel.classList.add("exibir");
}

//funcao para cotrolar o painel de navegacao
const controle_navegacao = ()=>{
    //verificando se o painel de navegacao ja possui a classe 'exibir':
    if(painel_navegacao.className.includes("exibir")){ //caso de ja possui
        //chamada a funcao para ocultar o painel de navegacao:
        ocultar_navegacao(painel_navegacao);
    }else{ //caso de nao possuir a classe exibir
        //chamada a funcao para ocultar o painel de navegacao:
        exibir_navegacao(painel_navegacao);
    }
}

//funcao que verifica a partir do tamanho da tela a transicao de exibir ou ocultar o painel de navegacao
const controle_icone = ()=>{
    //ocultando o painel de navegacao durante a mudanca do tamanho de tela
    ocultar_navegacao(painel_navegacao);

    //o ícone será exibido para midias menores do que 768px e nessas mídias teremos o evento de exibir e ocultar o painel de navegacao:
    if(window.innerWidth < 768){
        //exibindo o icone de menu da navegacao
        icone_menu.style.display = "flex";
    }else{
        //ocultando o icone de menu da navegacao
        icone_menu.style.display = "none";

        //exibindo o painel de navegacao:
        painel_navegacao.style.display = "flex";
    }
}

/*ligando os elementos da interface ao javascript via DOM*/
const conteiner_nacao = window.document.querySelector(".conteiner_nacao");
const conteiner_tribo = window.document.querySelector(".conteiner_tribos");

const icone_menu = window.document.querySelector("header > span.material-symbols-outlined");
const painel_navegacao = window.document.querySelector("header > nav");

//instanciando as classes controladoras das fonte de dados de meu sistema:
const classeTribo = new TriboService();
const classeNacao = new NacaoService();

//extraindo as bases de dados da nacao e tribo respectivamente:
const fonte_nacoes = classeNacao.ListarNacoes();
const fonte_tribos = classeTribo.ListarTribos();

/*método para renderizar os elementos da base de dados na interface do cliente*/
Renderizar_Dados(conteiner_nacao, fonte_nacoes, "nacao");
Renderizar_Dados(conteiner_tribo, fonte_tribos, "tribo", true);

//adiciinando um ouvidor de mudancas no tamanho da tela/janela do navegador:
window.addEventListener("resize", controle_icone);

//adicionando um ouvidor de cliques no icone de menu:
icone_menu.addEventListener("click", controle_navegacao);
