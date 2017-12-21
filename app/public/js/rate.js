var set = document.getElementById('set');
var shop = document.getElementById('shop');
var userId = getSearchString('userId');

function headTable(ths){
    var tableHead = document.getElementById('tbHead');
    tableHead.innerHTML="";
    var tr = document.createElement('tr');     
    for (var i = 0; i < ths.length; i++) {  
        var td = document.createElement('th');  
        td.setAttribute("class", "text-center");
        td.innerHTML = ths[i]; 
        tr.appendChild(td); 
    }  
    tableHead.appendChild(tr);  
}


const cashList =["收银员","收银次数","事件次数","出错率"];
const checkerList = ["防损员","事件次数","3分钟内","5分钟内","5分钟以上"];
const timeObj = ['week','month','3month','6month'];

var time = document.getElementById('timeSel').getElementsByTagName('span');
Array.prototype.forEach.call(time,function(item,index){
    item.onclick = function(){ 
        var alr_down = document.getElementsByClassName('tdown')[0];
        if(alr_down !== this){
            removeClass(alr_down,'tdown');
            addClass(item,'tdown');
        }
        document.getElementById("tbMain").innerHTML=''; 
        showTable(timeObj[index]);
        drawPie(timeObj[index]);
    }
})
function showTable(freq) {
    if(role == "cashier"){
        $.ajax({
            url:"/api/v1/eventsList/errorRate/list/"+userId+'/'+freq,
            type:'GET',
            success:function(results){     
                var tbody = document.getElementById('tbMain'); 
                tbody.innerHTML="";  
                  for(let i = 0;i < results.data.length; i++){ 
                    var tr = document.createElement('tr');
    
                    let name = results.data[i].name||results.data[i].id;
                    let total = results.data[i].total;
                    let error = results.data[i].error;
                    let errorrate = (100 * parseInt(error) / parseInt(total)).toFixed(2) + "%";
    
                    tr.innerHTML = `
                        <td class="text-center">${name}</td>
                        <td class="text-center">${total}</td>
                        <td class="text-center">${error}</td>
                        <td class="text-center">${errorrate}</td>
                    `
                      tbody.appendChild(tr);  
                } 
            }
        }); 
    }
    if(role == "checker"){
        $.ajax({
            url:"/api/v1/eventTAT/responseTime/"+userId+'/'+freq,
            type:'GET',
            success:function(results){     
                var tbody = document.getElementById('tbMain'); 
                tbody.innerHTML="";  
                  for(let i = 0;i < results.data.length; i++){ 
                    var tr = document.createElement('tr');
    
                    let name = results.data[i].checkerName||results.data[i].checkerId;
                    let total = parseInt(results.data[i].count1) + parseInt(results.data[i].count2) + parseInt(results.data[i].count3);
                    let time1Rate = total? 100 * parseFloat(results.data[i].count1/total) + '%' : 0 ;
                    let time2Rate = total? 100 * parseFloat(results.data[i].count2/total) + '%' : 0 ;
                    let time3Rate = total? 100 * parseFloat(results.data[i].count3/total) + '%' : 0 ;
    
                    tr.innerHTML = `
                        <td class="text-center">${name}</td>
                        <td class="text-center">${total}</td>
                        <td class="text-center">${time1Rate}</td>
                        <td class="text-center">${time2Rate}</td>
                        <td class="text-center">${time3Rate}</td>
                    `
                      tbody.appendChild(tr);  
                } 
            }
        });
    }
	
}

var myPie;
function drawPie(freq){
	$.ajax({      
        url:"/api/v1/eventsList/rate/"+userId+'/'+freq,
        type:'GET', 
        success:function(results){   
            if (myPie != null && myPie != "" && myPie != undefined) {
                    myPie.dispose();
            }
    		myPie = echarts.init(document.getElementById('pie'));
    		option = {
        	    title : {
                	text: '',
                	subtext: '',
                	x:'center'
        		},
        	    tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
        		},
        	    legend: {
            	   orient: 'vertical',
            	   left: 'left'
        		},
                series : [
                    {
                        name: '事件次数占比',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:[
                            {value:(results.data.events), name:'事件次数'},
                            {value:(results.data.bills-results.data.events), name:'正确收银'},   
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.9)'
                            }
                         }
                    }
                ]
            };
    	    myPie.setOption(option);	
		}        
	});  //内容需要跟换
}


$('#cashier').click(function(){
    $('#checker').removeClass('rdown');
    $('#cashier').addClass('rdown');
    role = "cashier";
    headTable(cashList);
    time[0].click();
})
$('#checker').click(function(){
    $('#cashier').removeClass('rdown');
    $('#checker').addClass('rdown');
    role = "checker";
    headTable(checkerList);
    time[0].click();
})

$('#cashier').click();





     
