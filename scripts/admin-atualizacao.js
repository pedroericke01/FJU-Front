//importando as dependencias desse script:
import { TriboService } from "./services/TriboService.js";
import {Usuario_Valido} from "./utils/Usuario.js";
import {ExtrairCodigo} from "./utils/Usuario.js";

//funcao para extrair o codigo da tribo salvo no localstorage:
const extrair_codigo = ()=>{
    return localStorage.getItem("codigo_tribo");
};

//funcao para processar os dados inseridos pelo usuário no formulário:
const processar_dados = (evento)=>{
    
    evento.preventDefault();

    //acessando a nova pontuacao inserida pelo usuáiro no formulário:
    const nova_pontuacao = Number(txt_nova_pontuacao.value);
    
    //so vamos atualizar a pontuacao no caso de a nova ser maior:
    if(nova_pontuacao > tribo_atual.pontuacao){        
        //atualizando a pontuacao da tribo:
        const resultado_atualizacao = tribo_service.AtualizarPontuacao(tribo_atual.codigo, nova_pontuacao);
        
        if(resultado_atualizacao.error){
            console.error(resultado_atualizacao.error);
        }else{
            window.alert(`Nova Pontuacao: ${resultado_atualizacao.pontuacao}`);
            console.log(resultado_atualizacao);

            //renderizando a pontuacao Atualizada da tribo:
            pontuacao_atual.placeholder = `Pontuacao: ${resultado_atualizacao.pontuacao}`;
        }
    }else{
        window.alert("Pontuacao nao será atualizada!");
    }

    //limpando os campos de input do formulário:
    formulario.reset();
};

//funcao para iniciar todo o script:
const iniciar_aplicacao = ()=>{

    //chamada a funcao para validar o codigo do usuário extraido acima:
    const codigo_valido = Usuario_Valido(codigo_usuario);

    if(codigo_valido === true){

        //chamada a funcao para extrair o codigo da tribo na memoria cache:
        const codigo_tribo = extrair_codigo();
        
        //validando se existe o codigo da tribo na memoria cache:
        if(codigo_tribo !== null){ //codigo extraido com sucesso
            
            //chamada ao método de busca de uma tribo a partir do seu codigo:
            tribo_atual = tribo_service.ListarPorCodigo(Number(codigo_tribo));
            
            if(tribo_atual.error){
                console.error(tribo_atual.error);
            }else{        
                //renderizando a imagem da tribo:
                imagem_tribo.src=`../images/imagens-tribos/${tribo_atual.imagem}`;
        
                //renderizar o nome da tribo:
                nome_tribo.value = `Nome: ${tribo_atual.nome}`;
        
                //renderizando a e pontuacao Atual da tribo:
                pontuacao_atual.value = `Pontuacao: ${tribo_atual.pontuacao}`;
            }
            
        }else{ //codigo ainda nao foi inserido, entao o usuário será redirecionado para a interface anterior:
            
            //disparando o alerta de erro para o cliente:
            window.alert("[ERROR]Codigo do checklist inválido!");
    
            //redirecionando o usuário para a interface anterior
            window.location.href = "../views/admin-home.html";
        }

    }

};

//acessando elementos HTML via DOM:
const formulario = window.document.getElementsByTagName("form")[0];
const imagem_tribo = formulario.querySelector(".conteiner_imagem > img");
const nome_tribo = formulario.querySelector("#nome_tribo");
const pontuacao_atual = formulario.querySelector("#pontuacao_atual");
const txt_nova_pontuacao = formulario.querySelector("#nova_pontuacao");
const botao_cancelar = formulario.querySelector("#cancelar");

//chamada ao método para extrair o codigo do usuário:
const codigo_usuario = ExtrairCodigo();

//instanciando um objeto da classe TriboService:
const tribo_service = new TriboService();

//variável global que será utilizada em todo o meu sistema:
var tribo_atual = null;

//adicionando um ouvidor de submits no formulário:
formulario.addEventListener("submit", processar_dados);

//adicionando um ouvidor de click no botao de cancelar, esse redireciona o usuário para a interface home do admin:
botao_cancelar.addEventListener("click", ()=>{window.location.href = "../views/admin-home.html"});

//método para iniciar a execucao do meu script:
iniciar_aplicacao();
