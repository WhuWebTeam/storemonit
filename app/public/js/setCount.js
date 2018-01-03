'use strict';

var set = document.getElementById('set');
var counter = document.getElementById('counter');

set.onclick = function () {
	/*control show and hide*/
	if (counter.style.display == 'none') {
		counter.style.display = 'block';
	} else {
		counter.style.display = 'none';
	}
	preventBubble(event);
};
document.body.onclick = function () {
	if (counter.style.display == 'block') {
		counter.style.display = 'none';
	}
};

/*bind button to achive page jump*/

$('#myCounter').click(function () {
	window.location = 'myCounter.html';
});

$('#addCounter').click(function () {
	window.location = 'checkout.html';
});

$('#retryCounter').click(function () {
	window.location = 'retryCounter.html';
});

$('#oneKeyRetry').click(function () {
	if (confirm('您将解除与所有款台的绑定！')) {
		console.log(document.cookie);
		$.ajax({
			url: '/api/v1/counterUser/onKeyRetrive/' + userId,
			type: 'delete',
			success: function success() {
				// if(confirm('成功删除所有绑定！,点击确定进入新增款台页，点击取消回到主页')){
				// 	window.location = 'checkout.html';
				// }else{
				window.location.reload();
				//}
			}
		});
	}
});