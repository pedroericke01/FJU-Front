//importando os módulos Data e Services:
import { TriboService } from "./services/TriboService.js";
import { UsuarioService } from "./services/UsuarioService.js";
import { Renderizar_Dados } from "./utils/RenderizarDado.js";
import { Usuario_Valido } from "./utils/Usuario.js";
import { ExtrairCodigo } from "./utils/Usuario.js";
import {Reiniciar_Pontuacao} from "./utils/ReiniciarPontuacao.js";

//funcao para persistir o codigo da tribo na cache do navegador:
const persistir_codigo = (codigo)=>{
    localStorage.setItem("codigo_tribo", Number(codigo));
}

//método para extrair o codigo da tribo no momento que o usuário clicar nela:
const codigo_tribo = (target)=>{
    //variável local que deverá ser atualizada nessa funcao:    
    let codigo_tribo = undefined;

    //acessando a tribo que o usuário clicou:
    let clique = target.target;

    //h3, img, p, tribo:
    if(clique.className.includes("tribo")){
        //extraindo o codigo da tribo:
        codigo_tribo = clique.getAttribute("codigo");

        //persistindo o codigo da tribo no Localstorage do navegador:
        persistir_codigo(codigo_tribo);
    }

    if(clique.nodeName === "H3"){
        //extraindo o codigo da tribo:
        codigo_tribo = clique.offsetParent.getAttribute("codigo");

        //persistindo o codigo da tribo no Localstorage do navegador:
        persistir_codigo(codigo_tribo);
    }

    if(clique.nodeName === "IMG"){
        //extraindo o codigo da tribo:
        codigo_tribo = clique.offsetParent.getAttribute("codigo");

        //persistindo o codigo da tribo no Localstorage do navegador:
        persistir_codigo(codigo_tribo);
    }

    if(clique.nodeName === "P"){
        //extraindo o codigo da tribo:
        codigo_tribo = clique.offsetParent.getAttribute("codigo");

        //persistindo o codigo da tribo no Localstorage do navegador:
        persistir_codigo(codigo_tribo);
    }

    //redirecionando o usuario para a interface de atualizacao dos dados:
    window.location.href = "../views/admin-atualizacao.html";
    
}

//funcao para adicionar o evento de clique em todas as tribos existentes:
const evento_clique = (conteiner_dados)=>{
    
    //convertendo de HTMLCollection para um NodeList javascript:
    let array_tribos = [...conteiner_dados.children];

    //iterando sobre o HTMLCollection e acessando seus elementos filhos:
    array_tribos.map((tribo, indice)=>{
        //adicionando o evento de clique em cada tribo.
        tribo.addEventListener("click", codigo_tribo);
    });

}

const ReiniciarRally = ()=>{
    
    //chamada a funcao para resetar toda a pontuacao do rally:
    Reiniciar_Pontuacao();

    //chamada ao método para renderizar os novos dados com a pontuacao atualizada:
    fonte_tribos = classeTribo.ListarTribos();

    //chamada ao método para deletar todos os elementos filhos antigos(tribos) da interface:
    while(conteiner_tribo.firstElementChild){
        conteiner_tribo.removeChild(conteiner_tribo.firstElementChild);
    }

    //chamada ao método para renderizar os novos dados atualizados:
    Renderizar_Dados(conteiner_tribo, fonte_tribos, "tribo", false);

    //chamada ao método para adicionar um evento de clique em todas as tribos renderizadas:
    evento_clique(conteiner_tribo);

};

//método para verificar se o botao de reiniciar o rally pode aparecer para o usuário ou não segundo o cargo do mesmo no sistema:
const controle_ReiniciarRally = ()=>{
    
    //chamada ao método que retorna todos os dados relacionados ao usuário específico com base no codigo informado:
    const busca_usuario = usuarioService.ListarPorCodigo(codigo_usuario);

    if(busca_usuario.error){
        //retornando a mensagem de erro:
        window.alert(`[ERROR] ${busca_usuario.error}`);

        console.error(busca_usuario.error);

        //redirecionando o usuário para a interface de login:
        window.location.href = "../views/login.html";

    }else{ //caso de usuário existir

        //acessando o atributo cargo e validando se o cargo é de Desenvolvedor ou de Pastor:
        if(busca_usuario.cargo === "desenvolvedor" || busca_usuario.cargo === "pastor"){
            //o botao de reiniciar o rally ficará em exibicao:
            reiniciar_rally.style.display = "flex";
        }else{
            //ocultando o botao:
            reiniciar_rally.style.display = "none";
        }

    }

};

//funcao para iniciar todo o script:
const iniciar_script = ()=>{

    //chamada ao método para renderizar todas as tribos, sem animacao seguindo o padrao dessa interface:
    Renderizar_Dados(conteiner_tribo, fonte_tribos, "tribo", false);

    //chamada ao método para adicionar um evento de clique em todas as tribos renderizadas:
    evento_clique(conteiner_tribo);

    //funcao para validar se o codigo do usuário é valido na base de dados ou não:
    let resultado_usuario = Usuario_Valido(codigo_usuario);

    if(resultado_usuario === true){
        //método para verificar se o botao de reiniciar o rally pode aparecer para o usuário ou não segundo o cargo do mesmo no sistema:
        controle_ReiniciarRally();
    }

};

//acessando elementos do HTML via DOM:
const btn_sair = window.document.querySelector("header > .logo")

const reiniciar_rally = window.document.querySelector(".reiniciar");
const conteiner_dados = window.document.querySelector(".conteiner_dados");
const conteiner_tribo = window.document.querySelector(".conteiner_tribos");

//extraindo o codigo do usuário da memoria Cache:
const codigo_usuario = ExtrairCodigo();

//instanciando um objeto da classe TriboService:
const classeTribo = new TriboService();

//instanciando um objeto da classe UsuarioService:
const usuarioService = new UsuarioService();

//extraindo a base das tribos:
var fonte_tribos = classeTribo.ListarTribos();

//adicionando um ouvidor de clique no tema da interface, no momento que o usuário clicar no tema ele vai terminar seu login:
btn_sair.addEventListener("click", ()=>{localStorage.clear()});;

//adicionando um ouvidor de cliques no botao para reiniciar o rally:
reiniciar_rally.addEventListener("click", ReiniciarRally);

//funcao para iniciar todo o script:
iniciar_script();
