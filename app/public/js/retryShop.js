'use strict';

window.onload = function () {
	var cookie = new CookieStorage('/');
	var userId = cookie.getItem('userId');

	$.ajax({
		url: '/api/v1/shops/manager/' + userId,
		type: 'GET',
		success: function success(results) {
			var shops = [];
			var isClick = [];
			results = results.data;
			if (results.length == 0) {
				var mes = document.createElement('p');
				//addClass(mes,'no');
				mes.setAttribute('class', 'no');
				mes.innerHTML = '没有待解除的门店';
				document.getElementById('list').appendChild(mes);
			}
			sortFun(results, 'id', true);

			var _loop = function _loop(i) {
				p = document.createElement('p');

				p.setAttribute('class', 'li');
				num = results[i].id;

				p.innerHTML = '\u95E8\u5E97:<span id=\'num\'>' + num + '</span>';
				document.getElementById('list').appendChild(p);
				p.style.backgroundColor = 'rgb(93,156,236)';
				p.style.color = 'white';
				isClick[i] = true;
				p.onclick = function () {
					if (!isClick[i]) {
						this.style.backgroundColor = 'rgb(93,156,236)';
						this.style.color = 'white';
						shops.pop();
					} else {
						this.style.backgroundColor = 'white';
						this.style.color = 'black';
						shops.push({
							"shopId": results[i].id
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
				if (shops.length) {
					var info = '';
					shops.forEach(function (value) {
						info += ' ' + value.shopId + ' ';
					});
					if (confirm('您将解除与门店' + info + '的绑定')) {
						$.ajax({
							url: '/api/v1/shopUser/retrive/' + userId,
							type: 'delete',
							data: { shops: shops },
							success: function success() {
								window.location = 'districtManager.html';
							}
						});
					}
				} else {
					if (confirm('您未解除与任何门店的绑定')) {
						window.location = 'districtManager.html';
					}
				}
			};
		}
	});
};