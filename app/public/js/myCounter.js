window.onload = function () {
	//const userId = getSearchString('userId');
	var cookie = new CookieStorage('/');
	const userId = cookie.getItem('userId');

	$.ajax({
		url: '/api/v1/counters/myCounter/' + userId,
		type: 'GET',
		success: function (results) {

			results = results.data;
			if (results.length == 0) {
				var mes = document.createElement('p');
				mes.setAttribute('class', 'no');
				mes.innerHTML = '您还没有绑定的款台';
				document.getElementById('list').appendChild(mes);
			}
			sortFun(results, 'id', true);
			for (let i = 0; i < results.length; i++) {
				var p = document.createElement('p');
				p.setAttribute('class', 'li');
				p.style.backgroundColor = 'rgb(93,156,236)';
				p.style.color = 'white';
				var num = results[i].id;
				p.innerHTML = `款台:<span id='num'>${num}</span>`;
				document.getElementById('list').appendChild(p);
			}

			var submit = document.getElementById('confirm');
			submit.onclick = function () {
				window.location = 'checker.html';
			};
		}
	});
};