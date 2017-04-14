$(document).ready(function() {
	Head();//头部样式
	left();//右边导航栏部分
	mainArticle();//中间文本部分
	aFooter();//文本下面跳转页面部分
	Footer();//最下面脚本样式
	floatImg();//屏幕右边固定的向上按键部分
});

//头部样式
function Head() {
	//头部左边部分
	//可看见页面当鼠标划过时
	$(".h-nav ul li").each(function(index) {
		$(this).mouseover(function() {
			$(this).addClass("h-tabin").children("a").addClass("h-tabin");
			$(this).children("i.h-nav-icon").addClass("h-nav-rotate");
			$(this).children(".h-second").css({"display":"block"});
		});
		$(this).mouseout(function() {
			
			$(this).children("i.h-nav-icon").removeClass("h-nav-rotate");
			$(this).children(".h-second").css({"display":"none"});
			if( !(index==2) ) {
				$(this).removeClass("h-tabin").children("a").removeClass("h-tabin");
			}
		});
	});
	//2级页面当鼠标划过时
	$(".h-second").each(function(index) {
		$(this).children("a").hover(function() {
			if( index==0 ) {
			$(this).css({"color":"rgb(53, 181, 88)"}).siblings().css({"color":"#666"});
		}else{
			$(this).css({"color":"rgb(53, 181, 88)","background":"#fafafa"})
			.siblings().css({"color":"#666","background":"none"});
		}
		});
	});
	//头部右边部分
	//搜索部分
	$(".h-search").mouseover(function() {
		$(this).attr("style","background-image:url(./images/head/icon2.png)");
	});
	$(".h-search").mouseout(function() {
		$(this).removeAttr("style");
	});
	//手机app部分
	$(".h-app").mouseover(function() {
		$(this).attr("style","background-image:url(./images/head/app-icon2.png)");
		$(this).children("div").css({"display":"block"});
	});
	$(".h-app").mouseout(function() {
		$(this).removeAttr("style");
		$(this).children("div").css({"display":"none"});
	});
	//会员信息部分
	$(".h-customer").mouseover(function() {
		$(this).children("dl").css({"display":"block"});
		$(".h-customer dd").mouseover(function() {
			$(this).css({"background-color":"#fafafa"})
			.children("*").attr("style","color:rgb(53, 181, 88) !important");
		});
		$(".h-customer dd").mouseout(function() {
			$(this).css({"background-color":"transparent"})
			.children("*").removeAttr("style");
		});
	});
	$(".h-customer").mouseout(function() {
		$(this).children("dl").css({"display":"none"});
	});
}

//右边导航栏部分
function left() {
	//右边导航栏上半部分
	$(".as-body li").mouseover(function() {
		$(this).css({"box-shadow":"1px 2px 4px rgba(0,0,0,.1)"});
		$(this).children(".as-outer").css({"display":"block"});
		$(this).children("a").addClass("as-beauty");
		//2级页面部分
		$(".as-body dl a").mouseover(function() {
			$(this).attr("style","color:rgb(53, 181, 88) !important");
		});
		$(".as-body dl a").mouseout(function() {
			$(this).removeAttr("style");
		});
	});
	$(".as-body li").mouseout(function() {
		$(this).css({"box-shadow":"none"});
		$(this).children(".as-outer").css({"display":"none"});
		$(this).children("a").removeClass("as-beauty");
	});
	//右边导航栏下半部分
	$(".as-list li").mouseover(function() {
		$(this).addClass("as-check");
		$(this).attr("style","background-color:#fafafa");
	});
	$(".as-list li").mouseout(function() {
		$(this).removeAttr("style");
		$(this).removeClass("as-check");
	});
}

