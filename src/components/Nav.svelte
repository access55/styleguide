<script>
	import { setContext } from 'svelte';
	import { version } from '../../package.json';

	export let logo;
	export let website;

</script>

<style>
	header {
		width: 100vw;
		height: var(--nav-h);
		padding: 0 10px;
		background: var(--nav-bg);
		box-shadow: 0 -0.4rem 0.9rem 0.2rem rgba(0,0,0,.5);
		user-select: none;
		z-index: 9;
	}

	nav {
		display: flex;
		flex-flow: row wrap;
		width: 100%;
		height: 100%;
		align-items: center;
	}

	nav > a {
		flex: 0 80px;
		height: 32px;
		width: 80px;
		text-align: center;
		margin-right: 4px;
		color: transparent;
		background-repeat: no-repeat;
		background-size: contain;
	}
	nav > h1 {
		position: relative;
		top: 2px;
		flex: 0 auto;
		line-height: 1;
		margin-right: 0;
		margin-left: auto;
		color: #fff;
		font-weight: normal;
		text-transform: uppercase;
		font-size: 12px;
		letter-spacing: 1px;
	}
	nav > h1 > small {
		font-size: 10px;
		opacity: 0.6;
		text-transform: lowercase;
	}
	nav > ul {
		list-style: none;
		margin: 0;
		line-height: 1;
		display: flex;
		flex-flow: row wrap;
		flex: 0.75;
		text-align: center;
		max-width: 480px;
		display: none;
	}
	@media only screen and (min-width: 760px) {
		header {
			position: fixed;
			top: 0;
			left: 0;
		}
		nav > h1 {
			margin-right: auto;
			margin-left: 0;
		}
		nav > ul {
			display: flex;
		}
	}

</style>

<header>
	<nav>
		<a
			href={website}
			title="Website"
			target="_blank"
			style="background-image: url({logo})">
			{website}
		</a>
		<h1>Styleguide <small>v{version}</small></h1>
		<ul>
			<slot></slot>
		</ul>
	</nav>
</header>
