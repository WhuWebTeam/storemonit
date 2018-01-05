'use strict';

window.onload = function() {
	var pairs = ["home","aboutUs","products","support","info"];
	var nav = document.getElementsByTagName('nav')[0];
	var spans = nav.getElementsByTagName('span');
	Array.prototype.forEach.call(spans,function(Item,index){
		Item.onclick = function(){
			pairs.forEach(function(value){
				if(document.getElementById(value)){
					document.getElementById(value).style.display = 'none';
				}
			});
			document.getElementById(pairs[index]).style.display = 'block';
		}
	})

}