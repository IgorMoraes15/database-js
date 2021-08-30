# SQL Raw **vs** Query Builder **vs** ORM
## _O que é cada um, prós e contras e diferenças_

Vamos entender um pouco o que é cada um, e também entender os prós e contras de cada um deles.

Tecnologias usadas para conhecimento:
- Driver do Postgres (SQL Raw) 
- Knex (Query Builder)
- Sequelize (ORM)

### **SQL Raw**

"Zero abstração".

SQL bruto, às vezes também chamado de SQL nativo, é a forma mais básica e de nível mais baixo de interação com o banco de dados. Você diz ao banco de dados o que fazer no idioma do banco de dados. 

A maioria dos desenvolvedores **deve saber noções básicas de SQL**. Isso significa como CRIAR tabelas e visualizações, como SELECIONAR e JUNTAR dados, como ATUALIZAR e EXCLUIR dados.


> Prós

- Flexibilidade

Por não ter nível de abstração superior, não somos limitados e conseguimos criar queries com mais clareza.

- Desempenho

Algumas camadas de abstração podem gerar queries ineficientes, gerando problemas para o banco de dados com isso, podemos criar as queries sem nenhum nível de "abstração" que possa atrapalhar a performance do banco de dados.

- Transparente

Entendendo SQL e sabendo que o nível de abstração é mais baixo, temos mais facilidade em entender o que está sendo executado.

> Contras

- Injeção de SQL

SQL Injection é um ataque a serviços que tem espaço reservado em uma consulta SQL, onde o invasor pode preencher de uma forma inesperada.

Podemos ver o exemplo abaixo:

```sql

SELECT user_id FROM users WHERE name='{name}' AND pw='{pw}';

```

Essa querie concatena as variáveis na string do sql, dando brechas para sql injection, que ficaria mais ou menos assim:

```sql

SELECT user_id 
FROM users
WHERE name='' AND pw=''
OR name='admin' AND '1'='1';

```

Isso basicamente retornará que o usuário entrou como administrador. Comportamento que não devemos permitir que acontece.

- Erros de digitação em SQL

Não tem muito o que falar, se o comando estiver errado, tabela, propriedade, sempre teremos erro. Ainda mais quando o dev não sabe sobre a estrutura de dados. Por isso, quando usamos SQL nativo, devemos validar com testes. (Na verdade, a gente tem que validar tudo com testes <3)

- Falta de suporte do editor

Meio besta, mas prejudica quem ainda não manja dos sql. E também confunde se a query estiver muito grande. Porém, deve haver plugins que tentam nos ajudar.

- Gerenciamento de mudanças

Havendo mudança no schema do banco de dados, fica por nossa conta manualmente de realizar as modificações em query que utilizava o modelo antigo.


### **Query Builder** (Construtores de consulta SQL)

"Camada fina de abstração", comparado com o sql raw.

Como o próprio nome diz pra gente, os construtores de consulta são bibliotecas que são escritas na linguagem de programação que você usa e usam classes e funções nativas para construir consultas SQL.

Aqui temos um nível acima de abstração comparado com o sql raw.

Os construtores de consultas geralmente têm uma interface fluente, portanto, as consultas são construídas por uma interface orientada a objetos que usa encadeamento de métodos.

```js
const rows = await db.from('users').select().where({ email: 'universe@igao.com' })

console.log(rows)
/*
[
  {
    id: '66b9c3ea-8270-4a73-bf12-aed96434ebcf',
    name: 'Igão Master of The Universe',
    email: 'universe@igao.com'
  }
]
*/

```

Veja que em nenhum momento escrevemos queries SQL nativas. Usamos apenas funções e objetos para construir a query.

Em javascript, a lib que usamos é o Knex, e ele permite escrever queries nativas para os casos que isso seja necessário.


> Prós

- Desempenho

Mesmo desempenho do que usar SQL bruto.

- Extensão de consulta

Dada a interface fluente, é mais fácil construir, estender e reutilizar consultas. Isso nos permite no futuro, caso seja necessário, migrar de um banco de dados para outro.

- Injeções SQL

Os construtores de consultas têm um mecanismo para inserir parâmetros nas consultas de maneira segura.

- Suporte ao editor

A parte boa, é que as queries vão ser feitas "programaticamente". Então, teremos suporte na sintaxe de escrita.

- Migração de banco de dados facilitada

Os construtores de consulta oferecem suporte a diferentes bancos de dados e tornam a troca de banco de dados mais fácil.

> Contras

- Gerenciamento de mudanças

Da mesma forma que o sql raw, havendo mudança no schema do banco de dados, fica por nossa conta manualmente de realizar as modificações em query que utilizava o modelo antigo.

- Conhecimento de SQL

É necessário conhecimentos de SQL para interagir com o banco de dados.

Aqui não seria nem um contra, e sim um requesito para utilizar a lib. 

- Conhecimento do Query Builder

Também não seria um contra, mas deverá ter um conhecimento com o query builder para gerar as queries.


### **ORM** (Object-Relational Mapping)

"Camada forte de abstração".

