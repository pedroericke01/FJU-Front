//modulo responsável por conter a classe com todos os controles sobre o elemento Tribo no sistema:

//importando a base de dados das tribos
import { fonte_nacao } from "../data/NacaoData.js";

//método para retornar o índice de uma tribo específica caso ela exista dentro da base de dados:
const buscar_nacao = (chave)=>{
    const resultado = fonte_nacao.findIndex((nacao, indice)=>{
        if(nacao.codigo === chave){
            return nacao
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
    const resultado = fonte_nacao.findIndex((nacao, indice)=>{
        if(nacao.nome === chave){
            return nacao
        }
    });

    if(resultado !== -1){ //caso de a tribo for encontrada
        return resultado
    }else{ //caso de a tribo nao existir
        return false
    }
}

//criando a classe:
export class NacaoService{

    //método para criar uma nova tribo na base de dados:
    CriarNacao(nome, imagem, pontuacao){
        //verificando se a tribo que será criada ja existe na base de dados, 
        const resultado_busca = buscar_por_nome(nome);
        
        //retorna o indice da tribo caso exista, caso contrário retorna false:
        if(resultado_busca === false){

            //criando o objeto da nova tribo a ser adicionada:
            let nova_nacao = {
                "codigo":(fonte_nacao.length + 1),
                "nome":nome,
                "imagem":imagem,
                "pontuacao":pontuacao
            }

            //adicionando a nova tribo na base de dados:
            fonte_nacao.push(nova_nacao);

            //retornando o novo elemento adicionado:
            return fonte_nacao[fonte_nacao.length-1];

        }else{
            //retornando a mensagem de erro:
            return {"error":"Nacao ja existe!"};
        }

    }

    //método para retornar todas as tribos:
    ListarNacoes(){
        //retornando todo o objeto com a base dos dados:
        return fonte_nacao;
    }

    //método para listar uma tribo específica:
    ListarPorCodigo(codigo){
        //chamada ao método para buscar uma tribo específica por seu codigo:
        const resultado = buscar_nacao(codigo);

        if(resultado !== false){ //caso a tribo foi encontrada
            return fonte_nacao[resultado]
        }else{
            return {"error":"Nacao não existe!"};
        }

    }

    //método para atualizar a pontuacao de uma tribo
    AtualizarPontuacao(codigo, nova_pontuacao){
        //chamada ao método para retornar o objeto tribo específico e todos os seus dados caso existam:
        const resultado_busca = buscar_nacao(codigo);

        if(resultado_busca !== false){ //tribo encontrada            
            //atualizando a pontuacao da tribo:
            fonte_nacao[resultado_busca].pontuacao = nova_pontuacao;

            //persistindo os dados atualizados na fonte de tribos:
            fonte_nacao[resultado_busca] = fonte_nacao[resultado_busca];
            
            //retornando para o cliente o objeto atualizado
            return fonte_nacao[resultado_busca];
        }else{ //tribo nao existe na base de dados
            return {"error":"Nacao não existe!"};
        }
    }

    //método para deletar uma tribo
    DeletarNacao(codigo){
        //chamada ao método que retorna o indice da tribo específica caso exista:
        const resultado_busca = buscar_nacao(codigo);

        if(resultado_busca !== false){
            //chamada ao método Slice(indice, quantidadeExcludos), esse método me permite remover um elemento específico dentro do array*/;
            return fonte_nacao.splice(resultado_busca, 1);
        }else{ //caso de a tribo não existir
            return {"error":"Nacao não existe!"};
        }
    }

}
