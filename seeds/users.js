/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require("bcrypt");
exports.seed = async function (knex) {
    const bcrypt = require("bcrypt")
    const saltRounds = 10;
    // Deletes ALL existing entries

    await knex('users').del()
    await knex('users').insert([
        {name: 'John Doe', email: 'john.doe@example.com', password: await bcrypt.hash('password123', saltRounds)},
        {name: 'Jane Smith', email: 'jane.smith@example.com', password: await bcrypt.hash('password123', saltRounds)},
        {name: 'Bob Johnson', email: 'bob.johnson@example.com', password: await bcrypt.hash('password123', saltRounds)}
    ]);
};
