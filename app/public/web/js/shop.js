window.onload = function(){

	var areas=[];
	function getAreasInfo(){
		$.ajax({
			url:'/api/v1/areas',
			type:'get',
			success:function(results){
				data = results.data;
				for(let i=0;i<data.length;i++){
					areas.push(data[i].name);
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
						<td>${data[i].name}</td>
						<td>
							<select>
								<option>华北</option>
								<option>华南</option>
								<option>华中</option>
								<option>华东</option>
							</select>
						</td>
						<td>${data[i].details}</td>
						<td><button class="btn btn-info btn-sm">编辑</button></td>
					`;
					tbody.appendChild(tr);
				}
			}
		})
	}
	getList();


}