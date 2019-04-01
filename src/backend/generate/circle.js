const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');

module.exports = async function CircleEndpoint(image) {
    try {
        const { body } = await request.get(image);
        const data = await loadImage(body);
        const dimensions = data.width <= data.height ? data.width : data.height;
        const canvas = createCanvas(dimensions, dimensions);
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(data, (canvas.width / 2) - (data.width / 2), (canvas.height / 2) - (data.height / 2));

        return [
            true,
            canvas.toBuffer()
        ];
    } catch (err) {
        return [
            false,
            err.message
        ]
    }
}