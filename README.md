# Nutri-Point Backend Service

### Development mode

To start the service in development mode first make sure to set the `DB_HOST` environment variable to `localhost`.

Start the database by running:

`npm run docker:db`

If you are starting the project for the first time, to migrate the DB model run:

`npm run migrate:dev`

To seed the database for the first time run:

`npm run seed`

Start the service with:

`npm run start:dev`

---

### Docker containers

To start the service inside docker container mode first make sure to set the `DB_HOST` environment variable to `postgres`.

Start the service with:

`npm run docker`

This will create two docker containers, one for the backend service and the other for the database.

To seed the database for the first time run:

`npm run docker:seed`
