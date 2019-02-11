/* Import Packages*/
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

/* Initialize Middleware*/
app.use(cors());
app.use(bodyParser.json());

/* Endpoints */

app.get('/image/achievement', async (req, res) => {
    console.log(req, res);
})