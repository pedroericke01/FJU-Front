//módulo responsável por conter todas as funcao genericas e reutilizaveis da camada front end:

//importando modulos de dependencia desse sistema:
import { UsuarioService } from "../services/UsuarioService.js";

//funcao para validar se o codigo do usuário é valido na base de dados ou não:
export const Usuario_Valido = (codigo_usuario)=>{

    const usuarioService = new UsuarioService();

    //chamada ao método que retorna todos os dados relacionados ao usuário específico com base no codigo informado:
    const busca_usuario = usuarioService.ListarPorCodigo(codigo_usuario);

    if(busca_usuario.error){
        //retornando a mensagem de erro:
        window.alert(`[ERROR] ${busca_usuario.error}`);

        console.error(busca_usuario.error);

        //redirecionando o usuário para a interface de login:
        window.location.href = "../views/login.html";
    }else{ //caso de usuário existir
        return true;
    }

};

//funcao para extrair o codigo do usuario salvo no localstorage:
export const ExtrairCodigo = () =>{
    return Number(localStorage.getItem("codigo_usuario"));
};
