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


	function getCountsInfo(shopId){
		$.ajax({
			url:'/api/v1/counters/shop/'+shopId,
			type:'get',
			success:function(results){
				var tbody = document.getElementsByTagName('tbody')[0];
				tbody.innerHTML='';
				data = results.data;

				for(let i=0;i<1;i++){
					var tr = document.createElement('tr');
					tr.innerHTML = `
						<td><input type="checkbox" value="${data[i].id}"></td>
						<td>${data[i].name}</td>
						<td>${data[i].typeid}</td>
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

				
					// var edit = tr.getElementsByTagName('span')[0];
					// edit.onclick = function(){
					// 	$('#handleRecord p').html('编辑区域');
					// 	$('#id').val(data[i].id);
					// 	$('#name').val(data[i].name);
					// 	$('#details').val(data[i].details);
					// 	$('#operation').val('edit');
					// 	$('#handleRecord')[0].style.display = 'block';
					// }
				}
			}
		})
	} /* get shops info  by area id*/


	getAreasInfo();
	$("#areas").bind('input propertychange',function(){ 
		getShopsInfo( $("#areas").val() );
	});
	$("#shops").bind('input propertychange',function(){ 
		getCountsInfo( $("#shops").val() );
	});

}