<script>
	import { onMount } from 'svelte';
	import Section from "./Section.svelte";
	import Color from "./Color.svelte";

	export let colors;

	const odds = [2, 4, 7, 8, 9];

	const colorsArr = Object.keys(colors).map((it, index) => {
		const color = odds.indexOf(index) >= 0 ? 'black' : 'white';
		return {
			name: it,
			hex: colors[it],
			color
		}
	});

	onMount(() => {
		const domcolors = document.querySelectorAll('.colors > .item');
		const height = domcolors[0].offsetWidth;

		[...domcolors].forEach(domcolor => {
			domcolor.style.height = height + 'px';
		});
	});

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
	flex: 0 calc(20% - 20px);
	height: auto;
	padding: 10px;

	display: flex;
	flex-flow: row wrap;
	align-content: center;
	align-items: center;
	text-align: center;
	margin-bottom: 20px;

	border: 1px solid var(--grey4);
}
</style>
<Section
	target="colors"
	title="Cores">
	<div class="colors">
		{#each colorsArr as color}
			<div class="item">
				<Color {color} />
			</div>
		{/each}
	</div>
</Section>