# COVID CHARTS


> Este aplicativo tem o objetivo de capturar _casos_ e _obitos_ de COVID-19 em uma [fonte internacional](https://www.worldometers.info/coronavirus/) e disponibilizar, atraves de graficos, a comparacao entre paises por __Número de casos/obitos, casos/obitos a cada 1 milhao e porcentagem de casos/obitos da populacao__.


### Documentacao:

* [Tecnologias](#tecnologias)
* [Infraestrutura](#infraestrutura)
* [Base de dados](#base-de-dados)
* [Ambiente desenvolvimento](#ambiente-desenvolvimento)
* [Ambiente Producao](#ambiente-producao)

## Tecnologias

> Tecnologias e linguagens utilizadas nesta aplicacao para obter melhor desempenho, agrupado por _captura e API_ e _interface_.

#### Captura e API

| Nome | Versao | Objetivo |
|---|---|---|
| NodeJS | 10.17.0 | Interpretador Javascript |
| NPM | 6.11.3 | Gerenciar dependencias |
| Typescript | 3.8.3 | Transpiler para NodeJS |

#### Interface

| Nome | Versao | Objetivo |
|---|---|---|
| NodeJS | 10.17.0 | Interpretador Javascript |
| NPM | 6.11.3 | Gerenciar dependencias |
| VueJS | 2.6.11 | Framework Javascript |
| Bootstrap | 4.4.1 | Framework CSS |

## Infraestrutura

> __Compatibilidade de infraestrutura__ deste este projeto, agrupado por _captura_, _API_ e _Interface_. 

### Captura de dados

| Nome | Objetivo |
|---|---|
| AWS CloudWatch | Agendamento de captura de dados |
| AWS Lambda (NodeJS) | Execucao de captura de dados |
| AWS EC2 (NodeJS) | Execucao de captura de dados |
| AWS ECS (NodeJS) | Execucao de captura de dados |
| Crontab | Agendamento de captura de dados |
| Cloud server (NodeJS) | Execucao de captura de dados |

### API

| Nome | Objetivo |
|---|---|
| AWS API Gateway | Configurar rotas disponiveis para API |
| AWS Lambda (NodeJS) | Disponibilizar dados por execucao do API Gateway |
| AWS EC2 (Nginx + NodeJS) | Disponibilizar API de dados |
| AWS ECS (Nginx + NodeJS) | Disponibilizar API de dados |
| Cloud server (Nginx + NodeJS) | Disponibilizar API de dados |

### Interface

| Nome | Objetivo |
|---|---|
| AWS S3 | Diretorio virtual para salvar arquivos estatico |
| AWS Cloudfront | Exibir arquivos estatico salvos no S3 |
| AWS EC2 (Nginx) | Disponibilizar arquivos estatico |
| AWS ECS (Nginx) | Disponibilizar arquivos estatico |
| Cloud server (Nginx) | Disponibilizar arquivos estatico |

## Base de dados

> Recursos para gravacao e leitura dos dados de _casos_ e _obitos_

| Nome | Versao | Objetivo |
|---|---|---|
| Sync Request | 6.1.0 | Realizar a captura dos dados |
| SQLite | 3.27.2 | Banco de dados para salvar os dados capturados |


## Ambiente desenvolvimento

> Para maior facilidade utilize [Visual Studio Code](https://code.visualstudio.com/) para edicao de codigo.

O repositorio deste projeto esta dividido em duas partes, sendo `api/` (API e captura de dados) e `frontend/` (interface).


* Faca uma copia do repositorio
```bash
$ git clone https://github.com/00F100/covid-chart.git
```

* Copie as variaveis de ambiente, conforme abaixo:
```bash
$ cp api/.env-dev api/.env
$ cp frontend/.env-dev frontend/.env
```

* Faca os ajustes nas variaveis, conforme abaixo:

> Variaveis de ambiente API `api/.env`

| Variavel | Tipo | Objetivo |
|---|---|---|
| API_PORT | integer | Porta onde a API vai estar disponivel |
| DATASOURCE_lOCATION | string | Path para o diretorio onde se encontra o arquivo `database.sqlite` |
| VIEW_INDEX | string | Path para o diretorio `api\src\public` |
| LOGGER_LEVEL | string | Level do log, ex: info, debug, warn, error, fatal |
| LOGGER_TYPE | string | Saida do log, ex: console |
| LOGGER_FILE | string | Path para arquivo de log |
| DIR_NAME | string | Path para o diretorio `api\src` |
| NODE_ENV | string | Modo de execucao do NodeJS |

> Variaveis de ambiente Frontend `frontend/.env`

| Variavel | Tipo | Objetivo |
|---|---|---|
| VUE_APP_API_SCHEMA | string | Schema da API de dados, ex: http |
| VUE_APP_API_HOST | string | Dominio da API de dados, ex: localhost |
| VUE_APP_API_PORT | integer | Porta da API de dados, ex: 3000 |
| VUE_GOOGLE_ANALYTICS_TAG | string | Tag GA para acompanhamento |

* Apos execute `npm install`, conforme abaixo:

API
```bash
$ cd api && npm install
```

Interface
```bash
$ cd frontend && npm install
```

----

#### API

Visual Studio:

> No `Debug` selecione `API Web server (TypeScript)` e execute.

Terminal:

> Execute `cd api && npm run api-develop`

----

#### Captura de dados

Visual Studio:

> No `Debug` selecione `Handle Extract (TypeScript)` e execute.

Terminal:

> Execute `cd api && node dist/bootstrap/handler.js extract [idCountry]` onde `[IdCountry]` e o ID do pais no banco de dados `datasource.sqlite`.

----

#### Verificar integridade do banco de dados antes de atualizar

Visual Studio Code:

> No `Debug` selecione `Handle Test Datasource (TypeScript)` e execute.

Terminal:

> Execute `cd api && node dist/bootstrap/handler.js test-datasource`

----

#### Interface

No `terminal bash` execute:

```bash
$ cd frontend && npm run serve
```

## Ambiente Producao

### Nginx

Interface

```
server {
   server_name covidlast.com www.covidlast.com;
   listen 443 ssl http2;
   root /var/www/frontend;
   ssl on;
   ssl_certificate      /etc/nginx/ssl/covidlast.pem;
   ssl_certificate_key  /etc/nginx/ssl/covidlast.key;
   location / {
      index index.html;
   }
}
```

API

```
server {
   server_name api.covidlast.com;
   listen 443 ssl http2;
   ssl on;
   ssl_certificate      /etc/nginx/ssl/covidlast.pem;
   ssl_certificate_key  /etc/nginx/ssl/covidlast.key;
   location / {
        proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header   Host $http_host;
        proxy_pass         http://localhost:3000;
   }
}
```

----

### API

Build:

```bash
$ git clone https://github.com/00F100/covid-chart.git
$ cd covid-chart/api
$ cp .env-prd .env
$ npm install && npm run build
```

Deploy:

```bash
$ cd covid-chart/api
$ sudo kill `ps -ef | grep node | grep -v grep | awk '{print $2}'` || true
$ sudo nohup node dist/bootstrap/web.js > /var/log/covidlast-api-nohup.log &
```

### Interface

Build:

```bash
$ git clone https://github.com/00F100/covid-chart.git
$ cd covid-chart/frontend
$ cp .env-prd .env
$ npm install && npm run build
```

Deploy:

```bash
$ cp covid-chart/frontend/dist/* /var/www/frontend
```