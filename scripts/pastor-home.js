//importando os modulos de dependencia para o correto funcionamento desse script:
import { UsuarioService } from "./services/UsuarioService.js";
import { CargoService } from "./services/CargoService.js";
import {Reiniciar_Pontuacao} from "./utils/ReiniciarPontuacao.js";

//funcao para limpar todos os registros da tabela:
const limpar_tabela = ()=>{
    
    while(tbody.firstElementChild){
        tbody.removeChild(tbody.firstElementChild);
    }

};

//funcao para renderizar toda a base de usuarios na interface:
const renderizar_usuarios = (conteiner, fonte_dados)=>{

    fonte_dados.map((usuario, indice)=>{
        //criando o novo Registro no DOM
        let novo_registro = Criar_Registro(usuario.codigo, usuario.email, usuario.senha);

        //adicionando esse novo registro no conteiner:
        conteiner.appendChild(novo_registro);

    });
}

//funcao para deletar um registro na base de dados:
const deletar_registro = (codigo)=>{
    //chamada ao método para deletar o registro:
    const resultado_delecao = usuarioService.DeletarUsuario(codigo);

    if(resultado_delecao.error){
        window.alert(`[ERROR] ${resultado_delecao.error}`);
        console.error(resultado_delecao.error);
    }else{
        //método para limpar todos os registros existentes na tabela:
        limpar_tabela();
    
        //chamada ao método para extrair toda a base atualizada dos usuários:
        const fonte_usuarios = usuarioService.ListarUsuarios();
    
        //chamada ao método para renderizar toda a base de usuarios:
        renderizar_usuarios(tbody, fonte_usuarios);
    }

};

//funcao para atualizar dados de um registro:
const atualizar_registro = (evento)=>{

    evento.preventDefault();

    //objeto que me permite validar se houve atualizacao de algum atributo ou não:
    let dados_atualizado = {};

    //método para buscar todas os dados do usuário relacionado ao codigo:
    const dados_usuario = usuarioService.ListarPorCodigo(usuario_registro);
    
    //acessando os novos dados inseridos pelo usuário
    let novo_email = String(txt_email.value).trim();
    let nova_senha = String(txt_senha.value).trim();
    let novo_cargo = String(txt_cargo.value).trim();

    //no caso de o usuário não inserir dados no input de email então essas informacoes serão identificadas como as atuais do banco de dados:
    if(novo_email === ""){
        novo_email = dados_usuario.email;
    }

    //no caso de o usuário não inserir dados no input de senha, então essas informacoes serão identificadas como as atuais do banco de dados:
    if(nova_senha === ""){
        nova_senha = dados_usuario.senha;
    }
    
    //no caso de o usuário não inserir dados no input de cargo, então essas informacoes serão identificadas como as atuais do banco de dados:
    if(novo_cargo === ""){
        novo_cargo = dados_usuario.cargo;
    }

    //validando se houve alguma atualizacao nos dados:
    if(dados_usuario.email !== novo_email){
        //chamada ao método para atualizar o email:
        let resultado_atualizacao = usuarioService.AtualizarEmail(usuario_registro, novo_email);

        if(resultado_atualizacao.error){ //caso de erro:
            window.alert(`[ERROR] ${resultado_atualizacao.error}`);

            console.error(resultado_atualizacao.error);

            //limpando os campos de input:
            formulario.reset();
        }else{ //caso de sucesso na atualizacao do email:
            dados_atualizado.email = true;
        }
    }

    if(dados_usuario.senha !== nova_senha){
        //chamada ao método para atualizar a senha:
        let resultado_atualizacao = usuarioService.AtualizarSenha(usuario_registro, nova_senha);

        if(resultado_atualizacao.error){ //caso de erro:

            if(resultado_atualizacao.error.tamanho){
                window.alert(`[ERROR]: ${resultado_atualizacao.error.tamanho}`);
                console.error(resultado_atualizacao.error.tamanho)
            }

            if(resultado_atualizacao.error.primeiraMaiuscula){
                window.alert(`[ERROR]: ${resultado_atualizacao.error.primeiraMaiuscula}`);
                console.error(resultado_atualizacao.error.primeiraMaiuscula);
            }
            
            if(resultado_atualizacao.error.caractereEspecial){
                window.alert(`[ERROR]: ${resultado_atualizacao.error.caractereEspecial}`);
                console.error(resultado_atualizacao.error.caractereEspecial);
            }
            
        }else{ //caso de sucesso na atualizacao da senha:
            dados_atualizado.senha = true;
        }
    }
    
    if(dados_usuario.cargo !== novo_cargo){

        //chamada ao metodo para atualizar o cargo de um usuário específico:
        const resultado_atualizacao = usuarioService.AtualizarCargo(usuario_registro, novo_cargo);

        if(resultado_atualizacao.error){
            window.alert(`[ERROR] ${resultado_atualizacao.error}`);
            console.error(resultado_atualizacao.error);
        }else{
            dados_atualizado.cargo = true;
        }
        
    }

    //validando se houve atualizacao de algum atributo ou não:
    if(dados_atualizado.email === undefined && dados_atualizado.senha === undefined && dados_atualizado.cargo === undefined){
        window.alert('[ERROR] Não houve atualizacoes!');

        //limpando os campos de input do formulario:
        formulario.reset();
        
        //retornando as informacoes do formulario padrao:
        formulario_padrao();
    }else{ // caso de o usuario atualizar ao menos 1 atributo:

        //limpando os campos de input do formulario:
        formulario.reset();

        //método para limpar todos os registros existentes na tabela:
        limpar_tabela();
    
        //chamada ao método para extrair toda a base atualizada dos usuários:
        const fonte_usuarios = usuarioService.ListarUsuarios();
    
        //chamada ao método para renderizar toda a base de usuarios:
        renderizar_usuarios(tbody, fonte_usuarios);
        
        //retornando as informacoes do formulario padrao:
        formulario_padrao();
    } 

};

