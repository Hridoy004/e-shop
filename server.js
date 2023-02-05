const Database = require('./database');

const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors());
app.options('*', cors());

// middle wares here
app.use(bodyParser.json());

const authentication = require('./authentication');
const product = require('./products');
const categories = require('./categories');

// loading module here
authentication(app);
product(app);
categories(app);

app.listen(3000, () => {
    console.log('server is running on port 3000');
    new Database().connect().then(() => {
        console.log('database connected');
    });
})