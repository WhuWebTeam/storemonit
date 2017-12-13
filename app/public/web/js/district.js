window.onload = function(){
	function getList(){
		var tbody = document.getElementsByTagName('tbody')[0];
		tbody.innerHTML='';
		$.ajax({
			url:'/api/v1/areas',
			type:'get',
			success:function(results){
				data = results.data;
				for(let i=0;i<data.length;i++){
					var tr = document.createElement('tr');
					tr.innerHTML = `
						<td><input type="checkbox" value="${data[i].id}"></td>
						<td>${data[i].name}</td>
						<td>${data[i].details}</td>
						<td><button class="btn btn-info btn-sm">编辑</button></td>
					`;
					tbody.appendChild(tr);

					var edit = tr.getElementsByTagName('button')[0];
					edit.onclick = function(){
						$('#handleRecord p').html('编辑区域');
						$('#id').val(data[i].id);
						$('#name').val(data[i].name);
						$('#details').val(data[i].details);
						$('#operation').val('edit');
						$('#handleRecord')[0].style.display = 'block';
					}
				}
			}
		})
	}/* show list */  



	$('#add').click(function(){
		$('#id').val();
		$('#name').val();
		$('#details').val();
		$('#operation').val('add');
		$('#handleRecord')[0].style.display = 'block';
	});

	$('#delete').click(function(){
		var areas = [];
		$(':checked').each(function(){ 
			areas.push({
				'id':this.value
			});
		}); 
		$.ajax({
			url:'/api/v1/areas',
			type:'delete',
			data:{areas},
			success:function(){
				getList();
			}
		})
	})


	$('#submit').click(function(){
		if($('#operation').val()=='add'){
			$.ajax({
				url:'/api/v1/areas',
				type:'POST',
				data:{
					'id': $('#id').val(),
					'name': $('#name').val(),
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
				url:'/api/v1/areas/info/'+$('#id').val(),
				type:'put',
				data:{
					'name': $('#name').val(),
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
		getList();
	})





	getList();
}