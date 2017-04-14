$(document).ready(function() {
	arrange();//排列图片
	wait();//滚动加载图片
});

//滚动加载图片
function wait() {
	var num = 22;//图片文件夹中一共有22个图片
	window.onscroll=function() {
		var a=$(window).scrollTop();
		if( lastOne() ) {
			for(var i=1; i<=num; i++) {
				var src = "./images/"+i+".jpeg";
				var div = $("<div>").addClass("outer").appendTo($(".inner"));
				var img = $("<img>").attr("src",src).appendTo(div);
				var p = $("<p>").text("三生三世十里桃花").appendTo(div);
				arrange();
			}
		}
	};
}

//当加载到最后一个图片时
function lastOne() {
	var screen = $(window).scrollTop();
	var lastImg=$(".outer").last().offset().top+Math.floor( $(".outer").last().outerHeight(true)/2 );
	var height = $(window).height();
	//判断页面是否滚动到最后一张图片的一半高度
	return ( lastImg<screen+height )?true:false;
}

//排列图片函数
function arrange() {
	var boxWidth = $(".outer").eq(0).outerWidth(true);//获取图片盒子的宽度
	var number = Math.floor($(".wrapper").width()/boxWidth);//获取屏幕上一行放置图片的数量
	var boxArry=[];//创建放置图片盒子高度的数组
	$(".outer").each(function(index,value) {
		var boxHeight = $(".outer").eq(index).outerHeight(true);//获取每个图片盒子的高度
		if( index<number ) {
			//从第一个图片到一行可放置的最大限度的图片，每个图片的高度放置在数组中
			boxArry[index]=boxHeight;
			$(value).css({
				"position":"absolute",
				"top":"0",
				"left":boxWidth*index
			});
		}else{
			var minHeight = Math.min.apply(null,boxArry);//获得之前摆放图片的最小高度
			var minHeightIndex = $.inArray(minHeight,boxArry);//获取最小高度图片的下标
			//把图片放置在最小高度图片下面
			$(value).css({
				position:"absolute",
				top:minHeight,
				left:$(".outer").eq(minHeightIndex).position().left
			});
			boxArry[minHeightIndex] += $(".outer").eq(index).outerHeight(true);
		}
	});
}
