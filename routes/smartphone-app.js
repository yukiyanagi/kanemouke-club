var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('smartphone-app/index', {
		title: '金儲け倶楽部',
		saleDate: [
			{columnName: '5', columnValue: '2012/09/21'},
			{columnName: '5c', columnValue: '2013/09/20'},
			{columnName: '5s', columnValue: '2013/09/20'},
			{columnName: '6', columnValue: '2014/09/19'},
			{columnName: '6plus', columnValue: '2014/09/19'},
			{columnName: '7', columnValue: '2016/09/16'},
			{columnName: '7plus', columnValue: '2016/09/16'}
		]
	});
});

module.exports = router;
