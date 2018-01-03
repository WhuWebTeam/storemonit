'use strict';

window.onload = function () {
	// 192.168.216.132:7001/api/v1/wmHomePage/2
	// http://121.201.13.217:27002/api/v1/wmHomePage/2

	if (getSearchString('userId')) {
		var userId = getSearchString('userId');
		var cookie = new CookieStorage('/');
		cookie.setItem('userId', userId);
	} else {
		var cookie = new CookieStorage('/');
		var userId = cookie.getItem('userId');
	} //const 常量只在其声明的块级作用域内有效


	$.ajax({
		url: '/api/v1/counters/checker/notAssaigned',
		type: 'GET',
		success: function success(results) {

			var counters = [];
			var isClick = [];
			results = results.data;
			if (results.length == 0) {
				var mes = document.createElement('p');
				//addClass(mes,'no');
				mes.setAttribute('class', 'no');
				mes.innerHTML = '没有待分配的款台';
				document.getElementById('list').appendChild(mes);
			} else {
				sortFun(results, 'id', 1);

				var _loop = function _loop(i) {
					p = document.createElement('p');

					p.setAttribute('class', 'li');
					p.style.backgroundColor = 'white';
					p.style.color = 'black';
					num = results[i].id;

					p.innerHTML = '\u6B3E\u53F0:<span id=\'num\'>' + num + '</span>';
					document.getElementById('list').appendChild(p);

					isClick[i] = false;
					p.onclick = function () {
						if (!isClick[i]) {
							this.style.backgroundColor = 'rgb(93,156,236)';
							this.style.color = 'white';
							counters.push({
								"counterId": results[i].id,
								"type": results[i].type
							});
						} else {
							this.style.backgroundColor = 'white';
							this.style.color = 'black';
							counters.pop();
						}
						isClick[i] = !isClick[i];
					};
				};

				for (var i = 0; i < results.length; i++) {
					var p;
					var num;

					_loop(i);
				}
			}

			var submit = document.getElementById('confirm');
			submit.onclick = function () {
				if (counters.length) {
					$.ajax({
						url: '/api/v1/counterUser/' + userId,
						type: 'POST',
						data: { counters: counters },
						success: function success() {
							window.location = 'checker.html';
						}
					});
				} else {
					window.location = 'checker.html';
				}
			};
		}
	});
};