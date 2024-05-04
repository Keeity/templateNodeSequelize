# NODE E SEQUELIZE

## Configurar o repositório:

   ## Para iniciar o repositório local:
   1. Cria uma pasta local e abre no VsCode
   2. Para iniciar novo projeto e criar package.json: `npm init` ou, se quiser responder sim a tudo, `npm init --y`
   3. Iniciar novo repositório local: `git init`

   ## Para copiar ou conectar ao repositório remoto:
   1. Copiar: `git clone <url>`
   2. Criar conexão: `Git remote add origin <url>`
   3. Para denominar main a branch principal: `git branch -M main`
   4. Encaminhar o primeiro push à main: `git push -u origin main`

   ## GITFLOW
   1. Criação da develop: `git checkout -b develop main`
   2. Publica após fazer commit: `git push origin develop`
   3. Criação das features: `git checkout -b feature/x`
   4. Publica após fazer commit: `git push origin feature/x`
   5. Cria PullRequest no GitHub
   6. Após mesclar as branches, puxar alterações na develop: `git checkout develop` e `git pull origin develop` 

## Rodar o repositório:

   ### Para começar a utilizar, é necessário instalar as dependencias:
   1. `npm install`
   2. Se for em ambiente local: `npm install --dev`
   3. Criar arquivo `.env` com base no arquivo `.env_example`

   ### Para rodar o repositório em ambiente local
   1. `npm run start`

## Interagindo com banco de dados com migrations:

   ### Criar uma migration
   1. `sequelize migration:generate --name xxxx`
   2. `npx sequelize-cli migration:generate --name criar_tabela_alunos`

   ### Rodar migrations. Opções:
   1. Opção nº 1: `sequelize db:migrate`
   2. Opção nº 2: `npx sequelize db:migrate`

   ### Reverter a última migration:
   1. `sequelize-cli db:migrate:undo`
   2. `npx sequelize-cli db:migrate:undo`

## Documentações:

   ## Documentação do Sequelize: `https://sequelize.org/docs/v6/core-concepts/model-basics/`

   ## Documentação do JWT: `https://jwt.io/`

   ## Documentação do Swagger: `https://swagger-autogen.github.io/docs`
