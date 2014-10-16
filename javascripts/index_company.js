define(function(require, exports, module) {
	require('company');
	require('isotope'); 
	require.async('gotop');
	var companys=jsoncom.company;
	var $alpha = $('#hidden-items');
  	var $container = $('#w-kd-item');
	$container.empty();
	for(var i=0,len=companys.length;i<len;i++){
		var a='<li class="item"><h2>'+companys[i].companyname+'</h2><p>'+companys[i].tel+'</p><p>'+companys[i].comurl+'</p></li>';
		$container.append(a);
		$("#w-kd-item li:eq("+i+")").delay(100).animate({opacity:1},100);
	}
	$container.delay(600).isotope({itemSelector: '.item'});
	var win_hei,w_warp=$("#w-warp"),w_warp_hei;
	function init_hei(){
		win_hei=$(window).height();
		w_warp_hei=w_warp.height();
		win_hei>w_warp_hei?w_warp_hei=win_hei:w_warp_hei;
		w_warp.height(w_warp_hei);
	}
	init_hei();
	$(window).resize=function(){
		init_hei();
	}
});