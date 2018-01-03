'use strict';

window.onload = function () {
	var cookie = new CookieStorage('/');
	var userId = cookie.getItem('userId');

	$.ajax({
		url: '/api/v1/counters/myCounter/' + userId,
		type: 'GET',
		success: function success(results) {
			var counters = [];
			var isClick = [];
			results = results.data;
			if (results.length == 0) {
				var mes = document.createElement('p');
				//addClass(mes,'no');
				mes.setAttribute('class', 'no');
				mes.innerHTML = '没有待解除的款台';
				document.getElementById('list').appendChild(mes);
			}
			sortFun(results, 'id', true);

			var _loop = function _loop(i) {
				p = document.createElement('p');

				p.setAttribute('class', 'li');
				num = results[i].id;

				p.innerHTML = '\u6B3E\u53F0:<span id=\'num\'>' + num + '</span>';
				p.style.backgroundColor = 'rgb(93,156,236)';
				p.style.color = 'white';
				document.getElementById('list').appendChild(p);
				isClick[i] = true;
				p.onclick = function () {
					if (!isClick[i]) {
						this.style.backgroundColor = 'rgb(93,156,236)';
						this.style.color = 'white';
						counters.pop();
					} else {
						this.style.backgroundColor = 'white';
						this.style.color = 'black';
						counters.push({
							"counterId": results[i].id
						});
					}
					isClick[i] = !isClick[i];
				};
			};

			for (var i = 0; i < results.length; i++) {
				var p;
				var num;

				_loop(i);
			}

			var submit = document.getElementById('confirm');
			submit.onclick = function () {
				if (counters.length) {
					var info = '';
					counters.forEach(function (value) {
						info += ' ' + value.counterId + ' ';
					});
					if (confirm('您将解除与款台' + info + '的绑定')) {
						$.ajax({
							url: '/api/v1/counterUser/' + userId,
							type: 'delete',
							data: { counters: counters },
							success: function success() {
								window.location = 'checker.html';
							}
						});
					}
				} else {
					if (confirm('您未解除与任何款台的绑定')) {
						window.location = 'checker.html';
					}
				}
			};
		}
	});
};