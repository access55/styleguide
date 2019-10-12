<script>
	export let data;

</script>

<style>
	.icons > .item {
		margin-bottom: 20px;
	}

	.icons > .item > .name {
		font-size: 18px;
	}

	.icons > .item > .purpose {
		font-size: 14px;
	}

</style>

<div class="icons">
	{#each data as icon}
		<div class="item">
			<div class="name">
				<a href={icon.source} target="_blank">
					{icon.name}
				</a>
			</div>
			<div class="purpose">
				{icon.purpose}
			</div>
		</div>
	{/each}
</div>