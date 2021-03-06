window.onload = function(){
	function getAreasInfo(){
		$.ajax({
			url:'/api/v1/areas/info/areas',
			type:'get',
			success:function(results){
				var select = `<option disabled selected style='display:none;'>区域选择</option>`;
				data = results.data;
				for(let i=0;i<data.length;i++){
					select += `<option value="${data[i].id}">${data[i].name}</option>`
				}
				$('#areas').html(select);
				
			}
		})
	} /* get areas info  */
	

	function getShopsInfo(areaId){
		$.ajax({
			url:'/api/v1/shops/area/'+areaId,
			type:'get',
			success:function(results){
				var select = `<option disabled selected style='display:none;'>门店选择</option>`;
				data = results.data;
				for(let i=0;i<data.length;i++){
					select += `<option value="${data[i].id}">${data[i].name}</option>`
				}
				$('#shops').html(select);
			}
		})
	} /* get shops info  by area id*/


	var CounterTypes = `<option disabled selected style='display:none;'>款台类型选择</option>`;
	function getCounterTypes(){
		$.ajax({
			url:'/api/v1/counterTypeConf/info',
			type:'get',
			success:function(results){	
				data = results.data;
				for(let i=0;i<data.length;i++){
					CounterTypes += `<option value="${data[i].id}">${data[i].type}</option>`
				}
			}
		})
	} /* get all counter types*/
	getCounterTypes()



	function getCountsInfo(shopId){
		$.ajax({
			url:'/api/v1/counters/shop/'+shopId,
			type:'get',
			success:function(results){
				var tbody = document.getElementsByTagName('tbody')[0];
				tbody.innerHTML='';
				data = results.data;

				for(let i=0;i<data.length;i++){
					var tr = document.createElement('tr');
					tr.innerHTML = `
						<td><input type="checkbox" value="${data[i].id}"></td>
						<td>${data[i].id}</td>
						<td>${data[i].name}</td>
						<td>${data[i].type}</td>
						<td>${data[i].cameraip}</td>
						<td>${data[i].alarmip}</td>
						<td>${data[i].alarmport}</td>
						<td>${data[i].posip}</td>
						<td>${data[i].posctlport}</td>
						<td>${data[i].posbillport}</td>
						<td>${data[i].posalarmport}</td>
						<td style="background-color: rgb(91,192,222)"><span>编辑</span ></td>
					`;
					tbody.appendChild(tr);

				
					var edit = tr.getElementsByTagName('span')[0].parentNode;
					edit.onclick = function(){
						$('#handleRecord p').html('编辑款台');
						$('#id').val(data[i].id);
						$('#name').val(data[i].name);
						$('#type').html(CounterTypes);
						$('#type').find('option').each(function(){
							if($(this).text() ==  data[i].type){
								$(this).attr('selected','selected');
							}
						})
						$('#cameraip').val(data[i].cameraip);
						$('#alarmip').val(data[i].alarmip);
						$('#alarmport').val(data[i].alarmport);
						$('#posip').val(data[i].posip);
						$('#posctlport').val(data[i].posctlport);
						$('#posbillport').val(data[i].posbillport);
						$('#posalarmport').val(data[i].posalarmport);
						$('#operation').val('edit');
						$('#handleRecord')[0].style.display = 'block';
						$('#id').attr('disabled','');
						watchForm();
					}
				}
			}
		})
	} /* get shops info  by area id*/


	$('#add').click(function(){
		$('#handleRecord p').html('新增款台');
		$('#id').val('');
		$('#name').val('');
		$('#type').html(CounterTypes);
		$('#cameraip').val('');
		$('#alarmip').val('');
		$('#alarmport').val('');
		$('#posip').val('');
		$('#posctlport').val('');
		$('#posbillport').val('');
		$('#posalarmport').val('');
		$('#operation').val('add');
		$('#handleRecord')[0].style.display = 'block';
		$('#id').removeAttr('disabled');
		watchForm();
	});

	$('#delete').click(function(){
		var counters = [];
		$(':checked').each(function(){ 
			counters.push({
				'id':this.value
			});
		}); 
		$.ajax({
			url:'/api/v1/counters',
			type:'delete',
			data:{counters},
			success:function(){
				getCountsInfo( $("#shops").val() );
			}
		})
	})


	$('#submit').click(function(){
		if($('#operation').val()=='add'){
			$.ajax({
				url:'/api/v1/counters/info/'+$('#id').val(),
				type:'POST',
				data:{
					'shopId': $("#shops").val(),
				    'typeId':  $('#type').val(),
				    'name': $('#name').val(),
				    'cameraIp': $('#cameraip').val(),
				    'alarmIp': $('#alarmip').val(),
				    'alarmPort': $('#alarmport').val(),
				    'posIp': $('#posip').val(),
				    'posCtlPort': $('#posctlport').val(),
				    'posBillPort': $('#posbillport').val(),
				    'posAlarmPort': $('#posalarmport').val()
				},
				success:function(results){
					if(results.code == 403){
						alert('您输入的id号已存在,新增记录失败！');
					}
					$('#handleRecord')[0].style.display = 'none';
					getCountsInfo( $("#shops").val() );
				}
			})
		}
		if($('#operation').val()=='edit'){
			$.ajax({
				url:'/api/v1/counters/info/'+$('#id').val(),
				type:'put',
				data:{
					'shopId': $("#shops").val(),
				    'typeId':  $('#type').val(),
				    'name': $('#name').val(),
				    'cameraIp': $('#cameraip').val(),
				    'alarmIp': $('#alarmip').val(),
				    'alarmPort': $('#alarmport').val(),
				    'posIp': $('#posip').val(),
				    'posCtlPort': $('#posctlport').val(),
				    'posBillPort': $('#posbillport').val(),
				    'posAlarmPort': $('#posalarmport').val()	
				},
				success:function(){
					$('#handleRecord')[0].style.display = 'none';
					getCountsInfo( $("#shops").val() );
				}
			})
		}
	})


	$('#back').click(function(){
		$('#handleRecord')[0].style.display = 'none';
		getCountsInfo( $("#shops").val() );
	})



	getAreasInfo();
	$("#areas").bind('input propertychange',function(){ 
		getShopsInfo( $("#areas").val() );
	});
	$("#shops").bind('input propertychange',function(){ 
		getCountsInfo( $("#shops").val() );
		if($('#add').attr('disabled')) $('#add').removeAttr('disabled');
	});


	function watchForm(){
		if($('#operation').val() == 'edit'){
			$("#id").css('border','1px solid #ccc');
			$("#type").css('border','1px solid #ccc');
			$("#name").css('border','1px solid #ccc');
			$("#cameraip").css('border','1px solid #ccc');
			$("#alarmip").css('border','1px solid #ccc');
			$("#alarmport").css('border','1px solid #ccc');
			$("#posip").css('border','1px solid #ccc');
			$("#posctlport").css('border','1px solid #ccc');
			$("#posbillport").css('border','1px solid #ccc');
			$("#posalarmport").css('border','1px solid #ccc');
			$('#submit').removeAttr('disabled');
		}else{
			$("#id").css('border','1px solid red');
			$("#type").css('border','1px solid red');
			$("#name").css('border','1px solid red');
			$("#cameraip").css('border','1px solid red');
			$("#alarmip").css('border','1px solid red');
			$("#alarmport").css('border','1px solid red');
			$("#posip").css('border','1px solid red');
			$("#posctlport").css('border','1px solid red');
			$("#posbillport").css('border','1px solid red');
			$("#posalarmport").css('border','1px solid red');
			$('#submit').attr('disabled','');
		}
    }

	const IpReg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
    $("#id").change(function(){
 	    this.style.border = $('#id').val()?'1px solid #ccc':'1px solid red';
	})
	$("#name").change(function(){
		this.style.border = $('#name').val()?'1px solid #ccc':'1px solid red';
	})
	$("#type").change(function(){
		this.style.border = '1px solid #ccc';
	})
	$("#cameraip").change(function(){
		if(IpReg.test( $('#cameraip').val() )){
			this.style.border = '1px solid #ccc';
		}else{
			this.style.border = '1px solid red';
		}
    })
	$("#alarmip").change(function(){
		if(IpReg.test( $('#alarmip').val() )){
			this.style.border = '1px solid #ccc';
		}else{
			this.style.border = '1px solid red';
		}
	})
	$("#alarmport").change(function(){
		this.style.border = $('#alarmport').val()?'1px solid #ccc':'1px solid red';
	})
	$("#posip").change(function(){
		if(IpReg.test( $('#posip').val() )){
			this.style.border = '1px solid #ccc';
		}else{
			this.style.border = '1px solid red';
		}
	})
	$("#posctlport").change(function(){
		this.style.border = $('#posctlport').val()?'1px solid #ccc':'1px solid red';
	})
	$("#posbillport").change(function(){
		this.style.border = $('#posbillport').val()?'1px solid #ccc':'1px solid red';
	})
	$("#posalarmport").change(function(){
		this.style.border = $('#posalarmport').val()?'1px solid #ccc':'1px solid red';
	})


    $(":input").bind('input propertychange',function(){ 
		var id = $('#id').val();
		var name = $('#name').val() ;
		var type = $('#type').val() ;
		var cameraip = $('#cameraip').val() ;
		var alarmip = $('#alarmip').val() ;
		var alarmport = $('#alarmport').val() ;
		var posip = $('#posip').val() ;
		var posctlport = $('#posctlport').val() ;
		var posbillport = $('#posbillport').val() ;
		var posalarmport = $('#posalarmport').val() ;

		if(id&&name&&id&&type&&alarmport&&posctlport&&posbillport&&posalarmport&&IpReg.test(cameraip)&&IpReg.test(alarmip)&&IpReg.test(posip)){
			$('#submit').removeAttr('disabled');
		}else{
			$('#submit').attr('disabled','');
		} 
	});
}