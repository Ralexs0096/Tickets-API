# Tickets API

The main object of this project is to provide a helpful way to track the tickets used for controlling the cost of production in a textile factory in their different areas.

---

Review this [section](project-context.md) for more information about this project and its scope.

---

## How start the project on DEV

- First, we need to have [nodejs](https://nodejs.org/en), [Microsoft SQL server](https://www.microsoft.com/en-us/sql-server/sql-server-2019), and [Knex CLI](https://knexjs.org/guide/migrations.html#migration-cli) already installed.
- Then you have to clone the repo

```js
https://github.com/Ralexs0096/Tickets-API
```

- Once it is cloned, we must provide the database and server port credentials creating a new file called **.env**.
  Please use the **.env.example** file as a reference.

If you are using docker, you can find an `docker-compose` file on the root of the project, this file will allow you to get a MSSQL instance quickly (remember adjust the SA password to match with .env variables)

- Next, we create the database with the following command:

```js
npm run create:database
```

- Then, we need to create all the tables of the project, for that, we will use the Knex CLI executing this command

```js
knex migrate:latest
```

- Now, we have to generate all types with this command:

```js
npm run generate:types
```

- With all tables created and the correct DB config set, we can start the project executing

```js
npm run dev
```
