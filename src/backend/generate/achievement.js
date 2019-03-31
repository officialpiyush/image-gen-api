/* Import Packages */
const {createCanvas, loadImage, registerFont} = require('canvas');
const path = require('path');
const {shortenText} = require('../util/CanvasUtil');
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Minecraftia.ttf'), {
  family: 'Minecraftia'
});

/* Export Function */
module.exports = async function AchievementEndpoint(text) {
  if (text.length > 50) {
    return false;
  }
  const base = await loadImage(
    path.join(__dirname, '..', 'assets', 'images', 'achievement.png')
  );
  const canvas = createCanvas(base.width, base.height);
  const ctx = await canvas.getContext('2d');
  ctx.drawImage(base, 0, 0);
  ctx.font = '17px Minecraftia';
  ctx.fillStyle = '#ffff00';
  ctx.fillText('Achievement Get!', 60, 40);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(shortenText(ctx, text, 230), 60, 60);

  return canvas.toBuffer();
};