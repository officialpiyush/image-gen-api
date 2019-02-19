/* Import Packages */
const {
    createCanvas,
    loadImage
} = require('canvas');
const request = require('node-superfetch');

/* Export Function */
module.exports = async function ProfileEndpoint(image) {
    try {

        const canvas = createCanvas(700, 250);
	    const ctx = canvas.getContext('2d');
        const base = await loadImage(path.join(__dirname, '..', 'assets', 'images', 'profile.png'));
        ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
        // Some Text
        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Test', canvas.width / 2.5, canvas.height / 3.5);
    
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
    
        const { body: buffer } = await request.get(image);
        const avatar = await loadImage(buffer);
        ctx.drawImage(avatar, 25, 25, 200, 200);
        const resimage = canvas.toBuffer();
        if (Buffer.byteLength(resimage) > 8e+6) return [
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
        ]
    }
}