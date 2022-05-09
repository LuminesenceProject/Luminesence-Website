(function() {
	var starfighter = window.starfighter = window.starfighter || {};

	var Constants = starfighter.Constants = function() {
		this.game = {
			SPRITE_SHEET : "images/sheet.png",
			OVERFLOW     : 256,
			STARS		 : 0,
			PLAYER       : 1,
			POWERUPS	 : 2,
			LIVES		 : 3,
			SCORE		 : 4,
			PARTICLES    : 5,
			METEORS      : 6,
			LASERS       : 7,
			SPAWNER      : 8
		};

		this.controls = {
			A		    : 65,
			D		    : 68,
			W           : 87,
			S           : 83,
			LEFT_ARROW  : 37,
			RIGHT_ARROW : 39,
			UP_ARROW    : 38,
			DOWN_ARROW  : 40,
			SPACEBAR    : 32
		};

		this.player = {
			blue : {
				SPRITE_X : 211,
				SPRITE_Y : 941
			},
			red : {
				SPRITE_X : 224,
				SPRITE_Y : 832
			},
			SPRITE_WIDTH     : 99,
			SPRITE_HEIGHT    : 75,
			SCALE_FACTOR     : 0.5,
			VELOCITY_X       : 7,
			VELOCITY_Y       : 7,
			FIRE_FREQ		 : 160,
			TRIPLE_FIRE_FREQ : 100,
			ALPHA            : 0.5,
			REVIVE_DELAY     : 2000,
			IMMUNE_DELAY     : 2000
		};

		this.laser = {
			SPRITE_WIDTH  : 9,
			SPRITE_HEIGHT : 54,
			direction : {
				LEFT   : "left",
				CENTER : "center",
				RIGHT  : "right"
			},
			color : {
				BLUE : "blue",
				RED  : "red"
			},
			blue : {
				SPRITE_X : 856,
				SPRITE_Y : 421,
				DAMAGE	 : 1,
				center : {
					VELOCITY_X : 0,
					VELOCITY_Y : 16
				}
			},
			red : {
				SPRITE_X : 858,
				SPRITE_Y : 230,
				DAMAGE   : 2,
				left : {
					VELOCITY_X : -8,
					VELOCITY_Y : 16,
					ANGLE	   : -Math.PI / 8
				},
				center : {
					VELOCITY_X : 0,
					VELOCITY_Y : 16
				},
				right : {
					VELOCITY_X : 8,
					VELOCITY_Y : 16,
					ANGLE	   : Math.PI / 8
				}
			}
		};

		this.meteor = {
			SCORE : 5,
			big : {
				SPRITE_WIDTH  : 101,
				SPRITE_HEIGHT : 84,
				VELOCITY_X    : 0,
				VELOCITY_Y    : 4,
				HP			  : 5,
				SCORE		  : 40,
				normal : {
					SPRITE_X      : 224,
					SPRITE_Y      : 664
				},
				hit : {
					SPRITE_X      : 224,
					SPRITE_Y      : 748
				}
			},
			medium : {
				SPRITE_WIDTH  : 43,
				SPRITE_HEIGHT : 43,
				VELOCITY_X    : 0,
				VELOCITY_Y    : 6,
				HP            : 4,
				SCORE		  : 30,
				normal : {
					SPRITE_X : 651,
					SPRITE_Y : 447
				},
				hit : {
					SPRITE_X : 674,
					SPRITE_Y : 219
				}
			},
			small : {
				SPRITE_WIDTH  : 28,
				SPRITE_HEIGHT : 28,
				VELOCITY_X    : 0,
				VELOCITY_Y    : 8,
				HP			  : 3,
				SCORE		  : 20,
				normal : {
					SPRITE_X : 406,
					SPRITE_Y : 234
				},
				hit : {
					SPRITE_X : 406,
					SPRITE_Y : 262
				}
			},
			tiny : {
				SPRITE_WIDTH  : 18,
				SPRITE_HEIGHT : 18,
				VELOCITY_X    : 0,
				VELOCITY_Y    : 10,
				HP			  : 2,
				SCORE		  : 10,
				normal : {
					SPRITE_X : 346,
					SPRITE_Y : 814
				},
				hit : {
					SPRITE_X : 364,
					SPRITE_Y : 814
				}
			}
		};

		this.spawner = {
			meteor : {
				BIG_FREQUENCY : 1600,
				MEDIUM_FREQUENCY : 800,
				SMALL_FREQUENCY : 400,
				TINY_FREQUENCY : 400
			},
			star : {
				FREQUENCY : 500
			}
		};

		this.particle = {
			RADIUS : 0,
			BLUR   : 0,
			ALPHA  : 1,
			meteor : {
				FILL_STYLE   : "grey",
				SHADOW_COLOR : "white"
			},
			death : {
				FILL_STYLE   : "red",
				SHADOW_COLOR : "yellow",
				RADIUS       : 80
			},
			revive : {
				FILL_STYLE   : "#74b1be",
				SHADOW_COLOR : "grey",
				RADIUS       : 80
			},
			offense : {
				FILL_STYLE   : "red",
				SHADOW_COLOR : "grey",
				RADIUS		 : 80
			},
			defense : {
				FILL_STYLE   : "purple",
				SHADOW_COLOR : "grey",
				RADIUS		 : 80
			},
			life : {
				FILL_STYLE	 : "green",
				SHADOW_COLOR : "grey",
				RADIUS		 : 80
			}
		};

		this.lives = {
			SPRITE_X        : 482,
			SPRITE_Y        : 358,
			SPRITE_WIDTH    : 33,
			SPRITE_HEIGHT   : 26,
			STARTING_LIVES  : 3,
			FONT		    : "32px VT323",
			FILL_STYLE	    : "#00bfff",
			SHADOW_COLOR    : "#bf5700",
			SHADOW_OFFSET_X : 2,
			SHADOW_OFFSET_Y : 2
		};

		this.score = {
			FONT			: "32px VT323",
			FILL_STYLE      : "#ffcc00",
			TEXT_ALIGN      : "right",
			SHADOW_COLOR    : "#990000",
			SHADOW_OFFSET_X : 2,
			SHADOW_OFFSET_Y : 2,
			OFFSET			: 8
		};

		this.powerup = {
			OFFENSE    : 0.40,
			DEFENSE    : 0.80,
			FREQUENCY  : 13000,
			VELOCITY_X : 0,
			VELOCITY_Y : 2,
			kind : {
				OFFENSE : "offense",
				DEFENSE : "defense",
				LIFE	: "life"
			},
			offense : {
				SPRITE_X	  : 809,
				SPRITE_Y	  : 437,
				SPRITE_WIDTH  : 19,
				SPRITE_HEIGHT : 30,
				TIMEOUT		  : 8000
			},
			defense : {
				SPRITE_X	  : 778,
				SPRITE_Y	  : 824,
				SPRITE_WIDTH  : 30,
				SPRITE_HEIGHT : 30,
				TIMEOUT		  : 8000,
				shield : {
					SPRITE_X	  : 0,
					SPRITE_Y	  : 412,
					SPRITE_WIDTH  : 133,
					SPRITE_HEIGHT : 108,
					SCALE_FACTOR  : 0.7,
					OFFSET_X	  : 46,
					OFFSET_Y	  : 10
				}
			},
			life : {
				SPRITE_X	  : 222,
				SPRITE_Y	  : 108,
				SPRITE_WIDTH  : 22,
				SPRITE_HEIGHT : 21
			}
		};

		this.menu = {
			gradient : {
				STOP_0 : "#16222a",
				STOP_1 : "#3a6073"
			},
			title : {
				NAME	     : "Starfighter",
				FONT	     : "56px Bungee",
				FILL_STYLE   : "grey",
				STROKE_STYLE : "white"
			},
			desc : {
				NAME		 : "ARCADE",
				FONT		 : "52px Black Ops One",
				FILL_STYLE	 : "#74b1be",
				STROKE_STYLE : "#9feaf9"
			},
			cursor : {
				SPRITE_X	  : 797,
				SPRITE_Y	  : 173,
				SPRITE_WIDTH  : 30,
				SPRITE_HEIGHT : 33
			},
			button : {
				SPRITE_X	  : 0,
				SPRITE_Y	  : 78,
				SPRITE_WIDTH  : 222,
				SPRITE_HEIGHT : 39,
				FONT		  : "28px Bungee",
				FILL_STYLE	  : "#00bfff",
				NAME		  : "PLAY"
			},
			movement : {
				key : {
					FILL_STYLE	 : "black",
					STROKE_STYLE : "white",
					LINE_WIDTH	 : 0.6,
					WIDTH		 : 30,
					HEIGHT		 : 30
				},
				letter : {
					FONT	   : "18px Bungee",
					FILL_STYLE : "white"
				}
			},
			fire : {
				key : {
					FILL_STYLE	 : "black",
					STROKE_STYLE : "white",
					LINE_WIDTH	 : 0.6,
					WIDTH		 : 110,
					HEIGHT		 : 30
				},
				letter : {
					FONT	   : "16px Bungee",
					FILL_STYLE : "white"
				}
			},
			instructions : {
				FONT		 : "24px Bungee",
				FILL_STYLE	 : "white",
				STROKE_STYLE : "grey"
			},
			author : {
				FONT	   : "12px Bungee",
				FILL_STYLE : "#74b1be",
				NAME	   : "Created by Brandon Castellanos"
			}
		};

		this.star = {
			FILL_STYLE	 : "white",
			SHADOW_COLOR : "white",
			LIMIT		 : 40,
			STEP		 : 1,
			VELOCITY_Y	 : 1
		};

	};

})();

