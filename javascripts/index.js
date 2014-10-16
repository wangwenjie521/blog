define(function(require, exports, module) {
	require.async(['gotop','company']);
	var a=$("#postid");
	var query_btn=$("#query");
	query_btn.click(function(){
		$.getJSON("http://www.kuaidi100.com/autonumber/auto?num=1500066330925&jsoncallback=?",function(data){
	    	alert(1);
	    	return;
	 	});
	});
	$("#kdSubBtn").bind("click",function(){
		var kdName=$("#kdName").val();
		if(kdName==""||kdName==null){alert("提示：请您选择快递名称");return;}
		var kdNum=$("#kdNum").val();
		if(kdNum==""||kdNum==null){alert("提示：请您填写快递单号");return;}
		$.getJSON("http://www.kuaidi100.com/query?type="+kdName+"&postid="+kdNum+"&id=&valicode=&temp=&callback=?",function(data){
			if(data!=null){
				if(data.message!="ok"){
					alert("查询失败，请检查快递名称和单号是否正确，请重试");return;
				}else{
					var dataLists=data.data,len=dataLists.length,temp_state="",temp_last="";
					if(len>0){
						$("#queryResult").empty();
						$("#queryContext").show();
					}
					for(var i=0;i<len;i++){
						if(i==0){temp_state="status-first";}
						else if(i==len-1){temp_last="last";temp_state="status-check";}else{temp_state=""}
						var temp_tr='<tr class="'+temp_last+'"><td class="row1">'+dataLists[i].time+'</td>'+
							'<td class="status '+temp_state+'">&nbsp;</td><td>'+dataLists[i].context+'</td></tr>';
						$("#queryResult").append(temp_tr);
						$("#queryResult tr").fadeIn();
					}
				}
			}
		});
	});
	
});