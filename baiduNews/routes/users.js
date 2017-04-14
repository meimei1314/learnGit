var connection = require("./db.js");//引入数据库连接文件

var express = require('express');
var router = express.Router();
var mysql = require("mysql");//引入数据库

/* 更新新闻 */
router.get('/getnews', function(req, res, next) {

	connection.query("SELECT * FROM `news`",function(err,result) {
		if(err) {
			return console.log(err);
		}

		res.json(result);
	});

});

//提交新闻
router.post('/insert',function(req,res,next) {

	var news_title = req.body.news_title,
		news_type = req.body.news_type,
		news_img = req.body.news_img,
		news_time = req.body.news_time,
		news_src = req.body.news_src;

	var insertSql = "INSERT INTO `news` (`news_title`,`news_type`,`news_img`,`news_time`,`news_src`) VALUES (?,?,?,?,?)";
	var insertNews = [news_title,news_type,news_img,news_time,news_src];

	connection.query(insertSql,insertNews,function(err,result) {
		if(err) {
			return console.log(err);
		}
		res.json(result);
	});

});

//删除新闻
router.post('/delete',function(req,res,next) {

	var id = req.body.news_id;

	var deleteSql = "DELETE FROM `news` WHERE `id`=?";

	connection.query(deleteSql,[id],function(err,result) {
		if(err) {
			return console.log(err);
		}

		res.json(result);
	});

});

//修改页面获得原始数据
router.get('/getUpDate',function(req,res,next) {

	var id = req.query.id;

	var getSql = "SELECT * FROM `news` WHERE `id`=?";

	connection.query(getSql,[id],function(err,result) {
		if(err) {
			return console.log(err);
		}

		res.json(result);
	});

});

//向数据库中发送已更改好的数据
router.post('/upDate',function(req,res,next) {

	var news_title = req.body.news_title,
		news_type = req.body.news_type,
		news_img = req.body.news_img,
		news_time = req.body.news_time,
		news_src = req.body.news_src,
		id = req.body.news_id;

	var upDateSql = "UPDATE `news` SET `news_title`=?,`news_type`=?,`news_img`=?,`news_time`=?,`news_src`=? WHERE `id`=?";
	var upDateNews = [news_title,news_type,news_img,news_time,news_src,id];

	connection.query(upDateSql,upDateNews,function(err,result) {
		if(err) {
			return console.log(err);
		}

		res.json(result);
	});

});

module.exports = router;
