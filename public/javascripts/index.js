var KC = KC || {};

KC.RESIZE_CARD = {
	init: function() {
		this.setParameters();
		this.bindEvent();
		this.resizeCards();
	},
	setParameters: function() {
		this.$window = $(window);

		this.$container = $('.jsc-resize-content');
		this.cards = [];

	},
	bindEvent: function() {
		this.$window.on('load resize', $.proxy(this.resizeCards, this));
	},
	resizeCards: function() {
		var self = this,
			$cards = this.$container.children('li');

		while($cards.length) {
			var top = $cards.eq(0).offset().top;
			for (var i = 0, len = $cards.length; i < len; i++ ) {
				if ($cards.eq(i).offset().top >= top) {
					top = $cards.eq(i).offset().top;
				}
			}
			// 整形
			var $targetCards = $cards.filter(function(){
				return $(this).offset().top === top;
			});

			// 処理
			var maxHeight = $targetCards.eq(0).height();
			$targetCards.each(function(){
				if (maxHeight < $targetCards.height()) {
					maxHeight = $targetCards.height();
				}
			});
			$targetCards.height(maxHeight);

			// 次の週に回すものは抽出しておく
			$cards = $cards.filter(function () {
				return $(this).offset().top !== top;
			})

		}

	}
};

$(window).on('load', function(){
	KC.RESIZE_CARD.init();
});