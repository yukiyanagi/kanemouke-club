var KC = KC || {};

KC.COMMON = {};
KC.COMMON.FOOTER_TOGGLE = {
	CLASS: {
		active: 'active'
	},
	init: function() {
		this.setParameter();
		this.bindEvent();
		this.toggleContent();
	},
	setParameter: function() {
		this.$footerToggleTrigger = $('.jsc-footer-toggle-trigger');
		this.$footerToggleContainer = $('.jsc-footer-toggle-container');
	},
	bindEvent: function() {
		this.$footerToggleTrigger.on('click', $.proxy(this.toggleContent, this));
	},
	toggleContent: function(e) {
		if (e) e.preventDefault();
		this.$footerToggleTrigger.toggleClass(this.CLASS.active);
		this.$footerToggleContainer.slideToggle();
	}
};
KC.COMMON.SMOOTH_SCROLL = {
	DURATION: 300,
	init: function() {
		this.setParameter();
		this.bindEvent();
	},
	setParameter: function() {
		this.$body = $('html, body');
		this.$trigger = $('.jsc-smooth-scroll');
	},
	bindEvent: function() {
		this.$trigger.on('click', $.proxy(this.clickTrigger, this));
	},
	clickTrigger: function(e) {
		e.preventDefault();
		this.$body.animate({scrollTop: 0}, this.DURATION);
	}
}

$(function(){
	KC.COMMON.FOOTER_TOGGLE.init();
	KC.COMMON.SMOOTH_SCROLL.init();
});