//funcao para retornar as informacoes padrao do formulario de criar:
const formulario_padrao = ()=>{

    //atualizando as informacoes do formulario:
    tema_formulario.innerText = "Criar novo Administrador";

    txt_email.placeholder = "Insira o email";
    txt_senha.placeholder = "Insira a senha";
    txt_cargo.placeholder = "Insira o cargo";

    submit.value = "Criar";

    //removendo o evento para atualizar o registro:
    submit.removeEventListener("click", atualizar_registro);

    //adicionando o evento de criar um novo registro no submit do formulário:
    submit.addEventListener("click", criar_administrador);
};

//funcao para preparar o formulário de atualizacao:
const preparar_atualizacao = ()=>{
    
    //método para buscar todas os dados do usuário relacionado ao codigo:
    const dados_usuario = usuarioService.ListarPorCodigo(usuario_registro);

    //atualizando as informacoes do formulario:
    tema_formulario.innerText = "Atualizar Administrador";

    txt_email.placeholder = dados_usuario.email;
    txt_senha.placeholder = dados_usuario.senha;
    txt_cargo.placeholder = dados_usuario.cargo;

    submit.value = "Atualizar";

    //removendo o evento de criar um novo registro no submit do formulário:
    submit.removeEventListener("click", criar_administrador);

    //adicionando o ouvidor de submit para atualizar os dados do administrador:
    submit.addEventListener("click", atualizar_registro);

};

//funcao para criar um novo administrador na base de dados:
const criar_administrador = (evento)=>{

    evento.preventDefault();

    //extraindo o email e a senha inseridas no input:
    let email = String(txt_email.value).trim();
    let senha = String(txt_senha.value).trim();
    let cargo = String(txt_cargo.value).trim();

    //garantir a integridade dos inputs, nao podem ser vazios:
    if(email === "" || senha === "" || cargo === ""){
        window.alert("[ERROR] Dados inválidos!")
    }else{ //caso de dados integros para criar um novo usuário na base do sistema:

        //chamada ao método para criar o novo usuário:
        const novo_usuario = usuarioService.CriarUsuario(email, senha, cargo);

        if(novo_usuario.error){ //caso de erro:

            if(novo_usuario.error.tamanho){
                window.alert(`[ERROR]: ${novo_usuario.error.tamanho}`);
                console.error(novo_usuario.error.tamanho)
            }

            if(novo_usuario.error.primeiraMaiuscula){
                window.alert(`[ERROR]: ${novo_usuario.error.primeiraMaiuscula}`);
                console.error(novo_usuario.error.primeiraMaiuscula);
            }
            
            if(novo_usuario.error.caractereEspecial){
                window.alert(`[ERROR]: ${novo_usuario.error.caractereEspecial}`);
                console.error(novo_usuario.error.caractereEspecial);
            }

            else{
                window.alert(`[ERROR] ${novo_usuario.error}`);
                console.error(novo_usuario.error);
            }

            //limpando os campos de input do usuário:
            formulario.reset();

        }else{
            //limpando os campos de input do formulario:
            formulario.reset();

            //método para limpar todos os registros existentes na tabela:
            limpar_tabela();
        
            //chamada ao método para extrair toda a base atualizada dos usuários:
            const fonte_usuarios = usuarioService.ListarUsuarios();
        
            //chamada ao método para renderizar toda a base de usuarios:
            renderizar_usuarios(tbody, fonte_usuarios);
        }

    }

};

//funcao para exibir e ocultar a visualizacao dos dados do registro:
const visual_registro = (email, senha)=>{
    //controlando a exibicao e ocultacao dos dados senssíveis:
    email.classList.toggle("ocultar"); 
    senha.classList.toggle("ocultar");
}

