<script>
	import Colors from './components/Colors.svelte';
	import Icons from './components/Icons.svelte';
	import Images from './components/Images.svelte';
	import Nav from './components/Nav.svelte';
	import Navitem from './components/Navitem.svelte';
	import Domains from './components/Domains.svelte';
	import Section from './components/Section.svelte';
	import Typography from './components/Typography.svelte';

	export let menu;
	export let images;
	export let colors;
	export let typography;
	export let icons;
	export let domains;

	const main = [{
		component: Images,
		data: images,
		title: 'Imagens',
		target: 'images'
	}, {
		component: Colors,
		data: colors,
		title: 'Cores',
		target: 'colors'
	}, {
		component: Typography,
		data: typography,
		title: 'Tipografia',
		target: 'typography'
	}, {
		component: Icons,
		data: icons,
		title: 'Ícones',
		target: 'icons'
	}, {
		component: Domains,
		data: domains,
		title: 'Domínios',
		target: 'domains'
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
	 	website={domains[0].domain}
	 	logo={images[3].src}>
	 	{#each menu as item}
			<Navitem
				path={item.target}>
				{item.name}
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
