seajs.config({
	// 别名配置
	alias: {
		'jquery' : 'jquery',
		'gotop':'jquery.gotop',
		'company':'company',
		'isotope':'jquery.isotope.min',
		'isotope_extras':'isotope_extras',
		'modernizr':'modernizr.custom'
	},
	map: [

		[ /^(.*\.(?:css|js|tpl))(.*)$/i, '$1?'+20141009001 ]
	],

	// 路径配置
	//paths: {
	//	'gallery': 'https://a.alipayobjects.com/gallery'
	//},

	// 变量配置
	//vars: {
	//	'locale': 'zh-cn'
	//},

	// 映射配置
	//map: [
	//	['http://example.com/js/app/', 'http://localhost/js/app/']
	//],

	// 预加载项

	preload: ['jquery','modernizr'],
	//preload: ['jquery', 'seajs-text', 'seajs-combo'],

	// 调试模式
	debug: true,

	// Sea.js 的基础路径
	//base: 'seajs',

	// 文件编码
	charset: 'utf-8'
});
