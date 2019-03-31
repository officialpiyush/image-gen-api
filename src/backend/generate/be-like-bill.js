const { createCanvas, loadImage, registerFont } = require("canvas");
const { wrapText} = require("../util/CanvasUtil");
const { stripIndents } = require("common-tags");
const path = require("path");

const texts = require("../assets/json/be-like-bill.json");

registerFont(path.join(__dirname,"..", "assets", "fonts", "Noto-Regular.ttf"), { family: "Noto" });
registerFont(path.join(__dirname, "..", "assets", "fonts", "Noto-CJK.otf"), { family: "Noto" });
registerFont(path.join(__dirname, "..", "assets", "fonts", "Noto-Emoji.ttf"), { family: "Noto" });

module.exports = async function BeLikeBillEndpoint(name) {
    if(name.length > 20) return false;
    const base = await loadImage(path.join(__dirname, '..', 'assets', 'images', 'be-like-bill.png'));
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.font = '23px Noto';
    const text = await wrapText(ctx, texts[Math.floor(Math.random() * texts.length)].replace(/{{name}}/gi, name), 569);
    ctx.fillText(stripIndents`
        This is ${name}.
        ${text.join('\n')}
        ${name} is smart.
        Be like ${name}.
    `, 31, 80);

    return canvas.toBuffer();
}