//funcao para exibir todos os dados do registro de um usuário específico:
const Controle_Registro = (target)=>{

    //acessando o ícone clicado:
    let operacao = target.target.innerText;

    //acessando o registro clicado:
    let registro = target.target.parentNode.parentNode;

    //extraindo o codigo do usuário dono desse registro:
    usuario_registro = Number(registro.getAttribute("codigo"));

    //acessando todos os dados do registro:
    let dado_email = registro.querySelector(".email");
    let dado_senha = registro.querySelector(".senha");
            
    //enviando a execucao do codigo segundo o controle clicado pelo usuário:
    if(operacao === "visibility"){
        //método para controlar a visualizacao dos dados do usuário
        return visual_registro(dado_email, dado_senha);
    }
    else if(operacao === "edit"){
        //metodo para editar um registro específico:
        return preparar_atualizacao();
    }
    else if(operacao === "delete"){
        return deletar_registro(usuario_registro);
    }

};

//funcao para criar um novo registro na tabela:
const Criar_Registro = (codigo, email, senha)=>{

    //criando as tags via DOM:
    const registro = window.document.createElement("tr");

    const dado_email = window.document.createElement("td");
    const tag_email = window.document.createElement("p");

    const dado_senha = window.document.createElement("td");
    const tag_senha = window.document.createElement("p"); 

    const conteiner_controles = window.document.createElement("td");
    const btn_exibir = window.document.createElement("span");
    const btn_editar = window.document.createElement("span");
    const btn_deletar = window.document.createElement("span");

    //adicionando as respectivas classes a cada tag criada acima:
    dado_email.className = "email";
    dado_senha.className = "senha";

    conteiner_controles.className = "icones_controle";

    btn_exibir.className = "material-symbols-outlined";
    btn_editar.className = "material-symbols-outlined";
    btn_deletar.className = "material-symbols-outlined";
    
    //adicionando o atributo "codigo" relacionado ao codigo do usuário ao registro criado:
    registro.setAttribute("codigo", codigo);

    //adicionando o ouvidor da classe "ocultar" nos dados sensíveis do registro:
    dado_email.classList.add("ocultar");
    dado_senha.classList.add("ocultar");

    //atribuindo seus respectivos dados internos:
    tag_email.innerText = email;
    tag_senha.innerText = senha;

    btn_exibir.innerText = "visibility";
    btn_editar.innerText = "edit";
    btn_deletar.innerText = "delete";

    //adicionando ouvidores de eventos nos controles:
    btn_exibir.addEventListener("click", Controle_Registro);
    btn_editar.addEventListener("click", Controle_Registro);
    btn_deletar.addEventListener("click",Controle_Registro);
    
    //construindo a arvore DOM desse elemento:
    registro.appendChild(dado_email);
    dado_email.appendChild(tag_email);

    registro.appendChild(dado_senha);
    dado_senha.appendChild(tag_senha);

    registro.appendChild(conteiner_controles);
    conteiner_controles.appendChild(btn_exibir);
    conteiner_controles.appendChild(btn_editar);
    conteiner_controles.appendChild(btn_deletar);

    //retornando todo o registro criado:
    return registro;
};

//funcao para iniciar o script:
const iniciar_script = ()=>{

    //chamada ao método para extrair toda a base dos usuários:
    const fonte_usuarios = usuarioService.ListarUsuarios();
    console.log(fonte_usuarios);

    //chamada ao método para renderizar toda a base do usuário na interface do cliente:
    renderizar_usuarios(tbody, fonte_usuarios);

};

//acessando elementos HTML via DOM:
const reiniciar = window.document.querySelector("header > .reiniciar");

const conteiner_dados = window.document.querySelector("main > .conteiner_dados");

const formulario = conteiner_dados.querySelector("form");
const tema_formulario = formulario.querySelector("h3");
const txt_email = formulario.querySelector("#email");
const txt_senha = formulario.querySelector("#senha");
const txt_cargo = formulario.querySelector("#cargo");
const submit = formulario.querySelector("#criar");

const tabela = conteiner_dados.querySelector("table");
const tbody = tabela.querySelector("tbody");

//instanciando um objeto da classe UsuarioService:
const usuarioService = new UsuarioService();
const cargoService = new CargoService();

//variável global que vai receber o codigo do usuário relacionado ao registro clicado:
var usuario_registro = null;

//adicionando o ouvidor de evento de click no botao de reiniciar o rally:
reiniciar.addEventListener("click", Reiniciar_Pontuacao);

//adicionando o evento para criar um novo registro na base de dados:
submit.addEventListener("click", criar_administrador);

//chamada ao método para iniciar o script:
iniciar_script();
