module.exports = class CanvasUtil {
    static shortenText(ctx, text, maxWidth) {
		let shorten = false;
		while (ctx.measureText(text).width > maxWidth) {
			if (!shorten) shorten = true;
			text = text.substr(0, text.length - 1);
        }
        
		return shorten ? `${text}...` : text;
	}
}