import App from './App.svelte';
import './utils';

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
	target: 'domains',
	name: 'Domínios'
}];

const images = [{
	src: 'https://cdn-a55.s3-sa-east-1.amazonaws.com/a55_logo_99x43_2019.png',
	filename: 'logo-a55.png',
	alt: 'Logo A55',
	classlist: 'item'
}, {
	src: 'https://cdn-a55.s3-sa-east-1.amazonaws.com/apple-touch-icon.png',
	filename: 'icone-a55.png',
	alt: 'Ícone A55',
	classlist: 'item'
}, {
	src: 'https://cdn-a55.s3-sa-east-1.amazonaws.com/a55_icone.svg',
	filename: 'icone-a55.svg',
	alt: 'Ícone A55 (.svg)',
	classlist: 'item svg'
}, {
	src: 'https://cdn-a55.s3-sa-east-1.amazonaws.com/a55_icone_branco.svg',
	filename: 'icone-branco-a55.svg',
	alt: 'Ícone Branco A55 (.svg)',
	classlist: 'item svg alt'
}, {
	src: 'https://cdn-a55.s3-sa-east-1.amazonaws.com/favicon-pack.zip',
	placeholder: 'https://via.placeholder.com/400/0096FF/FFFFFF?text=%20',
	filename: 'favicon.zip',
	alt: 'Pacote de favicons',
	classlist: 'item fav'
}];

const colors = [
	{ name: 'primary', hex: '#0096FF', color: 'white' },
	{ name: 'secondary', hex: '#1262FF', color: 'white' },
	{ name: 'error', hex: '#FB0D1B', color: 'black' },
	{ name: 'success', hex: '#35D110', color: 'white' },
	{ name: 'warning', hex: '#FFCC00', color: 'black' },
	{ name: 'grey1', hex: '#333132', color: 'white' },
	{ name: 'grey2', hex: '#58595B', color: 'white' },
	{ name: 'grey3', hex: '#8A8C8E', color: 'black' },
	{ name: 'grey4', hex: '#DCDDDE', color: 'black' },
	{ name: 'grey5', hex: '#F1F2F2', color: 'black' }
];

const typography = [{
	name: 'Open Sans',
	href: 'https://fonts.google.com/specimen/Open+Sans',
	desc: 'titles'
}, {
	name: 'Roboto',
	href: 'https://fonts.google.com/specimen/Roboto',
	desc: 'copy'
}];

const icons = [{
	name: 'Element UI',
	purpose: 'uso geral',
	source: 'https://element.eleme.io/#/en-US/component/icon'
}, {
	name: 'Material Design',
	purpose: 'menu de navegação',
	source: 'https://material.io/resources/icons/?style=baseline'
}];

const domains = [{
	name: 'Site Institucional',
	gifs: '',
	domain: 'https://a55.tech'
}, {
	name: 'Metabase (Investidor)',
	gifs: '',
	domain: 'https://metabase.a55.tech'
}, {
	name: 'Apply (Formulário de aplicação)',
	gifs: '',
	domain: 'https://apply.a55.tech'
}, {
	name: 'App (Cliente)',
	gifs: '',
	domain: 'https://app.a55.tech'
}, {
	name: 'Midgard (Backoffice)',
	gifs: '',
	domain: 'https://midgard.a55.tech'
}, {
	name: 'Assinatura de email',
	gifs: '',
	domain: 'https://email-signature.a55.tech'
}];

const props = {
	menu,
	images,
	colors,
	typography,
	icons,
	domains
};

const app = new App({
	target: document.body,
	props
});

export default app;
