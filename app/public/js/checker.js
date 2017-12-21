window.onload = function(){

	const listType = getSearchString('listType');
	if(getSearchString('userId')){
		var userId = getSearchString('userId');
		var cookie = new CookieStorage('/');
		cookie.setItem('userId',userId);
	}else{
		var cookie = new CookieStorage('/');
		var userId = cookie.getItem('userId');
	}
	
	
	/* get num of events */
	function getNum(){
		$.ajax({
			url:'/api/v1/eventsList/count/checker/'+userId,
			type:'GET',
			//data:
			success:function(results){
				document.getElementById('event').children[0].children[0].innerHTML = results.data.working;  
				document.getElementById('event').children[1].children[0].innerHTML = results.data.store;  
				document.getElementById('event').children[2].children[0].innerHTML = results.data.commit;  	
			}
		})
	}
	/* get num of events */



	function getList(type){
		var alr_down = document.getElementsByClassName('edown')[0];
		var elem = document.getElementById('event').getElementsByTagName('p')[type];
   		if(alr_down && alr_down!== elem){
			removeClass(alr_down,'edown');
			addClass(elem,'edown');
		}else{
			addClass(elem,'edown');
		}
		

		document.getElementById('list').innerHTML='';
		var glyphiconType;
		switch(type){
			case 0: glyphiconType = 'glyphicon-pencil'; break;
			case 1: glyphiconType = 'glyphicon-search'; break;
			case 2: glyphiconType = 'glyphicon-ok'; break;
		}

		$.ajax({
			url:'/api/v1/eventsList/list/checker/common/'+type+'/'+userId,
			type:'get',
			success:function(results){
				var results = results.data;
				var sysArr1=[];
				var sysArr2=[];
				if(results.length == 0){
					var mes =document.createElement('p');
					//addClass(mes,'no');
					mes.setAttribute('class','no');
					mes.innerHTML = `没有${pairs[type]}的事件`;
					//$('#list').prepend(mes);
					document.getElementById('list').appendChild(mes);
				}
				


				if(type==1&&results.length){
					var btn = document.createElement('button');
					btn.setAttribute('class','btn btn-info');
					btn.setAttribute('id','submitAll');
					btn.innerHTML = '提交所有';
					document.getElementById('list').appendChild(btn);		
				}
				sortFun(results,'createat',-1);
				for(let i=0;i<results.length;i++){

					var syskey = results[i].syskey;
					var shopId = results[i].shopid;
					sysArr1.push({
						"sysKey":syskey
					});
					sysArr2.push({
						"sysKey":syskey,
						"shopId":shopId,
						"checkerId":userId
					});
					var div = document.createElement('div');
					div.setAttribute('class','view');
					var time = handleTime(results[i].createat);
					var name = results[i].cashiername?results[i].cashiername:results[i].cashierid?results[i].cashierid:results[i].countertype;

					if(type == 1){
						div.innerHTML =`
								<p class="top"><span>${time}</span><span>${results[i].transid}</span><span class="glyphicon ${glyphiconType}" aria-hidden="true"></span></p>
								
								<p class="bottom"><span>${name}</span><span>款台: ${results[i].counterid}</span><span>结果:${results[i].editresult?results[i].editresult:' 暂无'}</span><button class = "btn btn-sm btn-primary">提交</button</p>
						`;
					}else{
						div.innerHTML =`
								<p class="top"><span>${time}</span><span>${results[i].transid}</span><span class="glyphicon ${glyphiconType}" aria-hidden="true"></span></p>
								<p class="bottom"><span>${name}</span><span>款台: ${results[i].counterid}</span><span>结果:${results[i].editresult?results[i].editresult:' 暂无'}</span></p>
						`;
					}
					
					document.getElementById('list').appendChild(div);
					div.onclick = function(sys,shopId){
						return function(){
							$.ajax({
								url:'/api/v1/eventTAT/openTime/'+sys,
								type:'POST',
								data:{
									"shopId":shopId,
									"checkerId":userId
								},
								success:function(){
									
								}
							})
							window.location = `details.html?syskey=${sys}&status=${type}&shopId=${shopId}`;
						}
					}(syskey,shopId);	


					/*submit*/ 
					if(type == 1){
						var btn = div.getElementsByTagName('button')[0];
						
						btn.onclick = ((sys,shopId)=>{
							return function(event){
								// window.event? window.event.cancelBubble = true : event.stopPropagation();
								preventBubble(event);
								$.ajax({
									url:'/api/v1/eventsList/status/commit/'+ sys,
									type:'put',
									success:function(results){
										getNum();
										getList(1);
									}
								})
								$.ajax({
									url:'/api/v1/eventTAT/commitTime/'+sys,
									type:'POST',
									data:{
										"shopId":shopId,
										"checkerId":userId
									},
									success:function(){
										//console.log(this.url);
									}
								})
							};
						})(syskey,shopId);
					}
					
				}

				if(type==1&&results.length){
					document.getElementById('submitAll').onclick = function(sysArr1,sysArr2){
						
						return function(){
							$.ajax({
								url:'/api/v1/eventsList/status/commit',
								type:'put',
								data:{sysArr1},
								success:function(results){
									getNum();
									getList(1);
								}
							})
							$.ajax({
								url:'/api/v1/eventTAT/oneKeyCommit',
								type:'POST',
								data:{sysArr2},
								success:function(){
									//console.log(this.url);
								}
							})
						}
					}(sysArr1,sysArr2);
				}
				
			}
		})

	}


	function getGraph(type){
		//console.log(type);
		$.ajax({
			url:'/api/v1/eventsList/countGraph/checker/'+type,
			type:'get',
			success:function(results){
				var graphData = results.data;
				if(type=='week'){
					sortFun(graphData,'y',true);
					sortFun(graphData,'w',true);
					draw(graphData,'y','w');
				}else{
					sortFun(graphData,'t',true);
					draw(graphData,'t');
				}
			}
		})
	}
	/*draw graph*/ 

	var myChart;
	function draw(graphData,attr1,attr2=false){
			if (myChart != null && myChart != "" && myChart != undefined) {
			        myChart.dispose();
			}
			myChart = echarts.init(document.getElementById('content'));

			option = {
			            title : {
			                // text: '防损事件统计表',
			                subtext: '次数'
			            },
			            grid : {
					        left : '15%', 
					        right:   '15%',
					    },
			            tooltip : {
			                trigger: 'axis'
			            },
			            // toolbox: {
			            //     show : true,
			            //     feature : {
			            //         mark : {show: true},
			            //         dataView : {show: true, readOnly: false},
			            //         magicType : {show: true, type: ['line', 'bar']},
			            //         restore : {show: true}
			            //     }
			            // },
			            calculable : true,
			            xAxis : [
			                {
			                    type : 'category',
			                    boundaryGap : false,
			                    data : []
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    axisLabel : {
			                        formatter: '{value} '
			                    }
			                }
			            ],
			            series : [
			                {
			                    name:'防损事件次数',
			                    type:'line',
			                    data:[],
			                    markPoint : {
			                        data : [
			                            {type : 'max', name: '最大值'},
			                            {type : 'min', name: '最小值'}
			                        ]
			                    },
			                    markLine : {
			                        data : [
			                            {type : 'average', name: '平均值'}
			                        ]
			                    }
			                }
			                 
			            ]
			        };
		    option.xAxis[0].data =graphData.map(function(Item){
		    	return Item[attr1] + (attr2?'第'+Item[attr2]+'周':'');
		    })
		    option.series[0].data =graphData.map(function(Item){
		    	return Item.count;
		    })
		    myChart.setOption(option);
	}
	
    /*draw graph*/


    /* add press event of day week and month */
    var btn = document.getElementById('graph').getElementsByTagName('button');
   	Array.prototype.forEach.call(btn,function(item,index){
    	item.onclick = function(){
    		/*handle style*/
    		var alr_down = document.getElementsByClassName('down')[0];
    		if(alr_down !== this){
    			removeClass(alr_down,'down');
    			addClass(item,'down');
    		}
    		/*handle style*/

    		/*date_type of graph*/
    		var type = item.className.split(/\s+/)[0]; 
    		getGraph(type);


    	}
    });
   	/* add press event of day week and month */




   	/* add press event of event */
   	var btn = document.getElementById('event').getElementsByTagName('p');
   	Array.prototype.forEach.call(btn,function(item,index){
   		item.onclick = function(){
   			getList(index);
   		}
   	})
   	/* add press event of event */

   	getNum();
   	getList(listType||0); 
	getGraph('day');
	   	

}