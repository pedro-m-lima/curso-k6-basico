import http from 'k6/http';
import { sleep, check } from 'k6';
import uuid from './libs./uuid.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  return {
    "summary_signupSmoke.html": htmlReport(data),
  };
}

//Neste teste de fumação utilizamos 1 usuário e duração de 1minutos para rodas os testes, isto faz com que consigamos validar que o ambiente esta funcionando corretamente, sem forçar uma grande bateria de testes e sem iniciar uma mini carga

export const options = { 
  vus: 1, //Alterado o usuário para 1
  duration: '1m', //configurado duração para 1 minuto
  thresholds: {
    http_req_duration: ['p(95)<2000'], 
    http_req_failed: ['rate<0.01'] 
  }
};
export default function () {

  const url = "http://localhost:3333/signup"

  const payload = JSON.stringify( 
    { email: `${uuid.v4().substring(24)}@pedrok6.com`, password: 'pwd123' }
  )
  
  const headers = { 
    'headers': {
      'Content-Type': 'application/json'
    }
  }

  const res = http.post(url, payload, headers); 

  console.log(res.body) 

  check(res, { 

  })

  sleep(1); 
}