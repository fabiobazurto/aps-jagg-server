# jagg

This is the server of Jagg books.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* NVM
* Node v12.18.2
* NPM 6.14.5
* MySQL Server


## NVM INSTALLATION

1. In order to install NVM use this command

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`

1. Close and reopen your terminal.

1. Install the right version of node
`nvm install v12`

1. Select the version you installed
`nvm use v12`

## Installation

* Clone this project
`git clone https://github.com/fabiobazurto/aps-jagg-server.git`
* `cd aps-jagg-server`
* `npm install`
* create a file called .env and edit with your database credentials
`NODE_ENV=DEVELOPMENT
DB_HOST=localhost
DB_USERNAME=<YOUR-DATABASE-USER>
DB_PASSWORD=<YOUR-PASSWORD-USER>
DB_NAME=<YOUR-DATABASE>
JWT_SECRET=somereallylongsecretkey`

* Install the ORM
`npm install -g sequelize-cli`
* Restore database schema
`sequelize-cli db:create
sequelize-cli db:migrate
sequelize-cli db:seed:all
`

## Running / Development

* `node server.js`
* Visit your graphql server at [http://localhost:4000](http://localhost:4000).

