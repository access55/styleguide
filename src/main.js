import App from './App.svelte';
import './utils';

const nav = [{
	target: 'media',
	name: 'Media'
}, {
	target: 'palette',
	name: 'Palette'
}, {
	target: 'typography',
	name: 'Typography'
}, {
	target: 'ui-icons',
	name: 'UI Icons'
}, {
	target: 'resources',
	name: 'Resources'
}];

const media = [{
	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/MODELO+APRESENTAC%CC%A7A%CC%83O/A55_Modelo+de+Apresentac%CC%A7a%CC%83o.pptx',
	placeholder: 'https://via.placeholder.com/400/0096FF/FFFFFF?text=%20',
	filename: 'a55_presentation.pptx',
	alt: 'Template de apresentação em powerpoint',
	classlist: 'item ppt'
}, {
	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/MODELO+APRESENTAC%CC%A7A%CC%83O/A55_Modelo+de+Apresentac%CC%A7a%CC%83o.key',
	placeholder: 'https://via.placeholder.com/400/0096FF/FFFFFF?text=%20',
	filename: 'a55_presentation.key',
	alt: 'Template de apresentação em keynote',
	classlist: 'item key'
}, {
	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/LOGO/A55_AZUL.png',
	filename: 'A55_AZUL.png',
	alt: 'A55 Logo',
	classlist: 'item'
}, {
	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/LOGO/A55_AZUL.svg',
	filename: 'A55_AZUL.svg',
	alt: 'A55 Logo (.svg)',
	classlist: 'item svg'
}, {
	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/LOGO/A55_BRANCO.png',
	filename: 'A55_BRANCO.png',
	alt: 'A55 Logo Branco',
	classlist: 'item alt'
}, {
	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/LOGO/A55_BRANCO.svg',
	filename: 'A55_BRANCO.svg',
	alt: 'A55 Logo Branco (.svg)',
	classlist: 'item alt svg'
}, {
	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/LOGO/A55_PRETO.png',
	filename: 'A55_PRETO.png',
	alt: 'A55 Logo Preto',
	classlist: 'item'
}, {
	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/LOGO/A55_PRETO.svg',
	filename: 'A55_PRETO.svg',
	alt: 'A55 Logo Preto (.svg)',
	classlist: 'item svg'
}, {
	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/I%CC%81CONE/I%CC%81CONE_AZUL.png',
	filename: 'A55_ICONE_AZUL.png',
	alt: 'A55 Ícone',
	classlist: 'item'
}, {
	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/I%CC%81CONE/I%CC%81CONE_AZUL.svg',
	filename: 'A55_ICONE_AZUL.svg',
	alt: 'A55 Ícone (.svg)',
	classlist: 'item svg'
}, {
	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/I%CC%81CONE/I%CC%81CONE_BRANCO.png',
	filename: 'A55_ICONE_BRANCO.png',
	alt: 'A55 Ícone Branco',
	classlist: 'item alt'
}, {
	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/I%CC%81CONE/I%CC%81CONE_BRANCO.svg',
	filename: 'A55_ICONE_BRANCO.svg',
	alt: 'A55 Ícone Branco (.svg)',
	classlist: 'item alt svg'
}, {
	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/I%CC%81CONE/I%CC%81CONE_PRETO.png',
	filename: 'A55_ICONE_PRETO.png',
	alt: 'A55 Ícone Preto',
	classlist: 'item'
}, {
	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/I%CC%81CONE+E+LOGO/I%CC%81CONE/I%CC%81CONE_PRETO.svg',
	filename: 'A55_ICONE_PRETO.svg',
	alt: 'A55 Ícone Preto (.svg)',
	classlist: 'item svg'
}, {
	src: 'https://a55-cdn.s3-sa-east-1.amazonaws.com/favicon.zip',
	placeholder: 'https://via.placeholder.com/400/0096FF/FFFFFF?text=%20',
	filename: 'favicon.zip',
	alt: 'Pacote de favicons',
	classlist: 'item fav'
}];

const palette = [
	{ name: 'primary', hex: '#0096FF', color: 'white' },
	{ name: 'gradient-1', hex: '#3CCCDA', color: 'white' },
	{ name: 'gradient-2', hex: '#1262FF', color: 'white' },
	{ name: 'primary-light-1', hex: '#53a8ff', color: 'white' },
	{ name: 'primary-light-2', hex: '#66b1ff', color: 'white' },
	{ name: 'primary-light-3', hex: '#79bbff', color: 'black' },
	{ name: 'primary-light-4', hex: '#8cc5ff', color: 'black' },
	{ name: 'primary-light-5', hex: '#a0cfff', color: 'black' },
	{ name: 'primary-light-6', hex: '#b3d8ff', color: 'black' },
	{ name: 'primary-light-7', hex: '#c6e2ff', color: 'black' },
	{ name: 'primary-light-8', hex: '#d9ecff', color: 'black' },
	{ name: 'primary-light-9', hex: '#ecf5ff', color: 'black' },
	{ name: 'success', hex: '#67C23A', color: 'white' },
	{ name: 'warning', hex: '#E6A23C', color: 'black' },
	{ name: 'danger', hex: '#F56C6C', color: 'black' },
	{ name: 'info', hex: '#909399', color: 'black' },
	{ name: 'color-text-primary', hex: '#303133', color: 'white' },
	{ name: 'color-text-regular', hex: '#606266', color: 'white' },
	{ name: 'color-text-secondary', hex:'#909399', color: 'black' },
	{ name: 'color-text-placeholder', hex: '#C0C4CC', color: 'black' },
	{ name: 'border-color-base', hex: '#DCDFE6', color: 'black' },
	{ name: 'border-color-light', hex: '#E4E7ED', color: 'black' },
	{ name: 'border-color-lighter', hex: '#EBEEF5', color: 'black' },
	{ name: 'border-color-extra-light', hex: '#F2F6FC', color: 'black' },
	{ name: 'background-color-base', hex: '#F5F7FA', color: 'black' },
];

const typography = [{
	name: 'Open Sans',
	href: 'https://fonts.google.com/specimen/Open+Sans',
	desc: 'titles'
}, {
    	name: 'Avenir',
	href: 'https://fonts.google.com/specimen/Open+Sans',
	desc: 'Business Card Font'	
}];

const ui_icons = [{
	name: 'Element UI',
	purpose: 'general ui use',
	source: 'https://element.eleme.io/#/en-US/component/icon'
}, {
	name: 'Material Design',
	purpose: 'navigation menu',
	source: 'https://material.io/resources/icons/?style=baseline'
}];


const resources = [{
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
	nav,
	media,
	palette,
	typography,
	ui_icons,
	resources
};

const app = new App({
	target: document.body,
	props
});

export default app;
