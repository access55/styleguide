import App from './App.svelte';

const properties = {
	website: 'https://a55.tech',
	midgard: 'https://midgard.a55.tech',
	app: 'https://app.a55.tech',
	apply: 'https://apply.a55.tech',
	email: 'https://access55.github.io/email-signature'
};

const menu = [{
	target: 'images',
	name: 'Imagens'
}, {
	target: 'colors',
	name: 'Cores'
}, {
	target: 'typography',
	name: 'Tipografia'
}, {
	target: 'icons',
	name: 'Ícones'
}, {
	target: 'resources',
	name: 'Recursos'
}];

const images = {
	logoSmall: 'https://cdn-a55.s3-sa-east-1.amazonaws.com/a55_logo_99x43_2019.png',
	faviconPack: 'https://cdn-a55.s3-sa-east-1.amazonaws.com/favicon-pack.zip',
	icon: 'https://cdn-a55.s3-sa-east-1.amazonaws.com/apple-touch-icon.png',
	svgIcon: 'https://cdn-a55.s3-sa-east-1.amazonaws.com/a55_icone.svg',
	svgIconWhite: 'https://cdn-a55.s3-sa-east-1.amazonaws.com/a55_icone_branco.svg',
};

const colors = {
	primary: '#0096FF',
	secondary: '#1262FF',
	error: '#FB0D1B',
	success: '#35D110',
	warning: '#FFCC00',
	grey1: '#333132',
	grey2: '#58595B',
	grey3: '#8A8C8E',
	grey4: '#DCDDDE',
	grey5: '#F1F2F2'
};

const fontFamily = {
	name: 'Open Sans',
	css: 'https://fonts.googleapis.com/css?family=Open+Sans'
};

const iconLibraries = [{
	name: 'Element Ui icons',
	source: 'https://element.eleme.io/#/en-US/component/icon'
}, {
	name: 'Material Design icons',
	source: 'https://material.io/resources/icons/?style=baseline'
}];

const props = {
	menu,
	images,
	colors,
	fontFamily,
	iconLibraries,
	properties
};

const app = new App({
	target: document.body,
	props
});

export default app;