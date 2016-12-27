var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('homepage/index', {
		title: '金儲け倶楽部'
	});
});

module.exports = router;
