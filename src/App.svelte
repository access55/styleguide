<script>
	import { onMount, getContext } from 'svelte';
	import Nav from './components/Nav.svelte';
	import Navitem from './components/Navitem.svelte';

	import Images from './components/Images.svelte';
	import Colors from './components/Colors.svelte';
	import Typography from './components/Typography.svelte';
	import Icons from './components/Icons.svelte';
	import Resources from './components/Resources.svelte';

	import { hexToRgb } from './utils';

	export let menu;
	export let images;
	export let colors;
	export let fontFamily;
	export let iconLibraries;
	export let properties;

	let scrolling = getContext('scrolling');
</script>

<style src="./main.css">
	.styleguide {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	main {
		margin-top: var(--nav-h);
		display: flex;
		flex-flow: row wrap;
	}
</style>

<div class="styleguide">
 	<Nav
	 	website={properties.website}
	 	logo={images.svgIconWhite}>
	 	{#each menu as item}
			<Navitem
				path={item.target}>
				{item.name}
			</Navitem>
		{/each}
	</Nav>
	<main>
		<Images {images} />
		<Colors {colors} />
		<Typography {fontFamily} />
		<Icons {iconLibraries} />
		<Resources {properties} />
	</main>
</div>