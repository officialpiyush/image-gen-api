module.exports = class CanvasUtil {
    static shortenText(ctx, text, maxWidth) {
		let shorten = false;
		while (ctx.measureText(text).width > maxWidth) {
			if (!shorten) shorten = true;
			text = text.substr(0, text.length - 1);
        }
        
		return shorten ? `${text}...` : text;
    }
    static contrast(ctx, x, y, width, height) {
		const data = ctx.getImageData(x, y, width, height);
		const factor = (259 / 100) + 1;
		const intercept = 128 * (1 - factor);
		for (let i = 0; i < data.data.length; i += 4) {
			data.data[i] = (data.data[i] * factor) + intercept;
			data.data[i + 1] = (data.data[i + 1] * factor) + intercept;
			data.data[i + 2] = (data.data[i + 2] * factor) + intercept;
		}
        ctx.putImageData(data, x, y);
        
		return ctx;
	}
}