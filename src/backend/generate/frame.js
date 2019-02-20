/* Import Packages */
const {
  createCanvas,
  loadImage
} = require('canvas');
const path = require('path');
const request = require('node-superfetch');

/* Export Function */
module.exports = async function FrameEndpoint(image) {
  try {
    const base = await loadImage(
      path.join(__dirname, '..', 'assets', 'images', 'frame.png')
    );
    const {
      body
    } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    ctx.drawImage(base, 0, 0, data.width, data.height);
    const resimage = canvas.toBuffer();
    if (Buffer.byteLength(resimage) > 8e6) return [
      false,
      'Resulting image was above 8 MB.'
    ];

    return [
      true,
      resimage
    ];
  } catch (err) {
    return [
      false,
      err.message
    ];
  }
};