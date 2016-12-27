var KC = KC || {};

KC.SMARTPHONE_APP = {};
KC.SMARTPHONE_APP.INDEX = {
	init: function() {
		this.setParameter();
		this.bindEvent();
	},
	setParameter: function() {
		this.chartUserRate = c3.generate({
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
		this.chartMarketScale = c3.generate({
			bindto: "#market-scale",
			data: {
				columns: [
					['モバイルゲーム', '8', '9', '11', '12', '13', '14', '15'],
					['モバイル映像', '5', '7', '8', '10', '13', '17', '23'],
					['モバイル音楽', '1', '1', '1', '1', '1', '1', '1'],
					['モバイル広告', '8', '14', '19', '24', '28', '33', '37']
				],
				groups: [
					['モバイルゲーム', 'モバイル映像', 'モバイル音楽', 'モバイル広告']
				],
				type: 'bar'
			},
			axis: {
				x: {
					type: 'category',
					categories: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],
					label: '年'
				},
				y: {
					label: '10億ドル'
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