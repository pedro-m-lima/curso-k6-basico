# Curso Básico - Introdução aos testes de performance com k6

## 👨🏻‍💻 Como executar o projeto

- Para mais detalhes de configuração e execução dos testes, deixo aqui o link do [repositório original](https://github.com/weareqacademy/curso-k6-basico)  e também o link do [curso gratuito](https://www.youtube.com/watch?v=6n69I_l3FEM&list=PLn2i8I7W73irNVpzHDU2oKWCKLa2VPWEx&pp=iAQB) disponibilizado no youtube
----

# 📚 Resumo sobre o aprendizado:  [![GitHub](https://img.shields.io/badge/GitHub-pedro--m--lima-blue?style=for-the-badge&logo=github)](https://github.com/pedro-m-lima)

### 🌟 Contexto geral
- [**Documentação K6**](https://grafana.com/docs/k6/latest/)
- **Utilizado para Testes de Performance**
- **Ferramenta ganhando popularidade**
- **Principal concorrente do Jmeter**
- **Duas versões**:
  - **OpenSource**: Executa testes locais
  - **Cloud**: Executa testes online, exibe dashboards e controle de testes
- **Sintaxe JavaScript**
  - **Não roda no Node.js** (Construído em Go)

### 📅 Estrutura do Curso
- **Ferramentas utilizadas**:
  - **Git**
  - **Git bash**
  - **Visual Studio Code**
- **API de cadastro de Usuário**
- **Requisitos funcionais e não funcionais**
  - Testes feitos com base nos requisitos não funcionais

### Estrutura do projeto
- [tests\hello.js](tests\hello.js)
    - Neste arquivo foi criado um teste que valida que ao realizar um requisação get na url é retornado um status code 200.
    - Para visualizar o resultado do teste veja abrindo o [Report K6 - tests\summary.html]()
- [tests\signup.js](tests\signup.js)
    - Neste script foi enviado o usuário e email para fazer cadastro de usuário e realizado algumas validações, como StatusCode, http_req_duration, http_req_failed, quantidade de usuário por requisição e duração do teste.
    - Para visualizar o resultado do teste veja abrindo o[Report K6 - tests\summary_signup.html]()
- [tests\signup-load.js](tests\signup-load.js)
    - Neste script foi criado um teste de carga passando um grande volume de dados porém que esteja dentro da especificações funcionais do sistema.
    - Para visualizar o resultado do teste veja abrindo o [Report K6 - tests\summary_signupLoad.html]()
- [tests\signup-smoke.js](tests/signup-smoke.js)
    - Neste script foi criado um teste com apenas 1 usuário por requisição apenas para verificar que o ambiente funciona, garantindo que caso tenha tido mudanças no sistemas o mesmo não deixou de funcionar o básico.
    - Para visualizar o resultado do teste veja abrindo este [Report K6 - tests\summary_signupSmoke.html]()
- [tests\summary_signupStress.html](tests\summary_signupStress.html)
    - Neste script foi configurado um estagio de verificações que envia varias requisições que extrapola as regras funcionais do sistema, garantindo que as mesmas continuam funcionando.
    - Para visualizar o resultado do testes veja abrindo o [Report K6 - tests\summary_signupStress.html]()


### ⚙️ Comandos/Funções/Bibliotecas/Plugins aprendidos:
- **Executar teste K6**:
  ```sh
  k6 run nomeArquivo.js
    ````
- **--vus:**:
    - Passando VUs por linha de comando:
    ````sh
    k6 run --vus 10 hello.js
    ````
    
    - Definindo VUs padrão:
    ````javascript
    export const options = {
    vus: 10
    };
    ````

- **--duration:**:
    - Passando Duração por linha de comando:
    ````sh
    k6 run --vus 10 hello.js
    ````
    
    - Definindo duração padrão:
     ````javascript
    export const options = {
    vus: 10
    };
    ````

- **Funções:**:
    - Check(): Realiza validações nos testes 
    - sleep(): Simula um usuário pensando

- **Thresholds:** Configurando limites na execução:
    - **http_req_duration:** Percentual limite aceitável em milissegundos para considerar um teste como sucesso
    - **http_req_failed:** Percentual de erro aceitável nas requisições
    ````javascript
    export const options = { 
        thresholds: {
        http_req_duration: ['p(95)<2000'],
        http_req_failed: ['rate<0.01']
        }
    };
    ````

### Tipos de Teste
- **Smoke Testing:** Utilizado para validar a sanidade do ambiente. Exemplo:
````javascript
export const options = { 
  vus: 1, // Usuário
  duration: '1m' // Duração de 1 minuto
};
````

- **Teste de Carga:** Validar picos de requisições. Exemplo:
````javascript
export const options = { 
  stages: [
    { duration: '1m', target: 100 },
    { duration: '2m', target: 100 },
    { duration: '1m', target: 0 }
  ]
};    
````

- **Teste de Estresse:** Ultrapassar os limites definidos. Exemplo:
````javascript
export const options = { 
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 },
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }
  ]
};
````

## 📊 K6 Report
- Plugin terceiro para visualizar a execução dos testes [Documentação K6 report](https://github.com/benc-uk/k6-reporter)

Como utilizar:
````javascript
//Adicione esse trecho para importar o k6 report
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

//Adicione essa função para gerar o k6 report
export function handleSummary(data) {
  return {
    "summary_signup.html": htmlReport(data),
  };
}
````
    Para mais detalhes veja a documentação no link passado no inicio desse bloco

### 📈 Métricas HTTP
- data_received: Quantidade de bytes recebidos na requisição HTTP

- data_sent: Quantidade de bytes enviados

- http_req_duration: Tempo total de envio e retorno da requisição

- Iterations: Quantidade e duração dos cenários de testes

- VUs: Quantidade de Usuários Virtuais que enviaram requisições

- http_req_blocked: Tempo gasto aguardando um slot de conexão TCP livre

- http_reqs: Quantidade de solicitações HTTP totais geradas

- http_req_connecting: Tempo gasto estabelecendo a conexão TCP

- http_req_tls_handshaking: Tempo gasto no handshake TLS

- http_req_sending: Tempo gasto enviando dados

- http_req_waiting: Tempo aguardando resposta (TTFB)

- http_req_receiving: Tempo recebendo dados

- http_req_failed: Taxa de solicitações com falha

Passando VUs por linha de comando:

---