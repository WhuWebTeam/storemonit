var set = document.getElementById('set');
var shop = document.getElementById('shop');


set.onclick = function(){
	/*control show and hide*/
	if(shop.style.display=='none'){
		shop.style.display='block';
	}else{
		shop.style.display='none';
	}
	preventBubble(event);
}
document.body.onclick = function(){
	if(shop.style.display=='block'){
		shop.style.display='none';
	}
}


/*bind button to achive page jump*/

$('#myShop').click(function(){
	window.location = `myShop.html`;
})

$('#addShop').click(function(){
	window.location = `addShop.html`;
})

$('#retryShop').click(function(){
	window.location = `retryShop.html`;
})

$('#oneKeyRetry').click(function(){
	if(confirm('您将解除与所有门店的绑定！')){
		console.log(document.cookie);
		$.ajax({
			url:'/api/v1/shopUser/oneKeyRetrive/'+userId,
			type:'delete',
			success:function(){
				// if(confirm('成功删除所有绑定！,点击确定进入新增门店页，点击取消回到主页')){
				// 	window.location = 'addShop.html';
				// }else{
					window.location.reload();
				//}
			}
		})
	}
})
