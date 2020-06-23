# COVID CHARTS

### em criacao ...

Este aplicativo tem o objetivo de capturar _casos_ e _obitos_ de COVID-19 em uma [fonte internacional](https://www.worldometers.info/coronavirus/) e disponibilizar, atraves de graficos, a comparacao entre paises por __Número de casos/obitos, casos/obitos a cada 1 milhao e porcentagem de casos/obitos da populacao__.

## Tecnologias - Linguagens

> Tecnologias e linguagens utilizados para esta aplicacao obter o melhor desempenho, agrupado por _captura e API_ e _interface_.

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

## Dados

> Recursos para gravacao e leitura dos dados de _casos_ e _obitos_

| Nome | Versao | Objetivo |
|---|---|---|
| Sync Request | 6.1.0 | Realizar a captura dos dados |
| SQLite | 3.27.2 | Banco de dados para salvar os dados capturados |
