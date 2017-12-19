window.onload = function(){

	var select = '';
	function getAreasInfo(){
		$.ajax({
			url:'/api/v1/areas/info/areas',
			type:'get',
			success:function(results){
				data = results.data;
				for(let i=0;i<data.length;i++){
					select += `<option value="${data[i].id}">${data[i].name}</option>`
				}
			}
		})
	} /* get areas info  */
	getAreasInfo();

	function getList(){
		var tbody = document.getElementsByTagName('tbody')[0];
		tbody.innerHTML='';
		$.ajax({
			url:'/api/v1/shops/info/shops',
			type:'get',
			success:function(results){
				data = results.data;
				for(let i=0;i<data.length;i++){
					var tr = document.createElement('tr');
					tr.innerHTML = `
						<td><input type="checkbox" value="${data[i].id}"></td>
						<td>${data[i].id}</td>
						<td>${data[i].shopname}</td>
						<td>${data[i].areaname}</td>
						<td>${data[i].details}</td>
						<td><button class="btn btn-info btn-sm">编辑</button></td>
					`;
					tbody.appendChild(tr);

					var edit = tr.getElementsByTagName('button')[0];
					edit.onclick = function(){
						$('#handleRecord p').html('编辑门店');
						$('#id').val(data[i].id);
						$('#shopname').val(data[i].shopname);
						$('#areaname').html(select);

						$('#areaname').find('option').each(function(){
							if($(this).text() ==  data[i].areaname){
								$(this).attr('selected','selected');
							}
						})

						$('#details').val(data[i].details);
						$('#operation').val('edit');
						$('#handleRecord')[0].style.display = 'block';
					}
				}
			}
		})
	}

	$('#add').click(function(){
		$('#handleRecord p').html('新增门店');
		$('#id').val('');
		$('#shopname').val('');
		$('#areaname').html(select);
		$('#details').val('');
		$('#operation').val('add');
		$('#handleRecord')[0].style.display = 'block';
	});

	$('#delete').click(function(){
		var shops = [];
		$(':checked').each(function(){ 
			shops.push({
				'id':this.value
			});
		}); 
		$.ajax({
			url:'/api/v1/shops',
			type:'delete',
			data:{shops},
			success:function(){
				getList();
			}
		})
	})


	$('#submit').click(function(){
		if($('#operation').val()=='add'){
			$.ajax({
				url:'/api/v1/shops/info/'+$('#id').val(),
				type:'POST',
				data:{
					'areaId': $('#areaname').val(),
					'name': $('#shopname').val(),
					'details': $('#details').val()
				},
				success:function(){
					$('#handleRecord')[0].style.display = 'none';
					getList();
				}
			})
		}
		if($('#operation').val()=='edit'){
			$.ajax({
				url:'/api/v1/shops/info/'+$('#id').val(),
				type:'put',
				data:{
					'areaId': $('#areaname').val(),
					'name': $('#shopname').val(),
					'details': $('#details').val()
				},
				success:function(){
					$('#handleRecord')[0].style.display = 'none';
					getList();

				}
			})
		}
	})


	$('#back').click(function(){
		$('#handleRecord')[0].style.display = 'none';
	})

	getList();




}