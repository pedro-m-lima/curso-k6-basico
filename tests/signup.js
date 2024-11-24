import http from 'k6/http';
import { sleep, check } from 'k6';
import uuid from './libs./uuid.js';

export const options = { // criando um objeto onde quando execurtamos o comando run vai rodar com usuario e duração parametrizados 
  vus: 10,
  duration: '30s',
};
export default function () {

  const url = "http://localhost:3333/signup"

  const payload = JSON.stringify( //JSON é um modulo nativo do JavaScript e stringify é uma função que Transforma um objeto jason em uma string mantendo seu formado
    { email: `${uuid.v4().substring(24)}@pedrok6.com`, password: 'pwd123' } //nome email abrimos uma interpolação de dados e chamamos a função que gera um identificador a cada usuario através da função.v4
  )
  
  //Objeto que define o cabeçalho da requisição
  const headers = { 
    'headers': {
      'Content-Type': 'application/json'
    }
  }

  //Atribuindo a requisição POST onde passa a url adiquirida na variavel, payload que contem um JSON com dados de acesso e o objeto headrs com o cabeçaho da requisição
  const res = http.post(url, payload, headers); 

  console.log(res.body) //log para exibir o corpo da requisição para validar testes

  //assert
  check(res, { //definindo um bloco que valida o resultado de "res"
    'status code deve ser 201': (r) => r.status === 201 //Aqui adicionamos um resultado esperado onde, (r) recebe o resultado da requisição res e valida se o status é igual a 201

  })

  sleep(1); //Utilizando o sleep adicionamos uma pausa de 1 segundo que seria a simulação de um usuário pensando.
}