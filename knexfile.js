module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'node_test'
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
