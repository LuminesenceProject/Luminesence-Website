(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Actor = starfighter.Actor = function(settings) {
		this.settings = settings;
		this.context = settings.context;
		this.sheet = settings.sheet;
		this.constants = settings.constants;
		this.actors = settings.actors;
	};

	Actor.prototype.render = function() {};

	Actor.prototype.collide = function() {};

	Actor.prototype.translate = function() {};

})();

