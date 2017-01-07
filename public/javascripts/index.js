var KC = KC || {};

KC.CREATEJS_MANAGER = {
	BUBBLE: {
		appOverview: {
			title: "アプリ概要",
			desc: "アプリ開発の\n事前・周辺知識",
			x: 210,
			y: 210,
			href: "/smartphone_app"
		},
		document: {
			title: "資料",
			desc: "プログラミングや\n各種分野の情報",
			x: 600,
			y: 350
		},
		minutes: {
			title: "議事録",
			desc: "金儲けクラブ会合などの\n議事録",
			x: 1000,
			y: 250
		}
	},
	init: function() {
		this.setParameters();
		this.createItems();
		this.bindEvent();
		this.stage.update();
	},
	setParameters: function() {
		this.$canvasWrapper = $('.jsc-canvas-wrapper');
		this.$canvas = this.$canvasWrapper.children('#jsi-canvas');
		this.$canvas.attr('width', this.$canvasWrapper.innerWidth());
		this.$canvas.attr('height', this.$canvasWrapper.outerHeight());

		this.stage = new createjs.Stage("jsi-canvas");
		this.stage.enableMouseOver();

	},
	createItems: function() {
		this.bg = new createjs.Shape();
		this.bg.graphics.beginFill("#000000");
		this.bg.graphics.drawRect(0, 0, this.$canvasWrapper.innerWidth(), this.$canvasWrapper.outerHeight());
		this.stage.addChild(this.bg);

		var keys = Object.keys(this.BUBBLE);
		this.bgShapes = [];
		for (var i = 0, len = 300; i < len; i++) {
			this.bgShapes.push(new KC.CREATEJS_BG_BUBBLE(this.stage));
		}
		this.shapes = [];
		for (var i = 0, len = keys.length; i < len; i++) {
			this.shapes.push(new KC.CREATEJS_BUBBLE(this.stage, this.BUBBLE[keys[i]]));
		}
	},
	bindEvent: function() {
		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		createjs.Ticker.addEventListener("tick", $.proxy(this.handleTick, this));
	},
	handleTick: function() {
		for (var i = 0, len = this.shapes.length; i < len; i++ ) {
			this.shapes[i].update();
		}
		for (var i = 0, len = this.bgShapes.length; i < len; i++) {
			this.bgShapes[i].update();
		}
		this.stage.update();
	}
};

KC.CREATEJS_BG_BUBBLE = function(stage) {
	this.stage = stage;
	this.init();
};
KC.CREATEJS_BG_BUBBLE.prototype = {
	MAX_SPEED: 2,
	MIN_SIZE: 5,
	SIZE_BUF: 15,
	init: function() {
		this.setParameters();
	},
	setParameters: function() {
		this.$window = $(window);
		this.speed = Math.random() + 1.0;
		this.shape = new createjs.Shape();
		var rgba = "rgba(" +
			Math.floor(Math.random() * 255) + "," +
			Math.floor(Math.random() * 255) + "," +
			Math.floor(Math.random() * 255) + "," +
			Math.random() +
			")";
		this.shape.graphics.beginFill(rgba);

		this.shape.graphics.drawCircle(0, 0, this.MIN_SIZE + Math.floor(Math.random() * this.SIZE_BUF));
		this.stage.addChild(this.shape);
		this.shape.y = Math.floor(Math.random() * this.$window.innerHeight());
		this.shape.x = Math.floor(Math.random() * this.$window.innerWidth());
	},
	update: function() {
		this.shape.y -= this.speed;
		if (this.shape.y < -100) {
			this.shape.y = this.$window.innerHeight();
		}
	}
};

