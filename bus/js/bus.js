$(document).ready(function() {
	$(".article").find("li").each(function(index,value) {
		$(value).hover(function() {
			$(value).attr("style","text-shadow:0 0 20px red;color:black");
		},function() {
			$(value).removeAttr("style");
		});

		$(value).on("click",function() {
			$(".position").text( $(value).text() );
		});
	});
});