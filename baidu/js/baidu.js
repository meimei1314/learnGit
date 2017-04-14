$(document).ready(function() {
	header();//百度首页交互
	articleExchange();//百度内容页面
	top_btn();//返回顶层按键
	search();//搜索栏部分
	skin();//换肤部分
});

//简单工厂函数,改变的是对象的自身
function Change() {
	var obj = new Object();
	obj.mouse = function(name,fontColor,backgroundColor,child,underline,position) {
		var name = name;//对象
		var fontColor = fontColor;//字体颜色
		var backgroundColor = backgroundColor;//背景颜色
		var child = child;//对象的子类
		var underline = underline;//下划线
		var position = position;//位置

		var element = null;
		if( !child ) {

			$(name).hover(function() {

				if( !fontColor ) {
					fontColor = $(this).css("color");
				}
				if( !backgroundColor ) {
					backgroundColor = $(this).css("background-color");
				}
				if( !underline ) {
					underline = $(this).css("text-decoration");
				}
				if( !position ) {
					position = $(this).css("background-position");
				}

				element = "color:"+fontColor+";background-color:"+backgroundColor+
				";text-decoration:"+underline+";background-position:"+position;
				$(this).attr("style",element);

			},function() {

				$(this).removeAttr("style");

			});

		}else {

			$(name).find(child).on("mouseover mouseout",function(e) {

				if( e.type === "mouseover" ) {

					if( !fontColor ) {
						fontColor = $(name).find(child).css("color");
					}
					if( !backgroundColor ) {
						backgroundColor = $(name).find(child).css("background-color");
					}
					if( !underline ) {
						underline = $(name).find(child).css("text-decoration");
					}
					if( !position ) {
						position = $(name).find(child).css("background-position");
					}

					element = "color:"+fontColor+";background-color:"+backgroundColor+
					";text-decoration:"+underline+";background-position:"+position;
					$(this).attr("style",element);

				}else if( e.type === "mouseout" ) {
					$(this).removeAttr("style");
				}

				
			});
		}
	}

	return obj;
}

//简单工厂模式，改变的是对象的子类
function Child() {
	var obj = new Object();
	
	obj.mouse = function(name,objectChild,changeChild,fontColor,backgroundColor,
		underline,position,show) {
		var name = name;//对象
		var objectChild = objectChild;//对象的子类，当鼠标划过的子类
		var changeChild = changeChild;//当鼠标划过时，发生变化的子类
		var fontColor = fontColor;//字体颜色
		var backgroundColor = backgroundColor;//背景颜色
		var underline = underline;//下划线
		var position = position;//位置
		var show = show;//隐藏的模块出现

		var element = null;
		if( !objectChild ) {

			$(name).hover(function() {

				if( !fontColor ) {
					fontColor = $(name).find(changeChild).css("color");
				}
				if( !backgroundColor ) {
					backgroundColor = $(name).find(changeChild).
					css("background-color");
				}
				if( !underline ) {
					underline = $(name).find(changeChild).css("text-decoration");
				}
				if( !position ) {
					position = $(name).find(changeChild).css("background-position");
				}
				if( !show ) {
					show = $(this).find(changeChild).css("display");
				}

				element = "color:"+fontColor+";background-color:"+backgroundColor+
				";text-decoration:"+underline+";background-position:"+position+
				";display:"+show;
				$(this).find(changeChild).attr("style",element);

			},function() {

				$(this).find(changeChild).removeAttr("style");

			});

		}else {

			$(name).find(objectChild).on("mouseover mouseout",function(e) {

				if( e.type === "mouseover" ) {

					if( !fontColor ) {
						fontColor = $(this).find(changeChild).css("color");
					}
					if( !backgroundColor ) {
						backgroundColor = $(this).find(changeChild).
						css("background-color");
					}
					if( !underline ) {
						underline = $(this).find(changeChild).css("text-decoration");
					}
					if( !position ) {
						position = $(this).find(changeChild).
						css("background-position");
					}

					element = "color:"+fontColor+";background-color:"+backgroundColor+
					";text-decoration:"+underline+";background-position:"+position+
					";display:"+show;
					$(this).find(changeChild).attr("style",element);

				}else if( e.type === "mouseout" ) {
					$(this).find(changeChild).removeAttr("style");
				}

				
			});
		}
	}

	return obj;
}

