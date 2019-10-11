<script>
	import Section from "./Section.svelte";
	import FileSaver from "file-saver";
	import Image from "./Image.svelte";

	export let images;

	function handleClick() {
		const target = this.dataset.target;
		const filename = this.dataset.filename;
		if (target) {
			FileSaver.saveAs(target, filename);
		};
	}
</script>

<style>
.images {
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
}
.item {
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


	border: 1px solid var(--grey4);
}
.item.alt,
.item.fav {
	background: var(--primary);
}
.item.fav {
	padding: 0;
}
.item.fav::after {
	position: absolute;
	content: 'favicons';
	font-size: 12px;
	text-transform: uppercase;
	font-weight: bold;
	letter-spacing: 1px;
	text-align: center;
	left: 50%;
	transform: translate(-50%, 0);
	color: #fff;
}
.item.svg::after {
	position: absolute;
	content: 'SVG';
	bottom: 4px;
	right: 4px;
	font-size: 10px;
	text-transform: uppercase;
	font-weight: bold;
	letter-spacing: 1px;
}
.item.alt::after {
	color: white;
}
</style>

<Section
	target="images"
	title="Imagens">
	<div class="images">
		<div class="item">
			<Image
				src={images.logoSmall}
				filename="logo.png"
				alt="Logo A55" />
		</div>
		<div class="item">
			<Image
				src={images.icon}
				filename="icone-a55.png"
				alt="Icone A55" />
		</div>
		<div class="item svg">
			<Image
				src={images.svgIcon}
				filename="icone-a55.svg"
				alt="Icone A55 (.svg)" />
		</div>
		<div class="item alt svg">
			<Image
				src={images.svgIconWhite}
				filename="icone-branco-a55.svg"
				alt="Icone Branco A55 (.svg)" />
		</div>
		<div class="item fav">
			<Image
				src={images.faviconPack}
				placeholder='https://via.placeholder.com/400/0096FF/FFFFFF?text=%20'
				filename="favicon.zip"
				alt="Pacote de favicons" />
		</div>
	</div>
</Section>