
- create index.js
```javascript
//index.js
// this code is for demonstration only
const express = require('express');
const app = express();

app.get('/test', (req, res) => {
    res.send('true');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
```

```shell
npm install express
```

```shell
npm install -g node-dev
```

```shell
node-dev index.js
```

### If you get error like:

```
# \AppData\Roaming\npm\node-dev.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies
```
run this script (windows tested)
```shell
# ou may be prompted to confirm the change. Type "Y" and press Enter to confirm.
Set-ExecutionPolicy RemoteSigned
```
- Note that changing the execution policy can potentially make your system less secure, so you should only do this if you trust the scripts that you are running. It's a good practice to reset the execution policy back to its default setting when you are finished by running the following command:
```shell
Set-ExecutionPolicy Restricted
```

## Migrations

create database:

```shell
mysql -u your_db_user_name -p user_password
```
- name whatever you need like:node_test
```shell
CREATE DATABASE node_test
```

- install knex library

- or npm install knex pg --save for postgreSQL
```shell
npm install knex mysql --save
```

create knexfile.js file

```javascript
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: '<your_mysql_username>',
      password: '<your_mysql_password>',
      database: '<your_mysql_database>'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

```

- create migrations:

```shell
npx knex migrate:make create_users_table
```
```shell
npx knex migrate:make create_posts_table
```

edit migration files like:

```javascript
//users export
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
```

```javascript
//posts export
exports.up = function(knex) {
  return knex.schema.createTable('posts', function(table) {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.text('content').notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};
```

-run migration

```shell
npx knex migrate:latest --env development
```

if you need to add 1 or more fields on tabel you can use this script:

```shell
npx knex migrate:make add_age_to_users
```

- in javascript

```javascript
exports.up = function(knex) {
  return knex.schema.table('users', function(table) {
    table.integer('age');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('age');
  });
};
```

```shell
knex migrate:latest
```

## seeders

```shell
npx knex seed:make users
```

```javascript
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' },
    { name: 'Bob Johnson', email: 'bob.johnson@example.com' }
  ]);
};
```
```shell
npx knex seed:run
```
start server

```shell
node-dev index.js
```

video link: 