//百度首页交互
function header() {
	//构造函数实例化
	var change = new Change();
	var child = new Child();

	//左边天气部分
	child.mouse(".weather",null,".weather-hidden",null,null,null,null,"block");

	change.mouse(".lunar-sevenday",null,null,"a","underline");

	change.mouse(".lunar-setting-btn","#0079f5",null,null,null,"-36px -122px");

	child.mouse(".weather-everyday","a","p","#0079f5");

	//右边用户界面
	child.mouse(".nav","li:nth-child(7)",".user-hidden",null,null,null,null,"block");

	change.mouse(".user-content","#fff","#38f","a");

	//右边设置部分
	child.mouse(".nav","li:nth-child(8)",".setting-hidden"
		,null,null,null,null,"block");

	change.mouse(".setting-content","#fff","#38f","a");

	//右边更多产品部分
	child.mouse(".nav","li:last-child",".more-product-hidden",
		null,null,null,null,"block");
	change.mouse(".more-product-content",null,null,"a","underline");
}

//百度内容页面
function articleExchange() {
	//构造函数实例化
	var change = new Change();

	//tab按键，内容切换
	$(".tab-btn").each(function(index,value) {
		//当鼠标划过时，对应的背景色改变
		$(value).hover(function() {
			$(value).addClass("tab-btn-hover");
		},function() {
			$(value).removeClass("tab-btn-hover");
		});
		
		$(value).on("click",function() {
			//当点击菜单时，对应的内容页切换
			$(".tab-btn").removeClass("tab-btn-click");
			$(".tab-text").removeClass("section-visible");
			$(value).addClass("tab-btn-click");
			$(".tab-text").eq(index).addClass("section-visible");

			//当对应的内容页切换时，加载内容
			switch(index) {
				case 1:
					hot();//推荐页面加载
					break;
				case 2:
					navgi();//导航页面加载
					break;
				case 3:
					video();//视频页面加载
					break;
				case 4:
					shopping();//购物页面加载
					break;
				default:
					break;
			}
		});		

	});

	//当鼠标划过时颜色改变
	change.mouse(".menu-setting",null,null,"span",null,"-121px -73px");
}

//推荐页面加载
function hot() {
	//构造函数实例化
	var change = new Change();
	var child = new Child();

	//右边信息部分
	var i = 0;
	var ul = $(".hot-right").children("ul").eq(0);
	while( i<16 ) {
		var li = $("<li></li>").appendTo(ul);
		var a = $("<a></a>").text("中澳联手侦破走私").appendTo(li);
		var span = $("<span></span>").appendTo(li);
		i++;
	}

	//左边新闻部分
	var j = 0;
	var hot_left = $(".hot-left").eq(0);
	for(j; j<21; j++) {
		var hot_left_section = $("<div></div>").addClass("hot-left-section")
		.appendTo(hot_left);
		var h2 = $("<h2></h2>").text("习近平同密克罗尼西亚联邦总统克里斯琴举行会谈")
		.appendTo(hot_left_section);
		var div = $("<div></div>").addClass("hot-left-section-text")
		.appendTo(hot_left_section);
		var src = $("<span></span>").addClass("hot-src").text(" 搜狐新闻 ")
		.appendTo(div);
		var time = $("<span></span>").addClass("hot-time").text("03-27 14:37")
		.appendTo(div);
		var point = $("<span></span>").addClass("hot-point").text("搜狐").
		appendTo(div);
	}

	//当鼠标划过时
	child.mouse(".hot-refresh",null,".hot-refresh-icon",null,null,null,"-23px -42px");
	change.mouse(".hot-refresh","#07f");

	child.mouse(".hot-right","li","a","#07f",null,"underline");

	change.mouse(".hot-left","#07f",null,".hot-left-section h2","underline");

}

