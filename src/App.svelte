<script>
	import Media from './components/Media.svelte';
	import Palette from './components/Palette.svelte';
	import Typography from './components/Typography.svelte';
	import UIIcons from './components/UIIcons.svelte';
	import Resources from './components/Resources.svelte';

	import Nav from './components/Nav.svelte';
	import Navitem from './components/Navitem.svelte';

	import Section from './components/Section.svelte';

	export let nav;
	export let media;
	export let palette;
	export let typography;
	export let ui_icons;
	export let resources;

	const main = [{
		component: Media,
		data: media,
		title: 'Media',
		target: 'media'
	}, {
		component: Palette,
		data: palette,
		title: 'Palette',
		target: 'palette'
	}, {
		component: Typography,
		data: typography,
		title: 'Typography',
		target: 'typography'
	}, {
		component: UIIcons,
		data: ui_icons,
		title: 'UI Icons',
		target: 'ui-icons'
	}, {
		component: Resources,
		data: resources,
		title: 'Resources',
		target: 'resources'
	}];

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
		display: flex;
		flex-flow: row wrap;
		width: 100%;
	}

	@media only screen and (min-width: 760px) {
		main {
			margin: 0 auto 100px;
			max-width: 760px;
		}
	}

</style>

<div class="styleguide">
 	<Nav
	 	website={resources[0].domain}
	 	logo={media[5].src}>
	 	{#each nav as navitem}
			<Navitem
				path={navitem.target}>
				{navitem.name}
			</Navitem>
		{/each}
	</Nav>
	<main>
		{#each main as item}
			<Section
				title={item.title}
				target={item.target}>
				<svelte:component
					data={item.data}
					this={item.component} />
			</Section>
		{/each}
	</main>
</div>
