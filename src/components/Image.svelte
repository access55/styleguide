<script>
	import FileSaver from "file-saver";

	export let src;
	export let placeholder = false;
	export let filename;
	export let alt;
	export let classlist;

	function handleClick() {
		const target = this.dataset.target;
		const filename = this.dataset.filename;
		if (target) {
			FileSaver.saveAs(target, filename);
		};
	}

</script>

<style>
	.image {
		height: 100%;
		width: 100%;

		display: flex;
		flex-flow: row wrap;
		align-content: center;
		align-items: center;
		text-align: center;
	}
	.image * {
		pointer-events: none;
	}
	.image span {
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
	.image span.clipboard {
		left: 25%;
	}
	.image span.copied {
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
	.image span:hover {
		text-decoration: underline;
	}
	.image:hover span:not(.copied) {
		opacity: 1;
		transform: translate(-50%, 0px);
		pointer-events: all;
	}
	.image::before {
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
	.image:hover::before {
		opacity: 0.75;
	}
	.image img {
		flex: 0 auto;
		height: auto;
		width: 100%;
		text-align: center;
	}

</style>

<div class="image">
	<img src={placeholder || src} {alt} />

	<span
		class="clipboard"
		data-clipboard-text={src}>copiar</span>

	<span
		data-target={src}
		data-filename={filename}
		on:click={handleClick}>baixar</span>

	<span class="copied">copiado!</span>
</div>
