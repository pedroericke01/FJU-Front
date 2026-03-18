
//importando modulos de dependencia desse script:
import {UsuarioService} from "../scripts/services/UsuarioService.js"

//funcao para persistir o codigo do usuário ue fez o login na memoria cache:
const persistir_codigo = (codigo)=>{
    return localStorage.setItem("codigo_usuario", codigo);
};

//funcao para processar os dados de login do usuário:
function processar_dados(evento){

    evento.preventDefault();
    
    /* extraindo os dados de email e senha, excluindo espaços vazios na partes da
    frente e trás dessas strings, transformando esses dados para minusculos */
    let email = String(txt_email.value).trim();
    let senha = String(txt_senha.value).trim();
    
    //garantindo que o usuário insira dados no email e senha:
    if(email !== "" && senha !== ""){

        //chamada ao método para fazer o login de meu usuário validando seus dados:
        const resultado_login = usuarioService.Login(email, senha);
    
        //validando o resultado de login:
        if(resultado_login.error){
            window.alert(`[ERROR] ${resultado_login.error}`);
            console.error(resultado_login.error);
        }else{ //caso de sucesso:
            
            //persistindo o codigo do usuário na memoria cache:
            persistir_codigo(resultado_login.codigo);

            //redirecionando o usuário para a interface do administrador:
            window.location.href = "../views/admin-home.html";
        }
        
    }else{
        window.alert('[ERROR] Dados de login inválidos!');
    }

    /* limpando os campos do input*/
    formulario.reset();

}

/* ligando as principais campos interativos ao javascript */
const conteiner_dados = window.document.querySelector(".conteiner_dados");

const formulario = conteiner_dados.querySelector("form");
const txt_email = formulario.querySelector("#email");
const txt_senha = formulario.querySelector("#senha");

//adicionando um ouvidor de submit para o formulário:
formulario.addEventListener("submit", processar_dados);

//instanciando um novo objeto da classe UserService:
const usuarioService = new UsuarioService();
