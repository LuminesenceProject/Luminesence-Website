(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Player = starfighter.Player = function(settings) {
		starfighter.Actor.call(this, settings);

		var player = this.constants.player;

		var measurements = {
			x : this.context.canvas.width / 2 - player.SPRITE_WIDTH * player.SCALE_FACTOR / 2,
			y : this.context.canvas.height - player.SPRITE_HEIGHT * player.SCALE_FACTOR,
			w : player.SPRITE_WIDTH * player.SCALE_FACTOR,
			h : player.SPRITE_HEIGHT * player.SCALE_FACTOR
		};

		this.controls = new starfighter.Controls(this, this.constants);
		this.dimensions = new starfighter.Vector(measurements.w, measurements.h);
		this.position = new starfighter.Vector(measurements.x, measurements.y);
		this.velocity = new starfighter.Vector(player.VELOCITY_X, player.VELOCITY_Y);
		this.immune = false;
		this.dead = false;
		this.red = false;
		this.shielded = false;
	};

	Player.prototype = Object.create(starfighter.Actor.prototype);

	Player.prototype.render = function() {
		if (!this.dead) {
			var player = this.constants.player;

			var spriteX = this.red ? player.red.SPRITE_X : player.blue.SPRITE_X;
			var spriteY = this.red ? player.red.SPRITE_Y : player.blue.SPRITE_Y;

			this.context.save();
			this.context.globalAlpha = this.immune ? player.ALPHA : this.context.globalAlpha;
			this.context.drawImage(this.sheet,
				spriteX, spriteY,
				player.SPRITE_WIDTH, player.SPRITE_HEIGHT,
				this.position.x, this.position.y,
				this.dimensions.x, this.dimensions.y);
			this.context.restore();

			if (this.shielded) this.renderShield();
		}
	};

	Player.prototype.renderShield = function() {
		var shield = this.constants.powerup.defense.shield;

		var destination = {
			x : this.position.x + this.dimensions.x / 2 - shield.OFFSET_X,
			y : this.position.y - shield.OFFSET_Y,
			w : shield.SPRITE_WIDTH * shield.SCALE_FACTOR,
			h : shield.SPRITE_HEIGHT * shield.SCALE_FACTOR
		};

		this.context.drawImage(this.sheet,
			shield.SPRITE_X, shield.SPRITE_Y,
			shield.SPRITE_WIDTH, shield.SPRITE_HEIGHT,
			destination.x, destination.y,
			destination.w, destination.h);
	};

	Player.prototype.translate = function() {
		if (!this.dead) this.keyboard();
	};

	Player.prototype.keyboard = function() {
		if (this.tryLeft()) this.left();

		if (this.tryRight()) this.right();

		if (this.tryUp()) this.up();

		if (this.tryDown()) this.down();
	};

	Player.prototype.tryLeft = function() {
		var withinBounds = this.position.x >= this.velocity.x;

		return this.controls.moveLeft && withinBounds;
	};

	Player.prototype.tryRight = function() {
		var withinBounds = this.position.x + this.dimensions.x <= this.context.canvas.width - this.velocity.x;

		return this.controls.moveRight && withinBounds;
	};

	Player.prototype.tryUp = function() {
		var withinBounds = this.position.y >= this.velocity.y;

		return this.controls.moveUp && withinBounds;
	};

	Player.prototype.tryDown = function() {
		var withinBounds = this.position.y + this.dimensions.y <= this.context.canvas.height - this.velocity.y;

		return this.controls.moveDown && withinBounds;
	};

	Player.prototype.left = function() {
		this.position.x -= this.velocity.x;
	};

	Player.prototype.right = function() {
		this.position.x += this.velocity.x;
	};

	Player.prototype.up = function() {
		this.position.y -= this.velocity.y;
	};

	Player.prototype.down = function() {
		this.position.y += this.velocity.y;
	};

	Player.prototype.fire = function() {
		var direction = this.constants.laser.direction;
		var color = this.constants.laser.color;

		var laser = new starfighter.Laser(this.settings, this.laserStart(), color.BLUE, direction.CENTER);
		this.actors[this.constants.game.LASERS].push(laser);
	};

	Player.prototype.triplefire = function() {
		var lasers = this.actors[this.constants.game.LASERS];
		var direction = this.constants.laser.direction;
		var color = this.constants.laser.color;

		var leftLaser = new starfighter.Laser(this.settings, this.laserStart(), color.RED, direction.LEFT);
		var centerLaser = new starfighter.Laser(this.settings, this.laserStart(), color.RED, direction.CENTER);
		var rightLaser = new starfighter.Laser(this.settings, this.laserStart(), color.RED, direction.RIGHT);

		lasers.push(leftLaser);
		lasers.push(centerLaser);
		lasers.push(rightLaser);
	};

	Player.prototype.laserStart = function() {
		var x = this.position.x + this.dimensions.x / 2 - this.constants.laser.SPRITE_WIDTH / 2;
		var y = this.position.y - this.constants.laser.SPRITE_HEIGHT;

		return new starfighter.Vector(x, y);
	};

	Player.prototype.explode = function() {
		var lives = this.actors[this.constants.game.LIVES][0];

		lives.loseLife();

		var particle = new starfighter.Particle(this.settings, this.center(), this.constants.particle.death.RADIUS, "death");
		this.actors[this.constants.game.PARTICLES].push(particle);

		this.dead = true;
		this.immune = true;
		this.position.x = this.context.canvas.width / 2 - this.dimensions.x / 2;
		this.position.y = this.context.canvas.height - this.dimensions.y;

		if (this.controls.firing)  this.controls.ceasefire();
	};

	Player.prototype.revive = function() {
		var lives = this.actors[this.constants.game.LIVES][0];

		if (!lives.empty()) {
			var controls = this.controls;
			var constants = this.constants;
			var that = this;

			setTimeout(function() {
				that.dead = false;

				var particle = new starfighter.Particle(that.settings, that.center(), constants.particle.revive.RADIUS, "revive");
				that.actors[constants.game.PARTICLES].push(particle);

				that.setFireMode(false);

				setTimeout(function() {
					that.immune = false;
				}, constants.player.IMMUNE_DELAY);

			}, constants.player.REVIVE_DELAY);
		}
	};

	Player.prototype.setFireMode = function(option) {
		var controls = this.controls;

		this.red = option;
		controls.triplefiring = option;
		if (controls.firing) {
			controls.ceasefire();

			if (option)
				controls.triplefire();
			else
				controls.fire();
		}
	};

	Player.prototype.center = function() {
		var x = this.position.x + this.dimensions.x / 2;
		var y = this.position.y + this.dimensions.y / 2;

		return new starfighter.Vector(x, y);
	};

})();

