define(function(require, exports, module) {
	require.async('gotop');
	var win_hei,w_warp=$("#w-warp"),w_warp_hei,w_mask=$("#w-mask"),w_mask_body=$("#w-mask-body");
	var mask={
		winHei:function(val){
			win_hei=$(window).height();
			w_warp_hei=w_warp.height();
			// win_hei>w_warp_hei?w_warp_hei=win_hei:w_warp_hei;
			val==1?w_warp.height(win_hei):w_warp.height(w_warp_hei);
		},
		openMask:function(){
			mask.winHei(1);
			w_warp.height(win_hei);
			w_mask.css({"height":win_hei}).show();
			w_mask_body.css({"height":win_hei,"marginTop":-win_hei/2}).fadeIn();
		},closeMask:function(){
			mask.winHei(2);
			w_mask_body.hide();
			w_mask.fadeOut();
			$('html, body').animate({scrollTop: 0},0);
		}
	}
	mask.winHei(1);
	$(window).resize=function(){
		mask.winHei(1);
	}
	$("#kdTName").bind("focus",function(){
		mask.openMask();
	});
	$("#w-mask").bind("click",function(){
		mask.closeMask();
	});
	$("#w-mask-close").bind("click",function(){
		mask.closeMask();
	});
	$("#w-mask-body .column-list a").each(function(){
		$(this).bind("click",function(){
			var val=$(this).text(),code;
			var flag=$(this).attr("flag");
			$("#kdTName").val(val);
			$("#kdName").val(flag);
			$("#queryContext").hide();
			mask.closeMask();
		});
	});
	$("#kdSubBtn").bind("click",function(){
		var kdName=$("#kdName").val();
		if(kdName==""||kdName==null){alert("提示：请您选择快递名称");return;}
		var kdNum=$("#kdNum").val();
		if(kdNum==""||kdNum==null){alert("提示：请您填写快递单号");return;}
		$(this).addClass("btn-query-dis");
		$.getJSON("http://www.kuaidi100.com/query?type="+kdName+"&postid="+kdNum+"&id=&valicode=&temp=&callback=?",function(data){
			if(data!=null){
				$("#kdSubBtn").removeClass("btn-query-dis");
				if(data.message!="ok"){
					alert("查询失败，请检查快递名称和单号是否正确，请重试");return;
				}else{
					var dataLists=data.data,len=dataLists.length,temp_len=len-1,temp_state="",temp_last="";
					if(len>0){
						$("#queryResult").empty();
						$("#queryContext").show();
					}
					for(var i=0;i<len;i++){
						// if(i==0){data.state=="3"?(temp_last="last",temp_state="status-check"):(temp_last="",temp_state="status-first");}
						// else{temp_last="",temp_state=""}
						// var temp_tr='<tr class="'+temp_last+'"><td class="row1">'+dataLists[i].time+'</td>'+
						// 	'<td class="status '+temp_state+'">&nbsp;</td><td>'+dataLists[i].context+'</td></tr>';
						if(i==0){temp_state="status-first"}
						else if(i==len-1){
							temp_last="last";
							if(data.state=="3"){temp_state="status-check";}else{temp_state="status-wait"}
						}else{
							temp_state="";
						}
						var temp_tr='<tr class="'+temp_last+'"><td class="row1">'+dataLists[i].time+'</td>'+
							'<td class="status '+temp_state+'">&nbsp;</td><td>'+dataLists[i].context+'</td></tr>';
						$("#queryResult").append(temp_tr);
						$("#queryResult tr:eq("+i+")").delay(100).fadeIn();
					}
				}
			}
		});
	});
	
});