Object-Relational Mapping (Mapeamento Objeto-Relacional), como o nome já diz, é um padrão onde se mapeia a estrutura relacional do banco em objetos na linguagem em questão. 

Tabelas viram objetos, linhas viram atributos do objeto e relações entre tabela se transformam em relações entre objetos. Este é o nível mais alto de abstração. Você não precisa nem pensar em queries SQL.

Dessa forma, há uma representação nativa da linguagem e, portanto, os recursos do ecossistema de linguagens, como preenchimento automático e realce de sintaxe, funcionam.

> Prós

- Gerenciamento de mudanças

Alguns ORM vem com programas auxiliares  que podem detectar automaticamente quando seus modelos mudaram em comparação com o último estado conhecido do banco de dados, portanto, é capaz de criar arquivos de migração de esquema para você.

- Injeções de SQL

Como o ORM constrói as consultas por si mesmo, você está menos sujeito a sofrer com essas vulnerabilidades.

- Suporte ao editor

Suporte total do editor para realce e formatação automática, o que reduz a manutenção, tornando as consultas mais fáceis de ler.

- Migração de banco de dados facilitada

ORM oferece suporte total a diferentes bancos de dados, portanto, é fácil alternar entre diferentes soluções de banco de dados.

- Conhecimento de SQL

Em tese você não precisa saber de SQL, porém, precisamos ter alguns conhecimentos básicos para construir as tabelas e relacionamentos, e também saber debbugar.


> Contras

- Flexibilidade

Sendo o nível mais alto de abstração, você é limitado pelo que a solução ORM oferece.

- Desempenho

Ao executar consultas com ORMs, você tende a obter mais do que precisa. 

Isso se traduz em buscar mais informações e executar mais consultas do que as outras soluções.

Pode ser que o ORM gere queries muito mais complexas e ineficientes, onde entra o problema "N+1", que executa mais consultas do que o necessário para obter o mesmo resultado.

- Muito abstrato

ORMs são abstrações complexas de alto nível, portanto, quando você encontrar erros ou quiser alterar o comportamento padrão, teremos problemas.

- Conhecimento do ORM

Da mesma forma com o query builder, vejo essa questão como um requesito.

Porém, os ORMs são complexos de aprender, eles têm muitos recursos e maneiras diferentes de alcançar o mesmo resultado, então é difícil aprender a usá-los bem e geralmente não há como atender a todas as suas necessidades.

- Abstração Vazada

A abstração é uma moeda de dois lados: por um lado, simplifica as coisas. 

O desenvolvedor não precisa lidar com os detalhes da interação do banco de dados e da construção da consulta. 

Por outro lado, os desenvolvedores não estão cientes do que realmente consultam no banco de dados ou de quantas consultas enviam. Por esse motivo, algumas interações são mais ineficientes do que precisam ser.


## _Dando uma resumida sobre o assunto..._


> _Sobre o SQL Raw_

Abstração mínima, que nos permite entender o que de fato está sendo executado dentro do banco de dados. Isso nos gera uma clareza e segurança na execução. Mas claro, desde que estamos sabendo o que está sendo executado. Esse é o preço para aprender o SQL.

> _Sobre Query Builder_

Os Query Builders vivem no ponto ideal no plano de abstração. 

Eles fornecem abstração suficiente para facilitar a interação com o banco de dados e mitigar vulnerabilidades de segurança, além de manter a flexibilidade, o desempenho e a limpeza da arquitetura do uso de SQL bruto.

Porém, precisamos ter um conhecimento sobre SQL para conseguirmos utiliza-lo.

> _Sobre o ORM_

ORMs fornecem a mais alta forma de abstração e evitam erros de digitação não apenas em palavras-chave SQL, mas também em nomes de tabelas e colunas. 

Eles demoram mais para serem iniciados do que os construtores de consultas - tanto da perspectiva da curva de aprendizado quanto da perspectiva da sobrecarga de desenvolvimento inicial. 

Como eles se abstraem muito, há um risco maior de executar consultas caras ou muitas consultas.


## Beleza, agora qual é o melhor?

Ai depende...

Creio que tudo depende de como seu projeto está estruturado, ou pra onde você imagina que ele pode chegar.

- SQL Raw

Talvez para executarmos algumas queries mais analíticas, ou até mesmo scripts para facilitar, creio que seria a solução mais rápida.

- Query Builder

Na minha visão, se encaixa em todo tipo de projeto. Tanto para projetos grandes, como para pequenos.

A facilidade de utilização, e também a curva de aprendizado é muito rápida.

- ORM

Pensando em produtividade e legibilidade do código, pode ser um ponto super positivo para pensar em implementar alguma ORM.


### Fontes


| Fonte | URL |
| ------ | ------ |
| webdevdrops | https://www.webdevdrops.com/nodejs-banco-de-dados-orm-query-builder-driver-nativo |
| prisma | https://www.prisma.io/dataguide/types/relational/comparing-sql-query-builders-and-orms |
| levelup.gitconnected | https://levelup.gitconnected.com/raw-sql-vs-query-builder-vs-orm-eee72dbdd275 |

