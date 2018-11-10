# strongwill-server

### Running locally 
Ensuring your database string is stored in .env, run

`docker-compose up`

### Deploying 

Ensuring your database string is stored in .env.production, run

`yarn deploy`

This will spin up a [now](https://zeit.co/now) server connected to that database. (You will need the `now` command available in your shell)

### Running tests 

`yarn test`
