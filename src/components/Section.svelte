<script>
	export let title;
	export let target;
</script>

<style>
	section {
		width: 800px;
		margin: 0 auto 20px;
		min-height: 60vh;
	}

	h3 {
		padding-top: calc(var(--nav-h) + 20px);
		font-size: 20px;
		text-transform: uppercase;
		color: var(--primary);
		border-bottom: 1px solid var(--grey4);
		margin-bottom: 20px;
	}
</style>

<section>
	<h3 id={target}>{title}</h3>
	<slot></slot>
</section>