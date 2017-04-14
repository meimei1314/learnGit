$(document).ready(function() {
	lunbo();//轮播图
	student_story();//学员故事
	go_top();//向上按键
});

//轮播图
function lunbo() {
	var index = 0;
	setInterval(function() {
		moveToLeft(index);
		index += 750;
		if( index>=3000 ) {
			$(".lunbo").animate({
				left:0
			},6)
			index = 0;
		}
	},1000);

	function moveToLeft(index) {
		index = -index+"px";
		$(".lunbo").animate({
			left:index
		},500);
	}
}

function student_story() {
	var i = 0;
	$(".section6 .btn").children("span").each(function(index,value) {
		$(value).on("click",function() {
			$(".section6 .btn").children("span").removeClass("student-btn");			
			if( index===0 ) {
				$(".section6").children(".student-story").css("left",0);
			}else if( index===1 ) {
				$(".section6").children(".student-story").css("left","-1000px");
			}
			$(value).addClass("student-btn");
		});
	});

	setInterval(function() {
		if( i===0 ) {
			i = -1000;
			move(i);
			$(".section6 .btn").find("span").removeClass("student-btn");
			$(".section6 .btn").find(".right").addClass("student-btn");
		}else {
			i = 0;
			move(i);
			$(".section6 .btn").find("span").removeClass("student-btn");
			$(".section6 .btn").find(".left").addClass("student-btn");
		}

	},3000);

	function move(i) {
		i = i +"px";
		$(".section6").find(".student-story").animate({
			left:i,
		},700);
	}
}

function go_top() {
	$(document).on("scroll",function() {
		var height = $(document).scrollTop();

		if( height>=900 ) {
			$(".go-top").css("display","block");
		}else{
			$(".go-top").css("display","none");
		}

		$(".go-top").on("click",function() {
			$(document).scrollTop(0);
		});
	});
}








