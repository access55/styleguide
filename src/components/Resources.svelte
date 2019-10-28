<script>
	export let data;

</script>

<style>
	.domains > .item {
		margin-bottom: 20px;
	}

	.item > .name {
		font-size: 18px;
		margin-bottom: 4px;
	}

	.name > small {
		text-transform: uppercase;
		position: relative;
	}

	.name > small::after,
	.name > small::before {
		position: absolute;
		top: -1px;
		left: 4px;
		white-space: nowrap;
		text-decoration: underline;
		cursor: pointer;
		color: var(--primary);
		opacity: 1;
		transition: opacity 0.3s ease;
	}

	.name > small::after {
		content: 'copiar url';
		opacity: 1;
	}
	.name > small::before {
		content: 'copiado!';
		opacity: 0;
	}

	:global(.--copied small)::after {
		opacity: 0 !important;
	}

	:global(.--copied small)::before {
		opacity: 1 !important;
	}

	.item > .details {
		font-size: 13px;
		opacity: 0.75;
	}

</style>

<div class="domains">
	{#each data as domain}
		<div class="item">
			<div class="name">
				<a href={domain.domain} target="_blank">
					{domain.name}
				</a> | <small data-clipboard-text={domain.domain} class="clipboard" />
			</div>

			<div
				class="details">
				{domain.domain}
			</div>
		</div>
	{/each}
</div>