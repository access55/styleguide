<script>
	import { hexToRgb } from '../utils';

	export let color;

	const rgb = function(hex) {
		const { r, g, b } = hexToRgb(hex);
		const str = `rgb(${[r,g,b].join(',')})`;
		return str;
	};

</script>

<style>
	.color {
		height: 100%;
		width: 100%;

		display: flex;
		flex-flow: row wrap;
		align-content: center;
		align-items: center;
		text-align: center;
	}
	.color * {
		pointer-events: none;
	}

	.color span {
		position: absolute;
		opacity: 0;
		left: 75%;
		transform: translate(-50%, 10px);
		color: #fff;
		font-weight: bold;
		z-index: 3;
		font-size: 10px;
		transition: all 0.3s ease-in;
		text-transform: uppercase;
	}

	.color span.clipboard:nth-of-type(2) {
		left: 25%;
	}
	.color span.copied {
		left: 50%;
		opacity: 0;
	}
	:global(.--copied)::before {
		opacity: 0.75 !important;
	}
	:global(.--copied span:not(.copied)) {
		opacity: 0 !important;
	}
	:global(.--copied) span.copied {
		opacity: 1 !important;
		transform: translate(-50%, 0px);
	}
	.color span:hover {
		text-decoration: underline;
	}
	.color:hover span:not(.copied) {
		opacity: 1;
		transform: translate(-50%, 0px);
		pointer-events: all;
	}
	.color::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background: var(--primary);
		z-index: 2;
		opacity: 0;
		transition: opacity 0.3s 0.1s ease;
	}
	.color:hover::before {
		opacity: 0.75;
	}
	.name {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		text-transform: uppercase;
		font-weight: bold;
		letter-spacing: 1px;
	}
</style>

<div
	class="color"
	style='
		background-color: {color.hex};
		color: {color.color};
	'>

	<div class="name">{ color.name }</div>

	<span
		data-clipboard-text={color.hex}
		class="clipboard">hex</span>

	<span
		data-clipboard-text={rgb(color.hex)}
		class="clipboard">rgb</span>

	<span class="copied">copiado!</span>
</div>
