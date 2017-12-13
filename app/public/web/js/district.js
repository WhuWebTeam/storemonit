window.onload = function(){
	function getList(){
		var tbody = document.getElementsByTagName('tbody')[0];
		tbody.innerHTML='';
		$.ajax({
			url:'/api/v1/areas',
			type:'get',
			success:function(results){
				data = results.data;
				for(var i=0;i<data.length;i++){
					var tr = document.createElement('tr');
					tr.innerHTML = `
						<td><input type="checkbox" value="${data[i].id}"></td>
						<td>${data[i].name}</td>
						<td>${data[i].details}</td>
						<td><button class="btn btn-info btn-sm">编辑</button></td>
					`;
					tbody.appendChild(tr);
				}
			}
		})
	}/* show list */  



	$('#add').click(function(){
		$('#addRecord')[0].style.display = 'block';
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
		$.ajax({
			url:'/api/v1/areas',
			type:'POST',
			data:{
				'id': $('#id').val(),
				'name': $('#name').val(),
				'details': $('#details').val()
			},
			success:function(){
				$('#addRecord')[0].style.display = 'none';
				getList();

			}
		})
	})
	$('#back').click(function(){
		$('#addRecord')[0].style.display = 'none';
		getList();
	})





	getList();
}