//中间文本部分
function mainArticle() {
	//文本上面标题部分
	$(".a-head-left .dt").mouseover(function() {
		$(this).children(".dd").css({"display":"block"});
		$(this).children("i").css({"visibility":"hidden"});
		var height = $(this).children(".dd").height();
		height = height + $(this).height();
		$(this).css({"height":height});
		$(this).addClass("shadow");
		//2级页面部分
		$(".a-head-left .dd a").mouseover(function() {
			$(this).attr("style","color:rgb(53, 181, 88)");
		});
		$(".a-head-left .dd a").mouseout(function() {
			$(this).removeAttr("style");
		});
	});
	$(".a-head-left .dt").mouseout(function() {
		$(this).children(".dd").css({"display":"none"});
		$(this).find("i").css({"visibility":"visible"});
		$(this).css({"height":"36px"});
		$(this).removeClass("shadow");
	});
	//文本标题右面排列转换按键
	$(".a-head-right li").each(function(index,value) {
		$(value).on("click",function() {
			if( index==1 ) {
				$(".lesson").children("ul").addClass("crossrange");
			}else{
				$(".lesson").children("ul").removeClass("crossrange");
			}
			//保存本地课程排列方式数据
			var range = $(".lesson").children("ul").attr("class");
			localStorage.setItem("range",range);
		});
	});
	//获取本地课程排列方式数据
	var name = localStorage.getItem("range");
	$(".lesson").children("ul").attr("class",name);
	//文本中间主要课程部分
	$(".lesson ul li").mouseover(function() {
		//先判断课程表的排列方式，每个排列方式执行不一样的操作
		if( $(".lesson").children("ul").attr("class")=="crossrange" ) {
			$(this).find(".love").css({"display":"block"});
			$(this).find(".lesson-play").css({"opacity":"1"});
			$(".lesson-text h2 a").hover(function() {
				$(this).css({"color":"rgb(53, 181, 88)"});
			},function() {
				$(this).css({"color":"#333"});
			});
		}else{
			$(this).find(".love").css({"display":"block"});
			$(this).find(".lesson-play").css({"opacity":"1"});
			$(this).find("p").stop().slideDown("slow");
			$(this).find(".lesson-hide").show();
			$(this).find(".study").show();
		}		
	});
	$(".lesson ul li").mouseout(function() {
		if( $(".lesson").children("ul").attr("class")=="crossrange" ) {
			$(this).find(".love").css({"display":"none"});
			$(this).find(".lesson-play").css({"opacity":"0"});
		}else{
			$(this).find(".love").css({"display":"none"});
			$(this).find(".lesson-play").css({"opacity":"0"});
			$(this).find("p").stop().slideUp("slow");
			$(this).find(".lesson-hide").hide();
			$(this).find(".study").hide();
		}		
	});
}

//文本下面跳转页面部分
function aFooter() {
	$(".a-green").mouseover(function() {
		if( $(this).css("color")!="rgb(255, 255, 255)" ) {
			$(this).attr("style","color:#35b558;border-color:#35b558");
		}
	});
	$(".a-green").mouseout(function() {
		$(this).removeAttr("style");
	});
}

//最下面脚本样式
function Footer() {
	//左边文字部分
	$(".f-top dl dd a").mouseover(function() {
		$(this).css({"color":"#35b558"});
	});
	$(".f-top dl dd a").mouseout(function() {
		$(this).css({"color":"#999999"});
	});
	//右边图片部分
	$(".f-iphone").mouseover(function() {
		$(this).children().css({"display":"block"});
	});
	$(".f-iphone").mouseout(function() {
		$(this).children().css({"display":"none"});
	});
	$(".f-android").mouseover(function() {
		$(this).children().css({"display":"block"});
	});
	$(".f-android").mouseout(function() {
		$(this).children().css({"display":"none"});
	});
}

//屏幕右边固定向上按键部分
function floatImg() {
	//向上按键
	$("#screen-top").mouseover(function() {
		$(this).attr("style","background-image:url(./images/gotop2.jpg)");
	});
	$("#screen-top").mouseout(function() {
		$(this).removeAttr("style");
	});
	$("#screen-top").on("click",function() {
		$("html,body").animate({scrollTop:0},500);
	});
	//手机图标
	$(".go-top a").mouseover(function() {
		$(this).children().css({"display":"block"});
	});
	$(".go-top a").mouseout(function() {
		$(this).children().css({"display":"none"});
	});
}