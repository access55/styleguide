<script>
	import FontFamily from './FontFamily.svelte';

	export let data;

</script>

<style>
	.typography {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}

	.typography > .item {
		cursor: pointer;
		position: relative;
		flex: 0 100px;
		height: 100px;
		margin: 0 0 20px;
		display: flex;
		flex-flow: row wrap;
		align-content: center;
		align-items: center;
		text-align: center;
		border: 1px solid var(--grey4);
	}

	@media only screen and (min-width: 760px) {
		.typography {
			justify-content: flex-start;
		}

		.typography > .item {
			flex: 0 150px;
			height: 150px;
			margin-right: 20px;
		}
	}

</style>

<div class="typography">
	{#each data as family}
		<div class="item">
			<FontFamily {family} />
		</div>
	{/each}
</div>
