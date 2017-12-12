window.onload = function(){
	var cookie = new CookieStorage('/');
	const userId = cookie.getItem('userId');

	$.ajax({
		url:'/api/v1/counters/myCounter/' + userId,
		type:'GET',
		success:function(results){
			var counters=[];
			var isClick=[];
			results = results.data;
			if(results.length == 0){
				var mes =document.createElement('p');
				//addClass(mes,'no');
				mes.setAttribute('class','no');
				mes.innerHTML = '没有待解除的款台';
				document.getElementById('list').appendChild(mes);
			}
			sortFun(results,'id',true);
			for(let i=0;i<results.length;i++){
				var p = document.createElement('p');
				p.setAttribute('class','li');
				var num = results[i].id;
				p.innerHTML = `款台:<span id='num'>${num}</span>`;
				p.style.backgroundColor  = 'rgb(93,156,236)';
				document.getElementById('list').appendChild(p);
				isClick[i]=true;
				p.onclick = function(){
					if(!isClick[i]){
						this.style.backgroundColor  = 'rgb(93,156,236)';
						this.style.color = 'white';
						counters.pop();
					}else{
						this.style.backgroundColor = 'white';
						this.style.color = 'black';
						counters.push({
							"counterId":results[i].id
						});
					}
					isClick[i] = !isClick[i];
				}
			}


			var submit = document.getElementById('confirm');
			submit.onclick = function(){
				if(counters.length){
					var info='';
					counters.forEach(function(value){
						info+=' '+value.counterId+' ';
					})
					if(confirm('您将解除与款台'+info+'的绑定')){
						$.ajax({
							url:'/api/v1/counterUser/'+userId,
							type:'delete',
							data:{counters},
							success:function(){
								window.location = 'checker.html';
							}
						})
					}	
				}else{
					if(confirm('您未解除与任何款台的绑定')){
						window.location = 'checker.html';
					}
				}
				
			}
		}
	})



}
