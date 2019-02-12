/* Import Packages*/
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

/* Initialize Middleware*/
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Import All Endpoints */
/* TODO- V2 Class Based Endpoints */ // eslint-disable-line
const AchievementEndpoint = require('./backend/generate/achievement');

/* Functions */
function status(type, msg, res) {
    return res.json({sucess: type, message: msg})
}

/* Endpoints */

app.get('/image/achievement', async (req, res) => {
    if(!req.body.text) return status(false, 'No text Provided', res);
    const so = await AchievementEndpoint(req.body.text);
    if(!so) return status(false, 'Text More Than 50 Chars!', res);
    
    return status(true, so, res);
});

app.listen(process.env.port || '3000', () => { //eslint-disable-line
    console.log("[CONNECTION] Sucessfully Connected.")
}); 