<script>
	export let path = '';

	const anchor = `#${path}`;

	const handle_click = function(event) {
		event.preventDefault();

		const hash = this.getAttribute('href');
		const target = document.querySelector(hash);

		target.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'start'
		});

		window.location.hash = hash;
	};
</script>

<style>
	li {
		flex: 1;
		color: #fff;
		text-transform: uppercase;
		font-size: 12px;
	}

	li:hover {
		text-decoration: underline;
	}
	li a:hover {
		color: #fff;
	}
</style>

<li>
	<a
		on:click|once={handle_click}
		href={anchor}>
		<slot></slot>
	</a>
</li>
