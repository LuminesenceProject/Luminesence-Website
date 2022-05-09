(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Game = starfighter.Game = function(settings, stars) {
		this.settings = settings;
		this.addActors(this.settings, stars);

		this.handler = this.retry.bind(this);

		this.frameID = requestAnimationFrame(this.render.bind(this));
	};

	Game.prototype.render = function() {
		var context = this.settings.context;
		var actors = this.settings.actors;
		var lives = actors[this.settings.constants.game.LIVES][0];

		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		this.renderBackground();

		actors.forEach(function(type) {
			type.forEach(function(actor) {
				actor.render();
			});
		});

		actors.forEach(function(type) {
			type.forEach(function(actor) {
				actor.collide();
			});
		});

		actors.forEach(function(type) {
			type.forEach(function(actor) {
				actor.translate();
			});
		});

		if (lives.empty()) {
			this.bound = false;
			this.renderRetry();
		}

		var that = this;
		actors.forEach(function(type) {
			if (type.length == that.settings.constants.game.OVERFLOW)
				type.splice(0, that.settings.constants.game.OVERFLOW / 2);
		});

		this.frameID = requestAnimationFrame(this.render.bind(this));
	};

	Game.prototype.renderBackground = function() {
		var context = this.settings.context;
		var menu = this.settings.constants.menu;

		var gradient = context.createLinearGradient(0, 0, 0, context.canvas.height);
		gradient.addColorStop(0, menu.gradient.STOP_0);
		gradient.addColorStop(1, menu.gradient.STOP_1);

		context.save();
		context.fillStyle = gradient;
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
		context.restore();
	};

	Game.prototype.addActors = function(settings, stars) {
		var game = settings.constants.game;

		settings.actors = [[], [], [], [], [], [], [], []];

		settings.actors.unshift(stars);
		settings.actors[game.PLAYER].push(new starfighter.Player(settings));
		settings.actors[game.LIVES].push(new starfighter.Lives(settings));
		settings.actors[game.SCORE].push(new starfighter.Score(settings));
		settings.actors[game.SPAWNER].push(new starfighter.Spawner(settings));
	};

	Game.prototype.renderRetry = function() {
		var context = this.settings.context;

		if (!this.bound) {
			context.canvas.addEventListener("mousedown", this.handler);
			this.bound = true;
		}

		context.save();

		context.font = "96px VT323";
		context.fillStyle = "yellow";
		context.shadowColor = "#f90";
		context.shadowBlur = 3;
		context.shadowOffsetX = 2;
		context.shadowOffsetY = 2;
		context.fillText("Game Over", context.canvas.width / 2 - context.measureText("Game Over").width / 2, 240);

		context.font = "48px VT323";
		context.fillStyle = "#ff9";
		context.shadowColor = "yellow";
		context.shadowBlur = 3;
		context.shadowOffsetX = 2;
		context.shadowOffsetY = 2;
		context.fillText("Retry", context.canvas.width / 2 - context.measureText("Retry").width / 2, 340);

		context.restore();
	};

	Game.prototype.relativePos = function(event) {
		var rect = this.settings.context.canvas.getBoundingClientRect();

		return {
			x : Math.floor(event.clientX - rect.left),
			y : Math.floor(event.clientY - rect.top)
		};
	};

	Game.prototype.retry = function(event) {
		var pos = this.relativePos(event);

		var hitbox = {
			west  : 192,
			east  : 287,
			north : 313,
			south : 350
		};

		var within = pos.x >= hitbox.west && pos.x <= hitbox.east;
		within = within && pos.y >= hitbox.north && pos.y <= hitbox.south;

		if (within) this.restart();
	};

	Game.prototype.restart = function() {
		var context = this.settings.context;
		var stars = this.settings.actors[0];

		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.canvas.removeEventListener("mousedown", this.handler);

		cancelAnimationFrame(this.frameID);

		delete this.frameID;
		delete this.settings.actors;

		this.settings.game = new starfighter.Game(this.settings, stars);
	};

})();

