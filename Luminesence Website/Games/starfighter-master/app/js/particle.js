(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Particle = starfighter.Particle = function(settings, start, limit, type) {
		starfighter.Actor.call(this, settings);

		this.position = start;
		this.limit = Math.ceil(limit / 10) * 10;
		this.type = type;
		this.radius = this.constants.particle.RADIUS;
		this.blur = this.constants.particle.BLUR;
		this.alpha = this.constants.particle.ALPHA;
		this.active = true;
	};

	Particle.prototype = Object.create(starfighter.Actor.prototype);

	Particle.prototype.render = function() {
		if (this.active) {
			var context = this.context;

			context.save();

			context.globalAlpha = this.alpha;
			context.fillStyle = this.constants.particle[this.type].FILL_STYLE;
			context.shadowColor = this.constants.particle[this.type].SHADOW_COLOR;
			context.shadowBlur = this.blur;

			context.beginPath();
			context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
			context.fill();
			context.closePath();

			context.restore();

			this.radius += this.limit / 10;
			this.blur += this.limit / 10;
			this.alpha -= 0.1;
			this.active = this.radius != this.limit ? true : false;
		}
	};

})();

