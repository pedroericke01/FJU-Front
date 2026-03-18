//modulo responsável por conter a classe com todos os controles sobre o elemento Usuario no sistema:

//importando a base de dados das tribos
import { fonte_usuarios } from "../data/Usuario.js";

//importando a base de dados relacionada aos cargos
import { CargoService } from "./CargoService.js";

//método para retornar o índice de uma tribo específica caso ela exista dentro da base de dados:
const buscar_usuario = (chave)=>{

    const resultado = fonte_usuarios.findIndex((usuario, indice)=>{
        if(usuario.codigo === chave){
            return usuario
        }
    });

    if(resultado !== -1){ //caso de a tribo for encontrada
        return resultado
    }else{ //caso de a tribo nao existir
        return false
    }

}

//método para validar o formato da senha:
const senhaValida = (senha)=>{
    const error = {};
    
    if (!/^[A-Z]/.test(senha)) {
        error.primeiraMaiuscula = "A senha deve começar com letra maiúscula";
    }

    if (senha.length !== 10) {
        error.tamanho = "A senha deve ter 10 caracteres";
    }

    if (!/[-!@#$%^&*(),.?":{}|<>_]/.test(senha)) {
        error.caractereEspecial = "A senha precisa de pelo menos 1 caractere especial";
    }

    return {
        "valido":Object.keys(error).length === 0,
        "error":error
    }

}

//funcao para validar o formato do email:
const emailValido = (email) => {
    // Expressão regular para validar o formato do email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

//método para retornar o índice de uma tribo específica caso ela exista dentro da base de dados:
const buscar_por_email = (chave)=>{
    
    const resultado = fonte_usuarios.findIndex((usuario, indice)=>{
        if(usuario.email === chave){
            return usuario;
        }
    });

    if(resultado !== -1){ //caso de a tribo for encontrada
        return resultado
    }else{ //caso de a tribo nao existir
        return false
    }

}

//criando a classe:
export class UsuarioService{

    //método para o usuario fazer login no sistema:
    Login(email, senha){

        //funcao para validar a integridade do email, retornando true se for valido e false se for invalido:
        const validacao_email = emailValido(email);

        if(validacao_email === true){
    
            //método para buscar um email específico na base de dados:
            const resultado_email = buscar_por_email(email);

            if(resultado_email === false){ //caso de o email não existir na base de dados
                return {"error":"Email não existe!"};
            }else{ //caso de o email existir na base de dados:
    
                //chamada ao método para validar a senha do usuário:
                let usuario = fonte_usuarios[resultado_email];
    
                //validando se a senha informada é correta:
                if(usuario.senha === senha){
                    return {"sucess":"Acesso Liberado!", "codigo":usuario.codigo}
                }else{
                    return {"error":"Senha Incorreta!"};
                }
    
            }

        }else{
            //retornando a mensagem de erro:
            return {"error":"Email inválido!"}
        }

    }

    //método para criar uma nova tribo na base de dados:
    CriarUsuario(email, senha, cargo){

        //funcao para validar a integridade do email, retornando true se for valido e false se for invalido:
        const validacao_email = emailValido(email);

        if(validacao_email === true){ //caso de ser um email válido:

            //verificando se existe algum usuário com esse email informado na base de dados: 
            const resultado_busca = buscar_por_email(email);
            
            //retorna o indice do usuário caso exista, caso contrário retorna false:
            if(resultado_busca === false){
                
                //chamada ao método para validar o formato da nova senha:
                const validacao_senha = senhaValida(senha);
                
                if(validacao_senha.valido === true){ //caso de a senha ser válida:
                    
                    //instanciando um novo objeto CargoService:
                    const cargoService = new CargoService();
                    
                    //chamada ao método para validar a existencia do novo cargo:
                    const validacao_cargo = cargoService.ListarPorNome(cargo);

                    if(validacao_cargo.error){ //retorna as mensagens de erro relacionada ao cargo:
                        return {"error":validacao_cargo.error};
                    }else{ //caso de o cargo ser válido:
                        
                        //criando o objeto da nova tribo a ser adicionada:
                        let novo_usuario = {
                            "codigo":(fonte_usuarios.length + 1),
                            "email":email,
                            "senha":senha,
                            "cargo":cargo
                        }
            
                        //adicionando a nova tribo na base de dados:
                        fonte_usuarios.push(novo_usuario);
            
                        //retornando o novo elemento adicionado:
                        return fonte_usuarios[fonte_usuarios.length-1];
                    }

                }else{ //retorna todas as mensagens de erro relacionada a senha:
                    return validacao_senha   
                }
                
            }else{
                //retornando a mensagem de erro:
                return {"error":"Email ja existe!"}
            }

        }else{
            //retornando a mensagem de erro:
            return {"error":"Email inválido!"}
        }

    }

    //método para retornar todas as tribos:
    ListarUsuarios(){
        //retornando todo o objeto com a base dos dados:
        return fonte_usuarios;
    }

    //método para listar uma tribo específica:
    ListarPorCodigo(codigo){
        //chamada ao método para buscar uma tribo específica por seu codigo:
        const resultado = buscar_usuario(codigo);

        if(resultado !== false){ //caso a tribo foi encontrada
            return fonte_usuarios[resultado]
        }else{
            return {"error":"Usuario não existe!"}
        }

    }

    //método para atualizar o email de um usuário
    AtualizarEmail(codigo, novo_email){
        
        //chamada ao método para retornar o objeto tribo específico e todos os seus dados caso existam:
        const resultado_busca = buscar_usuario(codigo);

        if(resultado_busca !== false){ //usuario encontrado 

            //chamada ao método para validar o formato do novo email:
            const validacao_email = emailValido(novo_email);

            if(validacao_email === true){ //email com formato válido:

                //validando se esse email ja esta em uso na base de dados:
                const busca_email = buscar_por_email(novo_email);
            
                //retorna o indice do usuário caso exista, caso contrário retorna false:
                if(busca_email === false){ //email nao cadastrado:

                    //atualizando o email do usuário:
                    fonte_usuarios[resultado_busca].email = novo_email;
        
                    //persistindo os dados atualizados na fonte de tribos:
                    fonte_usuarios[resultado_busca] = fonte_usuarios[resultado_busca];
                    
                    //retornando para o cliente o objeto atualizado
                    return fonte_usuarios[resultado_busca];  

                }else{ //email ja cadastrdo:
                    //retornando a mensagem de erro:
                    return {"error":"Email ja cadastrado!"}
                }

            }else{ //email com formato inválido:
               //retornando a mensagem de erro:
                return {"error":"Email inválido!"} 
            }

        }else{ //tribo nao existe na base de dados
            return {"error":"Usuario não existe!"}
        }

    }

    //método para atualizar a senha de um a usuario
    AtualizarSenha(codigo, nova_senha){

        //chamada ao método para retornar o objeto tribo específico e todos os seus dados caso existam:
        const resultado_busca = buscar_usuario(codigo);

        if(resultado_busca !== false){ //usuario encontrado 

            //chamada ao método para validar o formato da nova senha:
            const validacao_senha = senhaValida(nova_senha);

            if(validacao_senha.valido === true){ //caso de a senha ser válida:
                
                //atualizando a senha do usuário:
                fonte_usuarios[resultado_busca].senha = nova_senha;
    
                //persistindo os dados atualizados na fonte de tribos:
                fonte_usuarios[resultado_busca] = fonte_usuarios[resultado_busca];
                
                //retornando para o cliente o objeto atualizado
                return fonte_usuarios[resultado_busca];  

            }else{ //retorna todas as mensagens de erro relacionada a senha:
                return {"error":validacao_senha.error};
            }

        }else{ //tribo nao existe na base de dados
            return {"error":"Usuario não existe!"}
        }

    }

    //método para atualizar a senha de um a usuario
    AtualizarCargo(codigo_usuario, novo_cargo){

        //chamada ao método para retornar o objeto tribo específico e todos os seus dados caso existam:
        const resultado_busca = buscar_usuario(codigo_usuario);

        if(resultado_busca !== false){ //usuario encontrado 
            
            //instanciando um novo objeto CargoService:
            const cargoService = new CargoService();
            
            //chamada ao método para validar a existencia do novo cargo:
            const validacao_cargo = cargoService.ListarPorNome(novo_cargo);

            if(validacao_cargo.error){ //retorna as mensagens de erro relacionada ao cargo:
                return {"error":validacao_cargo.error};
            }else{ //caso de o cargo ser válido:

                //atualizando o cargo do usuário:
                fonte_usuarios[resultado_busca].cargo = novo_cargo;
    
                //persistindo os dados atualizados na fonte de tribos:
                fonte_usuarios[resultado_busca] = fonte_usuarios[resultado_busca];
                
                //retornando para o cliente o objeto atualizado
                return fonte_usuarios[resultado_busca];  
            }

        }else{ //tribo nao existe na base de dados
            return {"error":"Usuario não existe!"}
        }

    }

    //método para deletar uma tribo
    DeletarUsuario(codigo){
        //chamada ao método que retorna o indice da tribo específica caso exista:
        const resultado_busca = buscar_usuario(codigo);

        if(resultado_busca !== false){
            //chamada ao método Slice(indice, quantidadeExcludos), esse método me permite remover um elemento específico dentro do array*/;
            return fonte_usuarios.splice(resultado_busca, 1);
        }else{ //caso de a tribo não existir
            return {"error":"Usuario não existe!"}
        }
    }

}
