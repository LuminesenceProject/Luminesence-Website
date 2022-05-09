(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Menu = starfighter.Menu = function() {
		this.settings = this.setup();
		this.stars = [];
		this.handler = this.play.bind(this);

		this.listen();

		var that = this;
		this.settings.sheet.onload = function() {
			that.frameID = requestAnimationFrame(that.render.bind(that));
		};
	};

	Menu.prototype.render = function() {
		var context = this.settings.context;
		var menu = this.settings.constants.menu;

		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		this.renderBackground(context, menu);
		this.renderStars();
		this.renderTitle(context, menu);
		this.renderButton(context, menu);
		this.renderControls(context, menu);
		this.renderAuthor(context, menu);

		this.frameID = requestAnimationFrame(this.render.bind(this));
	};

	Menu.prototype.setup = function() {
		var settings = Object.create(null);

		settings.constants = new starfighter.Constants();
		settings.context = document.getElementById("cv").getContext("2d");
		settings.sheet = new Image();
		settings.sheet.src = settings.constants.game.SPRITE_SHEET;

		return settings;
	};

	Menu.prototype.listen = function() {
		this.settings.context.canvas.addEventListener("mousedown", this.handler);
	};

	Menu.prototype.play = function(event) {
		var pos = this.relativePos(event);

		var canvas = this.settings.context.canvas;
		var button = this.settings.constants.menu.button;

		var hitbox = {
			west  : canvas.width / 2 - button.SPRITE_WIDTH / 2,
			east  : canvas.width / 2 - button.SPRITE_WIDTH / 2 + button.SPRITE_WIDTH,
			north : 360,
			south : 360 + button.SPRITE_HEIGHT
		};

		var within = pos.x >= hitbox.west && pos.x <= hitbox.east;
		within = within && pos.y >= hitbox.north && pos.y <= hitbox.south;

		if (within) this.startGame();
	};

	Menu.prototype.startGame = function() {
		var context = this.settings.context;

		context.canvas.removeEventListener("mousedown", this.handler);
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		cancelAnimationFrame(this.frameID);

		this.loadMusic();

		this.settings.game = new starfighter.Game(this.settings, this.stars);
	};

	Menu.prototype.loadMusic = function() {
		var track = new Audio("audio/background.wav");
		track.loop = true;
		track.volume = 0.2;
		track.load();
		track.play();
	};

	Menu.prototype.relativePos = function(event) {
		var rect = this.settings.context.canvas.getBoundingClientRect();

		return {
			x : Math.floor(event.clientX - rect.left),
			y : Math.floor(event.clientY - rect.top)
		};
	};

	Menu.prototype.randomStar = function() {
		return {
			x	   : Math.floor(Math.random() * this.settings.context.canvas.width),
			y	   : 0,
			blur   : Math.floor(Math.random() * 40),
			radius : 1,
			active : true
		};
	};

	Menu.prototype.spawnStars = function() {
		var firstStar = new starfighter.Star(this.settings, this.randomStar());
		this.stars.push(firstStar);

		var that = this;
		this.starTimer = setInterval(function() {
			var star = new starfighter.Star(that.settings, that.randomStar());
			that.stars.push(star);
		}, that.settings.constants.spawner.star.FREQUENCY);
	};

	Menu.prototype.renderStars = function() {
		if (!this.starTimer) this.spawnStars();

		this.stars.forEach(function(star) {
			star.render();
			star.translate();
		});

		var game = this.settings.constants.game;

		if (this.stars.length == game.OVERFLOW)
			this.stars.splice(0, game.OVERFLOW / 2);
	};

	Menu.prototype.renderBackground = function(context, menu) {
		var gradient = context.createLinearGradient(0, 0, 0, context.canvas.height);
		gradient.addColorStop(0, menu.gradient.STOP_0);
		gradient.addColorStop(1, menu.gradient.STOP_1);

		context.save();
		context.fillStyle = gradient;
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
		context.restore();
	};

	Menu.prototype.renderTitle = function(context, menu) {
		context.save();

		context.font = menu.title.FONT;
		context.fillStyle = menu.title.FILL_STYLE;
		context.strokeStyle = menu.title.STROKE_STYLE;

		var titleX = context.canvas.width / 2 - context.measureText(menu.title.NAME).width / 2;
		var titleY = 100;

		context.fillText(menu.title.NAME, titleX, titleY);
		context.strokeText(menu.title.NAME, titleX, titleY);

		context.font = menu.desc.FONT;
		context.fillStyle = menu.desc.FILL_STYLE;
		context.strokeStyle = menu.desc.STROKE_STYLE;

		var descX = context.canvas.width / 2 - context.measureText(menu.desc.NAME).width / 2;
		var descY = 160;

		context.fillText(menu.desc.NAME, descX, descY);
		context.strokeText(menu.desc.NAME, descX, descY);

		var dx = context.canvas.width / 2 - menu.cursor.SPRITE_WIDTH / 2;
		var dy = 260;

		context.drawImage(this.settings.sheet,
			menu.cursor.SPRITE_X, menu.cursor.SPRITE_Y,
			menu.cursor.SPRITE_WIDTH, menu.cursor.SPRITE_HEIGHT,
			dx, dy,
			menu.cursor.SPRITE_WIDTH, menu.cursor.SPRITE_HEIGHT);

		context.restore();
	};

	Menu.prototype.renderButton = function(context, menu) {
		context.save();

		var dx = context.canvas.width / 2 - menu.button.SPRITE_WIDTH / 2;
		var dy = 360;

		context.drawImage(this.settings.sheet,
			menu.button.SPRITE_X, menu.button.SPRITE_Y,
			menu.button.SPRITE_WIDTH, menu.button.SPRITE_HEIGHT,
			dx, dy,
			menu.button.SPRITE_WIDTH, menu.button.SPRITE_HEIGHT);

		context.font = menu.button.FONT;
		context.fillStyle = menu.button.FILL_STYLE;

		var playX = context.canvas.width / 2 - context.measureText(menu.button.NAME).width / 2;
		var playY = 392;

		context.fillText(menu.button.NAME, playX, playY);

		context.restore();
	};

	Menu.prototype.renderControls = function(context, menu) {
		context.save();

		context.fillStyle = menu.movement.key.FILL_STYLE;
		context.strokeStyle = menu.movement.key.STROKE_STYLE;
		context.lineWidth = menu.movement.key.LINE_WIDTH;

		context.fillRect(30, context.canvas.height * 0.76, menu.movement.key.WIDTH, menu.movement.key.HEIGHT);
		context.strokeRect(30, context.canvas.height * 0.76, menu.movement.key.WIDTH, menu.movement.key.HEIGHT);

		context.fillRect(68, context.canvas.height * 0.76, menu.movement.key.WIDTH, menu.movement.key.HEIGHT);
		context.strokeRect(68, context.canvas.height * 0.76, menu.movement.key.WIDTH, menu.movement.key.HEIGHT);

		context.fillRect(106, context.canvas.height * 0.76, menu.movement.key.WIDTH, menu.movement.key.HEIGHT);
		context.strokeRect(106, context.canvas.height * 0.76, menu.movement.key.WIDTH, menu.movement.key.HEIGHT);

		context.fillRect(68, context.canvas.height * 0.7, menu.movement.key.WIDTH, menu.movement.key.HEIGHT);
		context.strokeRect(68, context.canvas.height * 0.7, menu.movement.key.WIDTH, menu.movement.key.HEIGHT);

		context.font = menu.movement.letter.FONT;
		context.fillStyle = menu.movement.letter.FILL_STYLE;

		context.fillText("A", 45 - context.measureText("A").width / 2, context.canvas.height * 0.795);
		context.fillText("S", 83 - context.measureText("S").width / 2, context.canvas.height * 0.795);
		context.fillText("D", 121 - context.measureText("D").width / 2, context.canvas.height * 0.795);
		context.fillText("W", 83 - context.measureText("W").width / 2, context.canvas.height * 0.734);

		context.fillStyle = menu.fire.key.FILL_STYLE;
		context.strokeStyle = menu.fire.key.STROKE_STYLE;
		context.lineWidth = menu.fire.key.LINE_WIDTH;

		context.fillRect(30, context.canvas.height * 0.86, menu.fire.key.WIDTH, menu.fire.key.HEIGHT);
		context.strokeRect(30, context.canvas.height * 0.86, menu.fire.key.WIDTH, menu.fire.key.HEIGHT);

		context.font = menu.fire.letter.FONT;
		context.fillStyle = menu.fire.letter.FILL_STYLE;

		context.fillText("Spacebar", 85 - context.measureText("Spacebar").width / 2, context.canvas.height * 0.895);

		context.font = menu.instructions.FONT;
		context.fillStyle = menu.instructions.FILL_STYLE;
		context.strokeStyle = menu.instructions.STROKE_STYLE;

		context.fillText("Movement", 180, context.canvas.height * 0.7 + 30);
		context.strokeText("Movement", 180, context.canvas.height * 0.7 + 30);

		context.fillText("Fire", 180, context.canvas.height * 0.86 + 24);
		context.strokeText("Fire", 180, context.canvas.height * 0.86 + 24);

		context.restore();
	};

	Menu.prototype.renderAuthor = function(context, menu) {
		context.save();

		context.font = menu.author.FONT;
		context.fillStyle = menu.author.FILL_STYLE;

		var dx = context.canvas.width * 0.49;
		var dy = context.canvas.height * 0.98;

		context.fillText(menu.author.NAME, dx, dy);

		context.restore();
	};

	new Menu();

})();

