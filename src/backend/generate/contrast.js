/* Import Packages */
const {
  createCanvas,
  loadImage
} = require('canvas');
const request = require('node-superfetch');
const {
  contrast
} = require('../util/CanvasUtil');

/* Export Function */
module.exports = async function ContrastEndpoint(image) {
  try {
    const {
      body
    } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    contrast(ctx, 0, 0, data.width, data.height);
    const resimage = canvas.toBuffer();
    if (Buffer.byteLength(resimage) > 8e6) return [
      false,
      'Resulting image was above 8 MB'
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