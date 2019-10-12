<script>
	export let title;
	export let target;
</script>

<style>
	section {
		width: 100%;
		margin: 40px auto 0;
		padding: 0 20px;
	}

	h3 {
		font-size: 20px;
		text-transform: uppercase;
		color: var(--primary);
		border-bottom: 1px solid var(--grey4);
		margin-bottom: 20px;
		letter-spacing: 1px;
	}

	@media only screen and (min-width: 760px) {
		section {
			min-height: 50vh;
		}

		h3 {
			padding-top: calc(var(--nav-h) + 20px);
		}
	}
</style>

<section>
	<h3 id={target}>{title}</h3>
	<slot></slot>
</section>