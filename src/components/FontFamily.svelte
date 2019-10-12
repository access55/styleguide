<script>
	export let family;

</script>

<style>
	.family {
		height: 100%;
		width: 100%;

		display: flex;
		flex-flow: row wrap;
		align-content: center;
		align-items: center;
		text-align: center;
	}
	.family * {
		pointer-events: none;
	}
	.family span {
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
	.family span a {
		color: #fff;
	}
	.family span.clipboard {
		left: 25%;
	}
	.family span.copied {
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
	.family span:hover {
		text-decoration: underline;
	}
	.family:hover span:not(.copied) {
		opacity: 1;
		transform: translate(-50%, 0px);
		pointer-events: all;
	}
	.family:hover span:not(.copied) a {
		pointer-events: all;
	}

	.family::before {
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

	.family:hover::before {
		opacity: 0.75;
	}

	.name {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		text-transform: uppercase;
		font-weight: bold;
		letter-spacing: 1px;
		width: 100%;
	}
	.name small {
		font-size: 8px;
		opacity: 0.75;
	}

</style>

<div class="family">
	<div class="name">
		{family.name}<br/>
		<small>({family.desc})</small>
	</div>

	<span
		class="clipboard"
		data-clipboard-text={family.name}>copiar</span>

	<span>
		<a href={family.href} target="_blank">ver</a>
	</span>

	<span class="copied">copiado!</span>
</div>
