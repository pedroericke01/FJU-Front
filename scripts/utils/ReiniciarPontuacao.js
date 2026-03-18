import { TriboService } from "../services/TriboService.js"; 

//funcao para resetar toda a pontuacao do rally:
export const Reiniciar_Pontuacao = ()=>{
    //instanciando um objeto do triboService:
    const triboService = new TriboService();

   //chamada ao método para reiniciar o rally:
    return triboService.ReinicarRally();
}
