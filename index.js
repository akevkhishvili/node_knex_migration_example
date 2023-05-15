const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME

const cors = require('cors');

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'null','http://localhost:3000/users','http://127.0.0.1:3000/users']
};

app.use(cors(corsOptions));

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: dbHost,
        user: dbUser,
        password: dbPassword,
        database: dbName
    }
});
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// define a route that calls myFunction()
app.get('/users', async (req, res) => {
    const users = await knex.select('*').from('users');

    // Return the users as a JSON response
    res.json(users);
});

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.post('/store', async (req, res) => {
    try {
        // Insert the user data into the database
        const result = await knex('users').insert({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        });

        // Return a success message
        res.json({message: 'User created successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

// start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
