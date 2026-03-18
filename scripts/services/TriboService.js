//modulo responsável por conter a classe com todos os controles sobre o elemento Tribo no sistema:

//importando a base de dados das tribos
import { fonte_tribos } from "../data/TriboData.js";

//método para retornar o índice de uma tribo específica caso ela exista dentro da base de dados:
const buscar_tribo = (chave)=>{

    const resultado = fonte_tribos.findIndex((tribo, indice)=>{
        if(tribo.codigo === chave){
            return tribo
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
export class TriboService{

    //método para criar uma nova tribo na base de dados:
    CriarTribo(nome, imagem, pontuacao){

        //verificando se a tribo que será criada ja existe na base de dados, 
        const resultado_busca = buscar_por_nome(nome);
        
        //retorna o indice da tribo caso exista, caso contrário retorna false:
        if(resultado_busca === false){
            //criando o objeto da nova tribo a ser adicionada:
            let nova_tribo = {
                "codigo":(fonte_tribos.length + 1),
                "nome":nome,
                "imagem":imagem,
                "pontuacao":pontuacao
            }

            //adicionando a nova tribo na base de dados:
            fonte_tribos.push(nova_tribo);

            //imprimindo a nova fonte_tribos atualizada no console:
            console.log(JSON.stringify(fonte_tribos));

            //retornando o novo elemento adicionado:
            return fonte_tribos[fonte_tribos.length-1];
        }else{
            //retornando a mensagem de erro:
            return {"error":"Tribo ja existe!"}
        }

    }

    //método para retornar todas as tribos:
    ListarTribos(){
        //retornando todo o objeto com a base dos dados:
        return fonte_tribos;
    }

    //método para listar uma tribo específica:
    ListarPorCodigo(codigo){
        //chamada ao método para buscar uma tribo específica por seu codigo:
        const resultado = buscar_tribo(codigo);

        if(resultado !== false){ //caso a tribo foi encontrada
            return fonte_tribos[resultado]
        }else{
            return {"error":"Tribo não existe!"}
        }

    }

    //método para atualizar a pontuacao de uma tribo
    AtualizarPontuacao(codigo, nova_pontuacao){
        //chamada ao método para retornar o objeto tribo específico e todos os seus dados caso existam:
        const resultado_busca = buscar_tribo(codigo);

        if(resultado_busca !== false){ //tribo encontrada            
            //atualizando a pontuacao da tribo:
            fonte_tribos[resultado_busca].pontuacao = nova_pontuacao;

            //persistindo os dados atualizados na fonte de tribos:
            fonte_tribos[resultado_busca] = fonte_tribos[resultado_busca];
            
            //retornando para o cliente o objeto atualizado
            return fonte_tribos[resultado_busca];
        }else{ //tribo nao existe na base de dados
            return {"error":"Tribo não existe!"}
        }
    }

    //método para reiniciar todas as pontuacoes das tribos:
    ReinicarRally(){

        fonte_tribos.map((tribo, indice)=>{
            //reiniciando a pontuacao da tribo específica:
            tribo.pontuacao = 0;

            //persistindo a atualizacao na base de dados:
            fonte_tribos[indice] = tribo;
        });

    }

    //método para deletar uma tribo
    DeletarTribo(codigo){
        //chamada ao método que retorna o indice da tribo específica caso exista:
        const resultado_busca = buscar_tribo(codigo);

        if(resultado_busca !== false){
            //chamada ao método Slice(indice, quantidadeExcludos), esse método me permite remover um elemento específico dentro do array*/;
            return fonte_tribos.splice(resultado_busca, 1);
        }else{ //caso de a tribo não existir
            return {"error":"Tribo não existe!"}
        }
    }

}
