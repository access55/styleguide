<script>
	import Image from "./Image.svelte";

	export let data;

</script>

<style>
	.images {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}

	.images > .item {
		flex: 0 100px;
		height: 100px;
		border: 1px solid var(--grey4);
		padding: 10px;
		position: relative;
		text-align: center;
		cursor: pointer;
		margin: 0 0 20px;

		display: flex;
		flex-flow: row wrap;
		align-content: center;
		align-items: center;
	}

	.images > .item.alt,
	.images > .item.xd,
	.images > .item.fav,
	.images > .item.ppt,
	.images > .item.key {
		background: var(--primary);
	}

	.images > .item.fav,
	.images > .item.ppt,
	.images > .item.xd,
	.images > .item.key {
		padding: 0;
	}

	.images > .item.fav::after {
		color: #fff;
		content: 'favicons';
		font-size: 12px;
		font-weight: bold;
		left: 50%;
		letter-spacing: 1px;
		position: absolute;
		text-align: center;
		text-transform: uppercase;
		transform: translate(-50%, 0);
	}

	.images > .item.key::after {
		color: #fff;
		content: 'template keynote';
		font-size: 12px;
		font-weight: bold;
		left: 50%;
		letter-spacing: 1px;
		position: absolute;
		text-align: center;
		text-transform: uppercase;
		transform: translate(-50%, 0);
	}

	.images > .item.ppt::after {
		color: #fff;
		content: 'template powerpoint';
		font-size: 12px;
		font-weight: bold;
		left: 50%;
		letter-spacing: 1px;
		position: absolute;
		text-align: center;
		text-transform: uppercase;
		transform: translate(-50%, 0);
	}

	.images > .item.xd::after {
		color: #fff;
		content: 'XD Kit';
		font-size: 12px;
		font-weight: bold;
		left: 50%;
		letter-spacing: 1px;
		position: absolute;
		text-align: center;
		text-transform: uppercase;
		transform: translate(-50%, 0);
	}

	.images > .item.svg::after {
		bottom: 4px;
		content: 'SVG';
		font-size: 10px;
		font-weight: bold;
		letter-spacing: 1px;
		position: absolute;
		right: 4px;
		text-transform: uppercase;
	}

	.images > .item.alt::after {
		color: white;
	}

	@media only screen and (min-width: 760px) {
		.images {
			justify-content: flex-start;
		}

		.images > .item {
			flex: 0 150px;
			height: 150px;
			margin-right: 20px;
		}
	}

</style>

<div class="images">
	{#each data as i}
		<div class={i.classlist}>
			<Image {...i} />
		</div>
	{/each}
</div>
