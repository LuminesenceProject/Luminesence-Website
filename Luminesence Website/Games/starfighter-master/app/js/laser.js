(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Laser = starfighter.Laser = function(settings, start, type, direction) {
		starfighter.Actor.call(this, settings);

		var laser = this.constants.laser;

		this.type = type;
		this.direction = direction;
		this.dimensions = new starfighter.Vector(laser.SPRITE_WIDTH, laser.SPRITE_HEIGHT);
		this.position = start;
		this.velocity = new starfighter.Vector(laser[type][direction].VELOCITY_X, laser[type][direction].VELOCITY_Y);
		this.damage = laser[type].DAMAGE;
		this.active = true;
	};

	Laser.prototype = Object.create(starfighter.Actor.prototype);

	Laser.prototype.render = function() {
		if (this.active) {
			var laser = this.constants.laser;
			var context = this.context;

			var dx = this.position.x;
			var dy = this.position.y;

			context.save();
			if (this.direction != laser.direction.CENTER) {
				context.translate(this.position.x, this.position.y + this.dimensions.y);
				context.rotate(laser[this.type][this.direction].ANGLE);
				dx = 0;
				dy = -this.dimensions.y;
			}
			context.drawImage(this.sheet,
				laser[this.type].SPRITE_X, laser[this.type].SPRITE_Y,
				laser.SPRITE_WIDTH, laser.SPRITE_HEIGHT,
				dx, dy,
				this.dimensions.x, this.dimensions.y);
			context.restore();
		}
	};

	Laser.prototype.translate = function() {
		if (this.active) {
			if (this.position.y + this.dimensions.y <= 0)
				this.active = false;

			this.up();
		}
	};

	Laser.prototype.up = function() {
		this.position.x += this.velocity.x;
		this.position.y -= this.velocity.y;
	};

	Laser.prototype.collide = function() {
		if (this.active) {
			var that = this;

			this.actors[this.constants.game.METEORS].forEach(function(meteor) {
				if (meteor.active) {
					if (that.collideMeteor(meteor)) {
						that.meteorDamaged(meteor);

						if (meteor.hp <= 0) that.meteorDead(meteor);
					}
				}
			});
		}
	};

	Laser.prototype.collideMeteor = function(meteor) {
		var hitbox = {
			west  : meteor.position.x,
			east  : meteor.position.x + meteor.dimensions.x,
			north : meteor.position.y,
			south : meteor.position.y + meteor.dimensions.y
		};

		var entered = this.position.x + this.dimensions.x >= hitbox.west;
		entered = entered && this.position.x <= hitbox.east;
		entered = entered && this.position.y + this.dimensions.y >= hitbox.north;
		entered = entered && this.position.y <= hitbox.south;

		return entered;
	};

	Laser.prototype.meteorDamaged = function(meteor) {
		this.active = false;
		meteor.hp -= this.damage;
		meteor.hit = true;

		var score = this.actors[this.constants.game.SCORE][0];
		score.raise(this.constants.meteor.SCORE);
	};

	Laser.prototype.meteorDead = function(meteor) {
		meteor.active = false;

		var particle = new starfighter.Particle(this.settings, meteor.center(), meteor.radius(), "meteor");
		this.actors[this.constants.game.PARTICLES].push(particle);

		var score = this.actors[this.constants.game.SCORE][0];
		score.raise(this.constants.meteor[meteor.type].SCORE);
	};

})();

