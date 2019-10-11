import ClipboardJS from "clipboard";

export const hexToRgb = hex => {
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
		return r + r + g + g + b + b;
	});

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

export const clipboard = new ClipboardJS('.clipboard');

clipboard.on('success', function(e) {
	const trigger = e.trigger;
	const parent = trigger.parentNode;

	parent.classList.add('--copied');

	setTimeout(() => {
		parent.classList.remove('--copied');
	}, 1300);

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

