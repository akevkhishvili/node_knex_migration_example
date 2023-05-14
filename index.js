const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'node_test'
    }
});

// define a route that calls myFunction()
app.get('/users', async (req, res) => {
    const users = await knex.select('*').from('users');

    // Return the users as a JSON response
    res.json(users);
});

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/store', async (req, res) => {
    try {
        //console.log(req);
        // Insert the user data into the database
        const result = await knex('users').insert({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        });

        // Return a success message
        res.json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

// start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
