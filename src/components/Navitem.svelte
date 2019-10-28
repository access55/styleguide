<script>
	export let path;

	const anchor = `#${path}`;

	const handle_click = async function(event) {
		event.preventDefault();

		const hash = this.getAttribute('href');
		const target = document.querySelector(hash);

		try {
			await target.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'start'
			});

			window.location.hash = hash;

		} catch (error) {
			console.log("can't find target: ", hash);
		}
	};

</script>

<style>
	li {
		flex: 0 auto;
		padding: 0 10px;
		text-align: center;
	}

	li > a {
		color: #fff;
		text-transform: uppercase;
		font-size: 14px;
		letter-spacing: 1px;
	}

	li:hover {
		text-decoration: underline;
	}

	li a:hover {
		color: #fff;
	}

</style>

<li>
	<a on:click|once={handle_click} href={anchor}>
		<slot></slot>
	</a>
</li>