KC.CREATEJS_BUBBLE = function(stage, params) {
	this.stage = stage;
	this.params = params;
	this.init();
};
KC.CREATEJS_BUBBLE.prototype = {
	SIZE: 100,
	BORDER_WIDTH: 2,
	SCALE_VECTOL: 0.0001,
	ROTATE_VECTROL: 0.25,
	DEFAULT: {
		titleY: 0
	},
	ANIMATE: {
		titleY: -30,
		delay: 0.03
	},
	init: function() {
		this.setParameters();
		this.bindEvent();
	},
	setParameters: function() {
		this.titleMessage = this.params.title;
		this.descMessage = this.params.desc;

		this.bubble = new createjs.Container();
		this.bubble.x = this.params.x;
		this.bubble.y = this.params.y;
		this.stage.addChild(this.bubble);

		this.shape = new createjs.Shape();
		this.shape.graphics.setStrokeStyle(this.BORDER_WIDTH);
		this.shape.graphics.beginFill("rgba(0, 0, 0, 1)");
		this.shape.graphics.beginLinearGradientStroke(["#363","#9cc","#ccc"],[0.1,0.3,1.0],0,-100,50,100);
		this.shape.graphics.drawCircle(0, 0, this.SIZE - this.BORDER_WIDTH);
		this.bubble.addChild(this.shape);

		this.title = new createjs.Text(this.titleMessage, "20px serif", "rgba(255, 255, 255, 0.9)");
		this.title.textAlign = "center";
		this.title.textBaseline = "middle";
		this.title.y = this.DEFAULT.titleY;
		this.bubble.addChild(this.title);
		this.shape.cursor = "pointer";

		this.desc = new createjs.Text(this.descMessage, "15px serif", "rgba(255, 255, 255, 0.9)");
		this.desc.textAlign = "center";
		this.desc.textBaseline = "middle";
		this.desc.y = 0;
		this.desc.alpha = 0;
		this.bubble.addChild(this.desc);

		this.shape.cursor = "pointer";

		this.scaleXVectol = Math.floor(Math.random() * 2) % 2 ? this.SCALE_VECTOL: -this.SCALE_VECTOL;
		this.scaleYVectol = Math.floor(Math.random() * 2) % 2 ? this.SCALE_VECTOL: -this.SCALE_VECTOL;

		this.animateFlag = false;
		this.turnFlag = false;
	},
	bindEvent: function() {
		this.shape.addEventListener("mouseover", $.proxy(this.mouseoverEvent, this));
		this.shape.addEventListener("mouseout", $.proxy(this.mouseoutEvent, this));
		this.shape.addEventListener("click", $.proxy(this.clickEvent, this));
	},
	update: function() {
		if (this.shape.scaleX > 1.1 || this.shape.scaleX < 0.9) {
			this.scaleXVectol *= -1;
		}
		if (this.shape.scaleY > 1.1 || this.shape.scaleY < 0.9) {
			this.scaleYVectol *= -1;
		}
		this.shape.scaleX += this.scaleXVectol;
		this.shape.scaleY += this.scaleYVectol;
		this.shape.rotation += this.ROTATE_VECTROL;

		// hover中かつ折り返しフラグが立っている状態でalphaが1(アニメーション完了)でなければ実行
		if (this.animateFlag && !(this.turnFlag && this.title.alpha == 1)) {
			if (!this.turnFlag) {
				this.title.alpha -= this.ANIMATE.delay;
				if (this.title.alpha <= 0) {
					this.title.alpha = 0;
					this.title.y = this.ANIMATE.titleY;
					this.turnFlag = true;
				}
			} else {
				this.title.alpha += this.ANIMATE.delay;
				this.desc.alpha += this.ANIMATE.delay;
				if (this.title.alpha >= 1) {
					this.title.alpha = 1;
				}
			}
		}
		// hover中でなく、折り返しフラグが折れている状態でalphaが1(アニメーション完了)でなければ実行
		else if (!this.animateFlag && !(!this.turnFlag && this.title.alpha == 1)) {
			if (!this.turnFlag) {
				this.title.alpha += this.ANIMATE.delay;
				if (this.title.alpha >= 1) {
					this.title.alpha = 1;
				}
			} else {
				this.title.alpha -= this.ANIMATE.delay;
				this.desc.alpha -= this.ANIMATE.delay;
				if (this.title.alpha <= 0) {
					this.title.alpha = 0;
					this.title.y = this.DEFAULT.titleY;
					this.turnFlag = false;
				}
			}
		}
	},
	mouseoverEvent: function(e) {
		e.preventDefault();
		this.animateFlag = true;
	},
	mouseoutEvent: function(e) {
		e.preventDefault();
		this.animateFlag = false;
	},
	clickEvent: function(e) {
		e.preventDefault();
		window.location.href = this.params.href;
	}
};

$(window).on('load', function(){
	KC.CREATEJS_MANAGER.init();
});