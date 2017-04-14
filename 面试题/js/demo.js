$(document).ready(function() {
	
	$("span").each(function(index,value) {

		$(value).on("click",function() {
			$(value).css("background-color","rgba(0,0,0,0.5").siblings().css("background-color","rgba(0,0,0,0.1)");
			$("ul").css("display","none");
			$("ul").eq(index).css("display","block");
		});
	});
});