//导航页面部分
function navgi() {
	//构造函数实例化
	var child = new Child();

	//猜你新欢
	var i = 0;
	var navgi_one = $(".navgi-one").eq(0);
	for(i; i<24; i++) {
		var div_outter =$("<div></div>").addClass("navgi-one-content")
		.appendTo(navgi_one);
		var div_text = $("<div></div>").addClass("one-content-text")
		.appendTo(div_outter);
		var img = $("<img />").attr("src","./img/navgi-one-text.png")
		.appendTo(div_text);
		var span = $("<span></span>").text("百度糯米").appendTo(div_text);
		var fanli = $("<div></div>").addClass("one-content-fanli")
		.appendTo(div_outter);
		var rebate = $("<div></div>").addClass("one-content-rebate")
		.text("最高返利50.25%").appendTo(div_outter);
	}
	//猜你喜欢部分，当鼠标划过时
	child.mouse(".navgi-one",".navgi-one-content",".one-content-rebate",
		null,null,null,null,"block");

	//咨询信息
	var j = 0;
	var navgi_two = $(".navgi-two").eq(0);
	for(j; j<16; j++) {
		var div = $("<div></div>").addClass("navgi-two-content").appendTo(navgi_two);
		var img = $("<img />").attr("src","./img/navgi-two-text.jpg").appendTo(div);
	}

	//娱乐休闲
	var k = 0;
	var navgi_three = $(".navgi-three").eq(0);
	for(k; k<11; k++) {
		var div = $("<div></div>").addClass("navgi-three-content")
		.appendTo(navgi_three);
		var img = $("<img />").attr("src","./img/navgi-three-text.jpg")
		.appendTo(div);
	}

	//购物海涛
	var x = 0;
	var navgi_four = $(".navgi-four").eq(0);
	for(x; x<18; x++) {
		var content = $("<div></div>").addClass("navgi-four-content")
		.appendTo(navgi_four);
		var text = $("<div></div>").addClass("four-content-text")
		.appendTo(content);
		var img = $("<img />").attr("src","./img/navgi-four-text.jpg")
		.appendTo(text);
		var fanli = $("<div></div>").addClass("four-content-fanli")
		.appendTo(content);
		var rebate = $("<div></div>").addClass("four-content-rebate")
		.text("最高返利3.54%").appendTo(content);
	}
	//购物海涛部分，当鼠标划过时
	child.mouse(".navgi-four",".navgi-four-content",".four-content-rebate",
		null,null,null,null,"block");

	//生活周边
	var w = 0;
	var navgi_five = $(".navgi-five").eq(0);
	for(w; w<7; w++) {
		var div = $("<div></div>").addClass("navgi-five-content")
		.appendTo(navgi_five);
		var img = $("<img />").attr("src","./img/navgi-five-text.jpg")
		.appendTo(div);
	}
}

//视频部分
function video() {
	var i = 0;
	var video_outter = $(".video-content").eq(0);
	for(i; i<25; i++) {
		var video_big = $("<div></div>").addClass("video-big").appendTo(video_outter);
		var video_img = $("<div></div>").addClass("video-big-img")
		.appendTo(video_big);
		var img = $("<img />").attr("src","./img/video-big-text.jpeg")
		.appendTo(video_img);
		var title = $("<div></div>").addClass("video-title").appendTo(video_img);
		var hover_delete = $("<div></div>").addClass("video-hover-delete")
		.appendTo(video_img);
		var star = $("<div></div>").addClass("video-hover-star").appendTo(video_img);
		var num = $("<div></div>").addClass("video-num").appendTo(video_img);
		var span = $("<span></span>").text("52集全").appendTo(num);
		var text = $("<div></div>").addClass("video-big-text").appendTo(video_big);
		var name = $("<div></div>").addClass("video-name").text("迪迦奥特曼")
		.appendTo(text);
		var score = $("<div></div>").addClass("video-score").appendTo(text);
		var score_star = $("<span></span>").addClass("video-star").appendTo(score);
		var em = $("<em></em>").appendTo(score_star);
		var span1 = $("<span></span>").text("7.9").appendTo(score);
	}

	//当鼠标划过时
	$(".video-content").find(".video-big").hover(function() {
		$(this).find(".video-title").css("display","none");
		$(this).find(".video-hover-delete").css("display","block").hover(function() {
			$(this).attr("title","不感兴趣");
		},function() {
			$(this).removeAttr("title");
		});
		$(this).find(".video-hover-star").css("display","block").hover(function() {
			$(this).attr("title","添加关注");
		},function() {
			$(this).removeAttr("title");
		});

	},function() {
		$(this).find(".video-title").css("display","block");
		$(this).find(".video-hover-delete").css("display","none");
		$(this).find(".video-hover-star").css("display","none");
	});
}

