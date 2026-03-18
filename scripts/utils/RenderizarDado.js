//módulo responsável por conter todas as funcao genericas e reutilizaveis da camada front end:
import { Criar_Tribo } from "../components/Tribo.js";
import { Criar_Nacao } from "../components/Nacao.js";

//funcao para renderizar a base de dados em um conteiner específico:
export const Renderizar_Dados = (conteiner, base_dados, atributo, animacao=false)=>{
    //variável local que será utilizada nessa funcao:
    let nova_tag = null;

    base_dados.map((elemento, indice)=>{

        //validando se essa é uma renderizacao de elementos Nacao ou tribo:
        if(atributo === "nacao"){
            //chamada ao método para criar a nova nacao:
            nova_tag = Criar_Nacao(elemento.codigo, elemento.nome, elemento.imagem, elemento.pontuacao);
        }
        else if(atributo === "tribo"){

            //verificando se a tribo a ser criada possui ou não alguma animacao interna:
            if(animacao === false){
                //criando a nova tribo sem animacao:
                nova_tag = Criar_Tribo(elemento.codigo, elemento.nome, elemento.imagem, elemento.pontuacao);
            }else{
                //criando a nova tribo com animacao
                nova_tag = Criar_Tribo(elemento.codigo, elemento.nome, elemento.imagem, elemento.pontuacao, true);
            }
        }
        else{
            console.error("Atributo inválido!");
        }
        
        //chamada ao método para adicionar :
        conteiner.appendChild(nova_tag);
    });
};
