(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Star = starfighter.Star = function(settings, options) {
		this.settings = settings;
		this.x = options.x;
		this.y = options.y;
		this.blur = options.blur;
		this.radius = options.radius;
		this.active = options.active;
	};

	Star.prototype.render = function() {
		if (this.active) {
			var context = this.settings.context;
			var star = this.settings.constants.star;

			context.save();

			context.fillStyle = star.FILL_STYLE;
			context.shadowColor = star.SHADOW_COLOR;
			context.shadowBlur = this.blur;

			context.beginPath();
			context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
			context.fill();
			context.closePath();

			if (this.blur < star.LIMIT)
				this.blur += star.STEP;

			else
				this.blur = 0;

			context.restore();
		}
	};

	Star.prototype.translate = function() {
		if (this.active) {
			if (this.y >= this.settings.context.canvas.height)
				this.active = false;

			else
				this.y += this.settings.constants.star.VELOCITY_Y;
		}
	};

	Star.prototype.collide = function() {};

})();

