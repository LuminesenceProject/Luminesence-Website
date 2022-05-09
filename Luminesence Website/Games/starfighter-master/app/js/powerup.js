(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Powerup = starfighter.Powerup = function(settings, type, start) {
		starfighter.Actor.call(this, settings);

		var powerup = this.constants.powerup;

		this.type = type;
		this.dimensions = new starfighter.Vector(powerup[type].SPRITE_WIDTH, powerup[type].SPRITE_HEIGHT);
		this.position = start;
		this.velocity = new starfighter.Vector(powerup.VELOCITY_X, powerup.VELOCITY_Y);
		this.active = true;
	};

	Powerup.prototype = Object.create(starfighter.Actor.prototype);

	Powerup.prototype.render = function() {
		if (this.active) {
			var powerup = this.constants.powerup[this.type];

			this.context.drawImage(this.sheet,
				powerup.SPRITE_X, powerup.SPRITE_Y,
				powerup.SPRITE_WIDTH, powerup.SPRITE_HEIGHT,
				this.position.x, this.position.y,
				this.dimensions.x, this.dimensions.y);
		}
	};

	Powerup.prototype.translate = function() {
		if (this.active) this.down();
	};

	Powerup.prototype.down = function() {
		this.position.y += this.velocity.y;
	};

	Powerup.prototype.collide = function() {
		if (this.active) {
			var player = this.actors[this.constants.game.PLAYER][0];
			var powerup = this.constants.powerup;
			var kind = this.constants.powerup.kind;

			if (this.collidePlayer() && !player.dead) {
				this.active = false;

				switch (this.type) {
					case kind.OFFENSE:
						this.offense(player, powerup);
						break;
					case kind.DEFENSE:
						this.defense(player, powerup);
						break;
					case kind.LIFE:
						this.life(player, powerup);
				}
			}
		}
	};

	Powerup.prototype.collidePlayer = function() {
		var player = this.actors[this.constants.game.PLAYER][0];

		var hitbox = {
			west  : player.position.x + player.dimensions.x * 0.1,
			east  : player.position.x + player.dimensions.x * 0.9,
			north : player.position.y + player.dimensions.y * 0.2,
			south : player.position.y + player.dimensions.y * 0.8
		};

		var entered = this.position.x + this.dimensions.x >= hitbox.west;
		entered = entered && this.position.x <= hitbox.east;
		entered = entered && this.position.y + this.dimensions.y >= hitbox.north;
		entered = entered && this.position.y <= hitbox.south;

		return entered;
	};

	Powerup.prototype.offense = function(player, powerup) {
		var particle = new starfighter.Particle(this.settings, player.center(), this.constants.particle.offense.RADIUS, powerup.kind.OFFENSE);
		this.actors[this.constants.game.PARTICLES].push(particle);

		player.setFireMode(true);

		setTimeout(function() {
			player.setFireMode(false);
		}, powerup.offense.TIMEOUT);
	};

	Powerup.prototype.defense = function(player, powerup) {
		var particle = new starfighter.Particle(this.settings, player.center(), this.constants.particle.defense.RADIUS, powerup.kind.DEFENSE);
		this.actors[this.constants.game.PARTICLES].push(particle);

		player.shielded = true;

		var that = this;
		setTimeout(function() {
			player.shielded = false;
		}, powerup.defense.TIMEOUT);
	};

	Powerup.prototype.life = function(player, powerup) {
		var particle = new starfighter.Particle(this.settings, player.center(), this.constants.particle.life.RADIUS, powerup.kind.LIFE);
		this.actors[this.constants.game.PARTICLES].push(particle);

		this.actors[this.constants.game.LIVES][0].gainLife();
	};

})();

