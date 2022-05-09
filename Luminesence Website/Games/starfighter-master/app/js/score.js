(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Score = starfighter.Score = function(settings) {
		starfighter.Actor.call(this, settings);

		this.points = 0;
	};

	Score.prototype = Object.create(starfighter.Actor.prototype);

	Score.prototype.render = function() {
		var context = this.context;
		var score = this.constants.score;

		context.save();
		context.font = score.FONT;
		context.fillStyle = score.FILL_STYLE;
		context.textAlign = score.TEXT_ALIGN;
		context.shadowColor = score.SHADOW_COLOR;
		context.shadowOffsetX = score.SHADOW_OFFSET_X;
		context.shadowOffsetY = score.SHADOW_OFFSET_Y;
		context.fillText(this.points, context.canvas.width - score.OFFSET, context.canvas.height - score.OFFSET);
		context.restore();
	};

	Score.prototype.raise = function(points) {
		this.points += points;
	};

})();

