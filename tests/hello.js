import http from 'k6/http';
import { sleep, check} from 'k6'; //Importação de funções
export const options = {
  //vus: 1,
  //duration: '30s',
};
export default function () {
  const res = http.get('http://localhost:3333'); //Atribuindo a requisição get a constante res
  
  //assert
  check(res, { //definindo um bloco que valida o resultado de "res"
        'status code deve ser 200': (r) => r.status === 200 //Aqui adicionamos um resultado esperado onde, (r) recebe o resultado da requisição res e valida se o status é igual a 200

  })

  sleep(1); //Utilizando o sleep adicionamos uma pausa de 1 segundo que seria a simulação de um usuário pensando.
}