//购物部分
function shopping() {
	//构造函数实例化
	var child = new Child();

	var i = 0;
	var outter = $(".shopping-content").eq(0);
	for(i; i<25; i++) {
		var section = $("<div></div>").addClass("shopping-section1").appendTo(outter);
		var shopping_img = $("<div></div>").addClass("shopping-img")
		.appendTo(section);
		var img = $("<img />").attr("src","./img/shopping-text.jpg")
		.appendTo(shopping_img);
		var text = $("<div></div>").addClass("shopping-text").appendTo(section);
		var title = $("<p></p>").addClass("shopping-title")
		.text("长丰海鲜水产 盱眙麻辣小龙虾尾 即食生鲜龙虾球 1盒").appendTo(text);
		var price = $("<p></p>").addClass("shopping-price clear").appendTo(text);
		var now = $("<span></span>").addClass("shopping-price-now").text("￥78")
		.appendTo(price);
		var old = $("<span></span>").addClass("shopping-price-old").text("78")
		.appendTo(price);
		var fanli = $("<p></p>").addClass("shopping-fanli clear").appendTo(text);
		var fanli_price = $("<span></span>").addClass("shopping-fanli-price")
		.text("-21.84").appendTo(fanli);
		var baifenbi = $("<span></span>").addClass("shopping-fanli-baifenbi")
		.text("返现28%").appendTo(fanli);
		var src = $("<span></span>").addClass("shopping-fanli-src").text("京东")
		.appendTo(fanli);
	}

	//当鼠标划过时
	child.mouse(".shopping-content",".shopping-section1",
		".shopping-title","#07f",null,"underline");
}

//返回顶层按键
function top_btn() {
	$(document).on("scroll",function() {
		var height = $(document).scrollTop();

		if( height>700 ) {
			$(".article-top-btn").attr("style","display:block");
		}else{
			$(".article-top-btn").removeAttr("style");
		}

		$(".article-top-btn").on("click",function() {
				$(document).scrollTop(0);
			});
	});
}

//搜索栏部分
function search() {
	//构造函数实例化
	var change = new Change();
	var child = new Child();

	//浮动搜索栏出现,获得焦点
	$(".main-content").children("input").focus();
	$(document).on("scroll",function() {
		var height = $(document).scrollTop();
		if( height>300 ) {
			$(".float-search").css("display","block");
			$(".float-content").children("input").focus();
		}else{
			$(".float-search").css("display","none");
			$(".main-content").children("input").focus();
		}
	});

	//当鼠标划过时,麦克风改变
	$(".speak").hover(function() {
		$(this).css("background-image","url(./img/search-speak-hover.png)");
	},function() {
		$(this).css("background-image","url(./img/search-speak.png)");
	});

	//当鼠标划过时，照相机改变
	change.mouse(".watch",null,null,null,null,"0 -20px");

	//当鼠标划过时，浮动搜索栏的按键部分
	child.mouse(".float-button",null,"input",null,"#317ef3");

}

