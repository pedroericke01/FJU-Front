//importando a classe que possui todo o conntrole sobre o elemento Tribo no meu sistema:
import { TriboService } from "./services/TriboService.js";
import { NacaoService } from "./services/NacaoService.js";
import { Renderizar_Dados } from "./utils/RenderizarDado.js";

//funcao CLUSTER para controlar o progresso da barra de progresso de cada tribo específica:
const animacao_progresso = (pontuacao_maxima)=>{

    //acessando todas as barras de progresso existentes pois cada tribo existente:
    const barras_progresso = window.document.querySelectorAll(".progresso > .barra_progresso");
    
    //sabendo que cada tribo possui seus proprios dados entao vamos trabalhar com esses:
    barras_progresso.forEach((barra_progresso, indice)=>{
        
        //acessando o elemento raiz dessa barra de progresso:
        let tribo = barra_progresso.parentNode.parentNode;
        let pontuacao_atual = Number(tribo.querySelector(".pontuacao").innerHTML);  

        //calcula a porcentagem ja alcancada a partir da pontuacao atual com base na pontuacao maxima:
        let pontuacao_alvo = (pontuacao_atual / pontuacao_maxima) * 100;

        //variável local que sera incrementada lentamente como se fosse na animacao original com keyframes CSS3:
        let progresso_atual = 0;

        //funcao para aplicar o progresso da barra:
        const animar_barra = ()=>{

            if(progresso_atual < pontuacao_alvo){

                //incrementando 1 ao progresso atual:
                progresso_atual += 1;

                //avancando com a barra de progresso esses 1 incrementado acima:
                barra_progresso.style.width = progresso_atual + "%";

                //sincronizando minha animacao completamente com o refresh de 60fps do navegador:
                requestAnimationFrame(animar_barra);
            }

        }

        //chamada ao metodo de animar_barra:
        animar_barra();

    });

};

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

//funcao para iniciar o script:
const iniciar_script = ()=>{
    //chamada ao método para replicar a animcacao da barra de progresso a cada 2 segundos:
    animacao_progresso(500);
    
    //criando o loop que a cada 2 segundos será ativado:
    setInterval(()=>{
        //chamada ao método para replicar a animcacao da barra de progresso a cada 2 segundos:
        animacao_progresso(500);
    }, 2000);

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

//chamada ao método para iniciar a execucao do meu script:
iniciar_script();
