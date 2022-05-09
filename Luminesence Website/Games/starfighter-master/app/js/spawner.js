(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Spawner = starfighter.Spawner = function(settings) {
		starfighter.Actor.call(this, settings);

		this.meteor();
		this.powerup();
	};

	Spawner.prototype = Object.create(starfighter.Actor.prototype);

	Spawner.prototype.meteor = function() {
		var Meteor = starfighter.Meteor;
		var spawner = this.constants.spawner;
		var meteors = this.actors[this.constants.game.METEORS];
		var that = this;

		this.bigMeteorTimer = setInterval(function() {
			var type = "big";
			meteors.push(new Meteor(that.settings, type, that.start("meteor", type)));
		}, spawner.meteor.BIG_FREQUENCY);

		this.mediumMeteorTimer = setInterval(function() {
			var type = "medium";
			meteors.push(new Meteor(that.settings, type, that.start("meteor", type)));
		}, spawner.meteor.MEDIUM_FREQUENCY);

		this.smallMeteorTimer = setInterval(function() {
			var type = "small";
			meteors.push(new Meteor(that.settings, type, that.start("meteor", type)));
		}, spawner.meteor.SMALL_FREQUENCY);

		this.tinyMeteorTimer = setInterval(function() {
			var type = "tiny";
			meteors.push(new Meteor(that.settings, type, that.start("meteor", type)));
		}, spawner.meteor.TINY_FREQUENCY);
	};

	Spawner.prototype.powerup = function() {
		var that = this;

		this.powerupTimer = setInterval(function() {
			var Powerup = starfighter.Powerup;
			var powerups = that.actors[that.constants.game.POWERUPS];
			var kind = that.constants.powerup.kind;

			var id = Math.random();
			if (id <= that.constants.powerup.OFFENSE) {
				var type = kind.OFFENSE;
				var offense = new Powerup(that.settings, type, that.start("powerup", type));
				powerups.push(offense);
			}

			else if (id <= that.constants.powerup.DEFENSE) {
				var type = kind.DEFENSE;
				var defense = new Powerup(that.settings, type, that.start("powerup", type));
				powerups.push(defense);
			}

			else {
				var type = kind.LIFE;
				var life = new Powerup(that.settings, type, that.start("powerup", type));
				powerups.push(life);
			}
		}, that.constants.powerup.FREQUENCY);
	};

	Spawner.prototype.randomInteger = function(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);

		return Math.floor(Math.random() * (max - min)) + min;
	};

	Spawner.prototype.start = function(actor, type) {
		var x = this.randomInteger(0, this.context.canvas.width - this.constants[actor][type].SPRITE_WIDTH);
		var y = 0;

		return new starfighter.Vector(x, y);
	};

})();

