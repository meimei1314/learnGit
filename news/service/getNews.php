<?php 

	header("Content-type:application/json;charset=utf-8;");
	$link = mysqli_connect("localhost","root","root","baiduNews",8889);

	if( !$link ) {
		die("数据库无法连接上");
	}

	mysqli_query($link,"SET NAMES utf8");

	$getNews = array();//获取数据库中数据

	//及时更新新闻内容
	if( @$_GET["refresh"] ) {

		$select = "SELECT * FROM news";
		$data = mysqli_query($link,$select);

		//从数据库获取数据
		while($row=mysqli_fetch_assoc($data)){
			array_push($getNews,array(
				"id"=>$row["id"],
				"news_title"=>$row["news_title"],
				"news_type"=>$row["news_type"],
				"news_img"=>$row["news_img"],
				"news_time"=>$row["news_time"],
				"news_src"=>$row["news_src"]
				));	
		}	
	
	}

		
	//删除新闻内容
	if( @$_POST["delete"] ) {

		$getDeleteData = $_POST["news_id"];

		$deleteNews = "DELETE FROM `news` WHERE `news`.`id`={$getDeleteData}";

		$News = mysqli_query($link,$deleteNews);
	}


	//发送新闻内容
	if( @$_POST["send"] ) {

		$news_title = $_POST["news_title"];
		$news_type = $_POST["news_type"];
		$news_img = $_POST["news_img"];
		$news_time = $_POST["news_time"];
		$news_src = $_POST["news_src"];

		//向数据库插入新闻
		$sendNews = "INSERT INTO `news` (`news_title`,`news_type`,`news_img`,`news_time`,`news_src`) VALUES ('{$news_title}','{$news_type}','{$news_img}','{$news_time}','{$news_src}')";

		$sendNewsMysqli = mysqli_query($link,$sendNews);
	}


	//修改时，获得要修改的数据
	if( @$_GET["upDate"] ) {
		$news_id = $_GET["id"];

		$select = "SELECT * FROM `news` WHERE `id`={$news_id}";
		$data = mysqli_query($link,$select);

		while($row=mysqli_fetch_assoc($data)){
			array_push($getNews,array(
				"id"=>$row["id"],
				"news_title"=>$row["news_title"],
				"news_type"=>$row["news_type"],
				"news_img"=>$row["news_img"],
				"news_time"=>$row["news_time"],
				"news_src"=>$row["news_src"]
				));	
		}

	}


	//修改好的新闻，发送到数据库中更新
	if( @$_POST["revise"] ) {
		$news_title = $_POST["news_title"];
		$news_type = $_POST["news_type"];
		$news_img = $_POST["news_img"];
		$news_time = $_POST["news_time"];
		$news_src = $_POST["news_src"];
		$news_id = $_POST["news_id"];

		//在数据库中修改新闻
		$revise = "UPDATE `news` SET `news_title`='{$news_title}',`news_type`='{$news_type}',`news_img`='{$news_img}',`news_time`='{$news_time}',`news_src`='{$news_src}' WHERE `id`={$news_id}     ";

		$News = mysqli_query($link,$revise);
	}


	echo json_encode($getNews);

	mysqli_close($link);

?>