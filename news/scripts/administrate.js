$(document).ready(function() {
	refreshNews();//及时更新已上传过的新闻
	creatNews();//提交新闻
	deleteNews();//删除新闻
	upDateNews();//修改新闻
});

//及时更新已上传过的新闻函数
function refreshNews() {
	//保证当打开后台页面时，清空原有的数据，以便获得最新数据
	$(".table tbody").empty();

	//从数据库获得数据
	$.ajax({
		url:"./service/getNews.php",
		type:"get",
		data:{refresh:"更新"},
		datatype:"json",
		success:function(data) {
			data.forEach(function(value,index) {
				var tbody = $(".table tbody");
				var tr = $("<tr></tr>").css("position","relative").prependTo(tbody);
				var td_id = $("<td></td>").text(value.id).css({"display":"none"})
				.appendTo(tr);
				var td_title = $("<td></td>").text(value.news_title).appendTo(tr);
				var td_time = $("<td></td>").text(value.news_time).appendTo(tr);
				var last_td = $("<td></td>").appendTo(tr);
				var btn_upDate = $("<button></button>")
				.addClass("btn btn-primary btn-xs").css("margin-right","5px")
				.text("编辑").appendTo(last_td);
				var btn_delete = $("<button></button>")
				.addClass("btn btn-danger btn-xs").text("删除").appendTo(last_td);
			});
			
		},//ajax的success结束
		error:function(data) {
			alert("出错啦！");
		}
		
	});//ajax结束
}

//提交新闻
function creatNews() {
	
	$("#btn_submit").on("click",function(event) {
		//取消按键默认事件，防止打开URL连接
		event.preventDefault();

		//先判断用户输入信息是否正确,后执行向数据库插入数据
		if( $("#news_title").val()==="" || $("#news_time").val()==="" 
			|| $("#news_src").val()==="" ) {
			
			if( $("#news_title").val()==="" ) {
				$("#news_title").parent().addClass("has-error");
			}else{
				$("#news_title").parent().removeClass("has-error");
			}

			if( $("#news_time").val()==="" ) {
				$("#news_time").parent().addClass("has-error");
			}else{
				$("#news_time").parent().removeClass("has-error");
			}

			if( $("#news_src").val()==="" ) {
				$("#news_src").parent().addClass("has-error");
			}else{
				$("#news_src").parent().removeClass("has-error");
			}

		}else{
			//获取用户输入的信息
			var dataNews = {
				"news_title":$("#news_title").val(),
				"news_type":$("#news_type").val(),
				"news_img":$("#news_img").val(),
				"news_time":$("#news_time").val(),
				"news_src":$("#news_src").val(),
				"send":"发送"
			}

			//向数据库插入数据
			$.ajax({
				url:"./service/getNews.php",
				data:dataNews,
				datatype:"json",
				type:"post",
				success:function(data) {
					alert("您的新闻已成功提交！");
					refreshNews();
					$(".container-fluid .form input").val("");
					$(".container-fluid #news_type option:first-child")
					.attr("selected","selected");
				},
				error:function(data) {
					alert("出错啦！");
				}

			});//ajax结束
			
		}//判断数据结束

	});//按键点击结束
	
}

//删除新闻
function deleteNews() {

	var id_count;//获取删除新闻对应的ID
	//点击删除按键后
	$(".table tbody").on("click",".btn-danger",function() {	
		//出现提示框	
		$("#DeleteModal").modal("show");
		//获取对应的id
		id_count=$(this).parent().prevAll().eq(2).html();
	});

	//确认删除后，删除数据库中对应的数据
	$("#confirmDelete").on("click",function(event) {
		
		//向数据库删除数据
		$.ajax({
			url:"./service/getNews.php",
			data:{"news_id":id_count,"delete":"删除"},
			type:"post",
			datatype:"json",
			success:function(data) {
				//提示框消失
				$("#DeleteModal").modal("hide");

				refreshNews();				
			},
			error:function(data) {
				alert("出错啦！");
			}

		});//ajax结束
		
	});//单击提示框确认键结束
}

//修改新闻
function upDateNews() {
	var id_count;
	$(".table tbody").on("click",".btn-primary",function() {
		//出现提示框
		$("#upDateModal").modal("show");
		id_count=$(this).parent().prevAll().eq(2).html();

		//修改页面获得原始数据
		$.ajax({
			url:"./service/getNews.php",
			data:{"id":id_count,"upDate":"编辑"},
			type:"get",
			datatype:"json",
			success:function(data) {
				$("#Unews_title").val(data[0].news_title);
				$("#Unews_type").val(data[0].news_type);
				$("#Unews_img").val(data[0].news_img);
				$("#Unews_time").val(data[0].news_time);
				$("#Unews_src").val(data[0].news_src);
			},
			error:function(data) {
				alert("出错啦！");
			}
		});//ajax结束
	});
		//向数据库发送已修改后的新闻
		$("#upDateModal #confirmUpDate").on("click",function() {
			//获取用户输入的信息
			var dataNews = {
				"news_title":$("#Unews_title").val(),
				"news_type":$("#Unews_type").val(),
				"news_img":$("#Unews_img").val(),
				"news_time":$("#Unews_time").val(),
				"news_src":$("#Unews_src").val(),
				"news_id":id_count,
				"revise":"修订版"
			}

			//向数据库插入数据
			$.ajax({
				url:"./service/getNews.php",
				data:dataNews,
				datatype:"json",
				type:"post",
				success:function(data) {
					refreshNews();
					$("#upDateModal").modal("hide");
				},
				error:function(data) {
					alert("出错啦！");
				}
		});//ajax结束
	});

}







