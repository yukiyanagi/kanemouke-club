var KC = KC || {};

KC.SMARTPHONE_APP = {};
KC.SMARTPHONE_APP.INDEX = {
	init: function() {
		this.setParameter();
		this.bindEvent();
	},
	setParameter: function() {
		this.chart = c3.generate({
			bindto: "#user-rate",
			data: {
				columns: [
					['Android', 41.9, 50, 39.6, 69.3, 45.4, 62.9, 48.7, 64.6],
					['iOS', 56, 49.1, 59.7, 28.8, 52.4, 35.1, 50.3, 34.1],
					['Windows', 0.6, 0.2, 0, 1.1, 0.2, 0.1, 0.5, 0.6],
					['BlackBerry', 0.4, 0, 0, 0, 0.7, 0.9, 0, 0],
					['Other', 1.1, 0.8, 0.7, 0.8, 1.3, 0.9, 0.5, 0.6]
				]
			},
			axis: {
				x: {
					type: 'category',
					categories: ['2013/01', '2013/07', '2014/01', '2014/07', '2015/01', '2015/07', '2016/01', '2016/07']
				},
				y : {
					tick: {
		               format: function (d) { return d + '%'; }
					}
				}
			}
		});
	},
	bindEvent: function() {

	}
};

$(function(){
	KC.SMARTPHONE_APP.INDEX.init();
});