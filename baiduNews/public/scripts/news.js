$(document).ready(function() {
	fontWidth();//导航栏字体宽度
	carouselNews();//新闻轮播图
	scrollTop();//返回页面顶层
	menueTab();//菜单栏按键切换内容函数
	refreshNews();//在用户页面添加新闻函数
});

//导航栏字体宽度
function fontWidth() {
	//获取屏幕宽度
	var deviceWidth = $("body").width();
	//按导航栏字体的个数赋值宽度
	$("nav ul li a").each(function() {

		var font = $(this).text().length;

		if( font<3 ) {
			$(this).parent().width(deviceWidth/6);
		}else{
			$(this).parent().width(deviceWidth/3);
		}
	});
}

//新闻轮播图
function carouselNews() {
	//确定装轮播图片的所有盒子的大小
	var deviceWidth = $("body").width();
	$(".carousel_content").width(deviceWidth);
	$(".carousel_content a").width(deviceWidth);
	//var imgHeight = $(".carousel_content a img").height();
	//$(".carousel_content").height(imgHeight);
	//$(".carousel_content a").height(imgHeight);

	//页面加载时显示的图片
	$(".carousel_content a:not(:first-child)").hide();
	$(".carousel_nav div").eq(0).addClass("selected");
	
	//图片每隔一段时间旋转
	var index = 0;
	setInterval(function() {
		//var haha=$(".visible .carousel_content a").eq(index).find("img").height();
		//console.log(haha);
		carousel(index);
		index += 1;
		if( index>=$(".visible .carousel_content a").length ) {
			index = 0;
		}
	},1000);
	//轮播图函数
	function carousel(index) {
		$(".visible .carousel_content a").eq(index)
		.fadeIn(300).siblings().fadeOut(300);
		$(".visible .carousel_nav div").eq(index).addClass("selected")
		.siblings().removeClass("selected");
	}

}

//返回页面顶层函数
function scrollTop() {
	//当页面滚动到一定高度后出现返回页面顶部按键
	$(window).on("scroll",function() {
		var topHeight = parseInt( $(window).scrollTop());

		if( topHeight>=700 ) {
			$("#scrollTop").fadeIn(500);	

		}else{
			$("#scrollTop").fadeOut(500);
		}
	});
	//返回页面顶部
	$("#scrollTop").on("click",function() {
		$("html,body").animate({scrollTop:0},500);
	});	
}

//菜单栏按键切换内容函数
function menueTab() {
	//获取全部菜单栏和相对应的内容的数组
	var menue = $("nav ul li:not(:last-child)");
	var content = $("article section");
	//遍历，当每一个菜单栏被点击时发生的事件
	menue.each(function(index,value) {
		var time;
		$(this).on("click",function(event) {
			event.preventDefault();
			//延缓事件发生，防止当用户快速地在菜单栏上点击时崩溃
			time = setTimeout(function() {
				menue.removeClass("selected");
				content.removeClass("visible");
				$(value).addClass("selected");
				content.eq(index).addClass("visible");
			},300);
		});
	});
}

//在用户页面添加新闻函数
function refreshNews(type) {
	
	var recommend = $(".recommend .news");//推荐部分
	var internet = $(".internet .news");//互联网部分
	var entertainment = $(".entertainment .news");//娱乐部分	
	var picture = $(".picture .pic_news");//图片部分
	$(".news").empty();//清空原始数据，以便更新
	//从数据库中获取数据
	$.ajax({
		url:"/news",
		type:"get",
		data:{"refresh":"更新"},
		datatype:"json",
		success:function(data){
			data.forEach(function(value,index) {
				//判断从数据库中传回的数据类型，以便对应更新
				if( value.news_type==="推荐" ) {
					var news_list = $("<div></div>").addClass("news_list")
					.appendTo(recommend);
					var news_img = $("<div></div>").addClass("news_img")
					.appendTo(news_list);
					var img = $("<img />").attr("src",value.news_img)
					.appendTo(news_img);
					var news_text = $("<div></div>").addClass("news_text")
					.appendTo(news_list);
					var news_title = $("<p></p>").addClass("news_title")
					.text(value.news_title).appendTo(news_text);
					var news_imformation = $("<p></p>").addClass("news_imformation")
					.appendTo(news_text);
					var news_time = $("<span></span>").addClass("news_time")
					.text(value.news_time.split("T")[0]).appendTo(news_imformation);
					var news_src = $("<span></span>").addClass("news_src")
					.text(value.news_src).appendTo(news_imformation);
				}else if( value.news_type==="互联网" ) {
					var news_list = $("<div></div>").addClass("news_list")
					.appendTo(internet);
					var news_img = $("<div></div>").addClass("news_img")
					.appendTo(news_list);
					var img = $("<img />").attr("src",value.news_img)
					.appendTo(news_img);
					var news_text = $("<div></div>").addClass("news_text")
					.appendTo(news_list);
					var news_title = $("<p></p>").addClass("news_title")
					.text(value.news_title).appendTo(news_text);
					var news_imformation = $("<p></p>").addClass("news_imformation")
					.appendTo(news_text);
					var news_time = $("<span></span>").addClass("news_time")
					.text(value.news_time).appendTo(news_imformation);
					var news_src = $("<span></span>").addClass("news_src")
					.text(value.news_src).appendTo(news_imformation);
				}else if( value.news_type==="娱乐" ) {
					var news_list = $("<div></div>").addClass("news_list")
					.appendTo(entertainment);
					var news_img = $("<div></div>").addClass("news_img")
					.appendTo(news_list);
					var img = $("<img />").attr("src",value.news_img)
					.appendTo(news_img);
					var news_text = $("<div></div>").addClass("news_text")
					.appendTo(news_list);
					var news_title = $("<p></p>").addClass("news_title")
					.text(value.news_title).appendTo(news_text);
					var news_imformation = $("<p></p>").addClass("news_imformation")
					.appendTo(news_text);
					var news_time = $("<span></span>").addClass("news_time")
					.text(value.news_time).appendTo(news_imformation);
					var news_src = $("<span></span>").addClass("news_src")
					.text(value.news_src).appendTo(news_imformation);
				}else if(  value.news_type==="图片" ) {
					var pic_news_list = $("<div></div>").addClass("pic_news_list")
					.prependTo(picture);
					var p = $("<p></p>").text(value.news_title)
					.appendTo(pic_news_list);
					var pic_img = $("<div></div>").addClass("pic_img")
					.appendTo(pic_news_list);
					var img = $("<img />").attr("src",value.news_img)
					.appendTo(pic_img);
					var pic_count = $("<div></div>").addClass("pic_count")
					.appendTo(pic_news_list);
					var span = $("<span></span>").addClass("up_count").text(value.id)
					.appendTo(pic_count);

				}
				
			});
			
		},
		error:function(data) {
			alert("出错啦！");
		}
	});
}

















