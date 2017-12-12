window.onload = function(){
	function getList(){
		$.ajax({
			url:'/api/v1/areas',
			type:'get',
			success:function(results){
				data = results.data;
				var tbody = document.getElementsByTagName('tbody')[0];
				for(var i=0;i<data.length;i++){
					var tr = document.createElement('tr');
					tr.setAttribute('id',data[i].id);
					tr.innerHTML = `
						<td><input type="checkbox"></td>
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
	getList();
}