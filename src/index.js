/**
 * @author Piyush Bhangale <bhangalepiyush@gmail.com>
 * @license MIT
 * @version 0.0.2
 */

/* Import Packages*/
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./backend/util/Logger');
const Logger = new logger();

/* Initialize Middleware*/
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // eslint-disable-line

/* Import All Endpoints */
/* TODO- V2 Class Based Endpoints */ // eslint-disable-line

/**
 * @name AchievementEndpoint
 * @returns {Promise}
 */
const AchievementEndpoint = require('./backend/generate/achievement');

/**
 * @name ApprovedEndpoint
 * @returns {Promise}
 */
const ApprovedEndpoint = require('./backend/generate/approved');

/**
 * @name ContrastEndpoint
 * @returns {Promise}
 */
const ContrastEndpoint = require('./backend/generate/contrast');

/**
 * @name FrameEndpoint
 * @returns {Promise}
 */
const FrameEndpoint = require('./backend/generate/frame');

/**
 * @name InvertEndpoint
 * @returns {Promise}
 */
const InvertEndpoint = require('./backend/generate/invert');

/**
 * @name SepiatEndpoint
 * @returns {Promise}
 */
const SepiatEndpoint = require('./backend/generate/sepia');

/**
 * @name RejectedEndpoint
 * @returns {Promise}
 */
const RejectedEndpoint = require('./backend/generate/rejected');

/* Functions */

/**
 * @param {Boolean} type - Boolean Weather True or false
 * @param {String} msg -  The Message Parameter String
 * @param {Object} res - The Express res object
 * @returns {Object} - Returns JSON Object
 */
function status(type, msg, res) {
  if (type === false) res.status(400);

  return res.json({sucess: type, message: msg});
}

/**
 * 
 * @param {String} link - The Link Of The Image to Validate
 * @returns {Boolean} - Either True Or False
 */
function isImage(link) {
  let type = link.substring(link.lastIndexOf('.') + 1);
  let isPNG = /(png)/gi.test(type); //eslint-disable-line
  if (!isPNG) return false;

  return true;
}

/* Endpoints */

app.get('/image/achievement', async (req, res) => {
  if (!req.body.text) return status(false, 'No text Provided', res);
  const so = await AchievementEndpoint(req.body.text);
  if (!so) return status(false, 'Text More Than 50 Chars!', res);

  return status(true, so, res);
});

app.get('/image/approved', async (req, res) => {
  if (!req.body.url) return status(false, 'No URL Provided', res);
  let check = await isImage(req.body.url);
  if (!check) return status(false, 'The Image Isnt Of The PNG Type.');
  let result = await ApprovedEndpoint(req.body.url);

  return status(result[0], result[1], res);
});

app.get('/image/contrast', async (req, res) => {
  if (!req.body.url) return status(false, 'No URL Provided', res);
  let check = await isImage(req.body.url);
  if (!check) return status(false, 'The Image Isnt Of The PNG Type.');
  let result = await ContrastEndpoint(req.body.url);

  return status(result[0], result[1], res);
});

app.get('/image/frame', async (req, res) => {
  if (!req.body.url) return status(false, 'No URL Provided', res);
  let check = await isImage(req.body.url);
  if (!check) return status(false, 'The Image Isnt Of The PNG Type.');
  let result = await FrameEndpoint(req.body.url);

  return status(result[0], result[1], res);
});

app.get('/image/invert', async (req, res) => {
  if (!req.body.url) return status(false, 'No URL Provided', res);
  let check = await isImage(req.body.url);
  if (!check) return status(false, 'The Image Isnt Of The PNG Type.');
  let result = await InvertEndpoint(req.body.url);

  return status(result[0], result[1], res);
});

app.get('/image/sepia', async (req, res) => {
  if (!req.body.url) return status(false, 'No URL Provided', res);
  let check = await isImage(req.body.url);
  if (!check) return status(false, 'The Image Isnt Of The PNG Type.');
  let result = await SepiatEndpoint(req.body.url);

  return status(result[0], result[1], res);
});

app.get('/image/rejected', async(req, res) => {
  if(!req.body.url) return status(false, 'No URL Provided', res);
  let check = await isImage(req.body.url);
  if(!check) return status(false, 'The Image Isnt Of The PNG Type.');
  let result = await RejectedEndpoint(req.body.url);

  return status(result[0], result[1], res);
  });

app.listen(process.env.PORT || '3000', () => { // eslint-disable-line
  Logger.consuc();
});