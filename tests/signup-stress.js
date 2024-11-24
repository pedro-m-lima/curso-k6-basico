import http from 'k6/http';
import { sleep, check } from 'k6';
import uuid from './libs./uuid.js';

//No teste de carga conseguimos definir picos de requisições dentro de um determinado stagio
export const options = { 
  stages: [
    {duration: '2m', target: 100},
    {duration: '5m', target: 100},
    {duration: '2m', target: 200},
    {duration: '5m', target: 300},
    {duration: '2m', target: 400},
    {duration: '5m', target: 400},
    {duration: '10m', target: 0},
  ],
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