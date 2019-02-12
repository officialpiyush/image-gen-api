/* Import Packages*/
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

/* Initialize Middleware*/
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Functions */
function status(type, msg, res) {
    return res.json({sucess: type, message: msg})
}

/* Endpoints */

app.get('/image/achievement', async (req, res) => {
    if(!req.body.text) return status(false, 'No text Provided', res);
    const achievement = require('./backend/generate/achievement');
    const so = await achievement(req.body.text);
    if(!so) return status(false, 'Text More Than 50 Chars!', res);
    
    return status(true, so, res);
});

app.listen('3000', () => {
    console.log("Connected")
}); 