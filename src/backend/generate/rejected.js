const {
    createCanvas,
    loadImage
} = require('canvas');
const path = require('path');
const request = require('node-superfetch');

/* Export Function */
module.exports = async function RejectedEndpoint(image) {
    try {
        const base = await loadImage(path.join(__dirname, '..', 'assets', 'images', 'rejected.png'));
        const { body } = await request.get(image);
        const data = await loadImage(body);
        const canvas = createCanvas(data.width, data.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(data, 0, 0);
        const dataRatio = data.width / data.height;
        const baseRatio = base.width / base.height;
        let { width, height } = data;
        let x = 0;
        let y = 0;
        if (baseRatio < dataRatio) {
            height = data.height;
            width = base.width * (height / base.height);
            x = (data.width - width) / 2;
            y = 0;
        } else if (baseRatio > dataRatio) {
            width = data.width;
            height = base.height * (width / base.width);
            x = 0;
            y = (data.height - height) / 2;
        }
        ctx.drawImage(base, x, y, width, height);
        const resimage = canvas.toBuffer();

        if (Buffer.byteLength(resimage) > 8e+6) return [
            false,
            'Resulting image was above 8 MB.'
        ]

        return [
            true,
            resimage
        ]
    } catch (err) {
        return [
            false,
            err.message
        ]
    }
}