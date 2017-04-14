var connection = require("./db.js");//引入数据库连接文件

var express = require('express');
var router = express.Router();
var mysql = require("mysql");//引入数据库

/* 用户界面获取新闻 */
router.get('/', function(req, res, next) {

	var getSql = "SELECT * FROM `news`";
	
	connection.query(getSql,function(err,result) {
		if(err) {
			return console.log(err);
		}
		res.json(result);
	});

});

module.exports = router;
