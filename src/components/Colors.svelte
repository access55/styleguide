<script>
	import Color from "./Color.svelte";

	export let data;

</script>

<style>
	.colors {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}

	.colors > .item {
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
		.colors {
			justify-content: flex-start;
		}

		.colors > .item {
			flex: 0 150px;
			height: 150px;
			margin-right: 20px;
		}
	}

</style>

<div class="colors">
	{#each data as color}
		<div class="item">
			<Color {color} />
		</div>
	{/each}
</div>