//换肤部分
function skin() {
	//读取本地背景图片数据
	var getImg = localStorage.getItem("background-image");
	$(".container").attr("style",getImg);

	//获取本地确信小图标数据
	var get_index = localStorage.getItem("img_index");
	var sure_li = $(".skin-img").find("li").eq(get_index);
	sure_li.find(".skin-sure").css("display","block");

	//获取本地预览图片
	var preview_bg = localStorage.getItem("preview_bg");
	$(".preview-bg").find(".img").css("background",preview_bg);

	var display_value = localStorage.getItem("display");
	$(".preview-bg-search").css("display",display_value);

	//获取本地透明度值
	var opacity_value = localStorage.getItem("opacity");
	$(".opacity-content-box").find("em").text(opacity_value+"%")
	.css("left",opacity_value*0.6);
	$(".skin-bg-opacity").css("opacity",opacity_value);
	$(".opacity-content").val( opacity_value );

	//调用换肤页面，收起换肤页面
	$("#skin-btn").on("click",function() {
		$(".skin").slideDown("slow");
	});

	$("#skin-close").on("click",function() {
		$(".skin").slideUp("slow");
	});

	//换肤菜单栏,更换背景图片
	$(".skin-menu").find("li").each(function(index,value) {
		//当鼠标滑过，换肤菜单栏时
		$(value).hover(function() {
			if( index!==8 ) {
				$(value).addClass("skin-btn-hover");
			}
		},function() {
			$(value).removeClass("skin-btn-hover");
		});

		//当点击换肤菜单栏时
		$(value).on("click",function() {
			if( index!==8  ) {
				$(".skin-menu").find("li").removeClass("skin-btn-click");
				$(".skin-img").removeClass("skin-content-visible");
				$(value).addClass("skin-btn-click");
				$(".skin-img").eq(index).addClass("skin-content-visible");
				position_inex = index;
			}
		});
	});

	//点击选择背景图片
	$(".skin-img").find("li").each(function(index,value) {
		var index_value = null;
		//点击喜欢的背景图片时
		$(value).on("click",function() {
			//出现，确信的小图标
			$(".skin-sure").css("display","none");
			$(value).find(".skin-sure").css("display","block");

			//背景皮肤预览效果，将出现被选中的背景图片
			var src = $(value).find("img").attr("src");
			$(".preview-bg").find(".img").css("background","url("+src+")");
			$(".preview-bg-search").css("display","block");

			//改变背景图片
			var windowWidth = $(document).width();
			var windowHeight = $(document).height();
			var url = "background:url("+src+") no-repeat 0 0;background-size:"
			+windowWidth+"px "+windowHeight+"px";
			$(".container").attr("style",url);

			//本地存储背景图片
			var bgImg = $(".container").attr("style");
			localStorage.setItem("background-image",bgImg);


			//存储确信的小图标，下标
			localStorage.setItem("img_index",index);

			//存储预览图片
			var preview_img = $(".preview-bg").find(".img").css("background");
			localStorage.setItem("preview_bg",preview_img);

			var display = $(".preview-bg-search").css("display");
			localStorage.setItem("display",display);

		});
	});

	//不使用皮肤时
	$(".skin-delete").on("click",function() {
		//删除，确信的小图标
		$(".skin-sure").css("display","none");

		//删除皮肤预览效果
		$(".preview-bg").find(".img").css("background","none");
		$(".preview-bg-search").css("display","none");

		//删除背景图片
		$(".container").attr("style","background:none");

		//本地存储无背景图片
		var bgImg = $(".container").attr("style");
		localStorage.setItem("background-image",bgImg);

		//存储预览图片
		localStorage.setItem("preview_bg","none");

		var display = $(".preview-bg-search").css("display");
		localStorage.setItem("display",display);

		//存储确信的小图标，下标
		localStorage.setItem("img_index",null);
	});

	//设置透明度
	$(".opacity-content").on("input propertychange",function() {
		//获得range数值
		var range_value = $(this).val();

		//给用户显示的透明度数值
		$(".skin-opacity").find("em").text( range_value+"%" )
		.css("left",range_value*0.6);
		
		//改变article的透明度
		$(".skin-bg-opacity").css("opacity",range_value/100);
		
		//本地存储透明度值
		localStorage.setItem("opacity",range_value);

	});
		
}