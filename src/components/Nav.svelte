<script>
	import { setContext } from 'svelte';

	export let logo;
	export let website;
</script>
<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
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
		margin-right: auto;
		color: transparent;
		background-repeat: no-repeat;
		background-size: contain;
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
	}
</style>

<header>
	<nav>
		<a
			href={website}
			title="Website"
			style="background-image: url({logo})">
			{website}
		</a>

		<ul>
			<slot></slot>
		</ul>
	</nav>
</header>