//modulo responsável por conter a classe com todos os controles sobre o elemento Usuario no sistema:

//importando a base de dados das tribos
import { fonte_cargos } from "../data/CargoData.js";

//método para retornar o índice de uma tribo específica caso ela exista dentro da base de dados:
const buscar_cargo = (chave)=>{

    const resultado = fonte_cargos.findIndex((cargo, indice)=>{
        if(cargo.codigo === chave){
            return cargo
        }
    });

    if(resultado !== -1){ //caso de a tribo for encontrada
        return resultado
    }else{ //caso de a tribo nao existir
        return false
    }

}

//método para retornar o índice de uma tribo específica caso ela exista dentro da base de dados:
const buscar_por_nome = (chave)=>{
    
    const resultado = fonte_cargos.findIndex((cargo, indice)=>{
        if(cargo.cargo === chave){
            return cargo;
        }
    });

    if(resultado !== -1){ //caso de a tribo for encontrada
        return resultado
    }else{ //caso de a tribo nao existir
        return false
    }
}

//criando a classe:
export class CargoService{

    //método para criar um novo cargo na base de dados:
    CriarCargo(){}

    //método para retornar todos os cargos:
    ListarCargos(){
        //retornando todo o objeto com a base dos dados:
        return fonte_cargos;
    }

    //método para listar uma cargo específica a partir do seu codigo:
    ListarPorCodigo(codigo){

        //chamada ao método para buscar uma tribo específica por seu codigo:
        const resultado = buscar_cargo(codigo);

        if(resultado !== false){ //caso a tribo foi encontrada
            return fonte_usuarios[resultado]
        }else{
            return {"error":"Cargo não existe!"}
        }

    }
    
    //método para retornar um cargo específico a partir de seu nome
    ListarPorNome(cargo){
        //chamada ao método para buscar o indice de um cargo a partir de seu nome:
        const resultado = buscar_por_nome(cargo);

        if(resultado === false){
            return {"error":"Cargo não existe!"}
        }else{
            return fonte_cargos[resultado];
        }
    }

    //método para atualizar o email de um usuário
    AtualizarCargo(){}

    //método para deletar uma tribo
    DeletarCargo(){}

}
