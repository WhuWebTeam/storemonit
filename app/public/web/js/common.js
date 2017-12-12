window.onload = function(){
	var pages = ['district','shop','count','system','server'];
	var navLists = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
	Array.prototype.forEach.call(navLists,function(Item,index){
		Item.onclick = function(){
			window.location =  pages[index] + '.html';
		}
	})
}