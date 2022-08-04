// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// @language ECMASCRIPT5
// @fileoverview
// @suppress {checkTypes | globalThis | checkVars}
// ==/ClosureCompiler==

/*
Welcome to Ga's source code!
============================

If you're reading this to find out how to use Ga, you've come to the wrong place.
You should take a look inside the `examples` folder.
There's a lot of cool stuff inside the `examples` folder, so check it out!
But if you want to find out how Ga works, this is the place to be.

This source code is organized into chapters.
Yes, chapters.
Just think of it like *Lord of the Rings* or maybe *Harry Potter* and you'll be fine.
Actually, come to think of it, maybe it's more like *50 Shades of Grey*.

Everything is in one big, hulking gainormous file.
Why?
Because `One Thing` is better than `Many Things`.
Just use your text editor's search function to find what you're looking for.
Courage, my love, you can do it!

Table of contents
-----------------

*Prologue: Fixing the WebAudio API*

`AudioContextMonkeyPatch.js`: Chris Wilson's cross browser patch for the WebAudio API.

*Chapter 1: The game engine*

`GA`:The global GA object.
`ga`: A convenience function used to launch Ga.
`Ga.create`: All the code that the Ga engine depends on.
`ga.gameLoop`: the engine's game loop.
`ga.update`: Calls the renderer, updates buttons and drag-and-drop objects each frame.
`ga.start`: Used to get the engine up and running.
`ga.pause`: pause the game loop.
`ga.resume`: resume the game loop.
`ga.hidePointer`: hide the pointer.
`ga.showPointer`: show the pointer.
`ga.fps`: get and set the game's frames per second.
`ga.backgroundColor`: Set the canvas background color.

*Chapter 2: Sprites*

`makeDisplayObject`: Assigns all the basic properties common to all sprite types.
`makeStage`: Create the stage object, which is the parent container for all the sprites.
`ga.remove`: A global convenience method that will remove any sprite from its parent.
`makeCircular`: Adds `diameter` and `radius` properties to sprites if a sprite's `circular` property is set to `true`.
`ga.group`: Creates a parent group container that lets you compose game scenes or composite sprites.
`ga.rectangle`: A basic colored rectangle sprite.
`ga.circle`: A basic colored circle sprite.`
`ga.line`: A line with start and end points.
`ga.text`: Single line dynamic text.
`ga.frame`: A function that returns an object defining the position of a sub-image in an Image object tileset.
`ga.frames`: Lets you define a whole series of sub-images in a tileset.
`ga.filmstrip:` Automatically returns an array of sub-image x and y coordinates for an animated image sequence.
`ga.sprite`: Creates a sprite from an image, `frame`, `filmstrip`, or a frame from a texture atlas.
`ga.button`: An interactive button with `up` `over` and `down` states. Optional `press` and `release` actions.
`makeInteractive`: Assigns `press` and `release` actions to sprites and adds pointer interactivity.
`ga.image`: Access Image objects by their file names.
`ga.json`: Access JSON files by their file names.
`ga.addStatePlayer`: Adds `play`, `stop`, `show`, and `playSequence` methods to sprites.

*Chapter 3: Rendering*

`ga.render`: Ga's canvas rendering method.

*Chapter 4: Ga's helper objects and methods*

`ga.assets`: All the game's assets (files) are stored in this object, and it has a `load` method that manages asset loading.
`makePointer`: Makes a universal pointer object for the mouse and touch.
`keyboard`: A method that creates `key` objects that listen for keyboard events.
`makeKeys`: Used by Ga to create built-in references to the arrow keys and space bar.
`byLayer`: An array sort method that's called when a sprite's `layer` property is changed.

*/

/*
Prologue: Some necessary polyfills
--------------------------

/*
Chapter 1: The game engine
--------------------------

This fist chapter is all about the Ga's game engine code. This is the code that
launches Ga, sets the defaults, creates a canvas element, starts loading asssets,
setups up the current game state,
and generally gets things up and running. This is probably the best place to start
to learn how the engine works.

*/

//### GA
//`GA` is the global instance of the program.
var GA = GA || {};

//### GA.VERSION
//The current version of the game engine.
GA.VERSION = '0.0.1';

//Set `plugins` and `custom` to an intial value of `undefined` to make
//Google Closure Compiler happy
GA.plugins = undefined;
GA.custom = undefined;

//### GA.create
//The entire Ga program exists inside the `Ga.create` method. It
//creates and returns a new instance of Ga, along with all the core
//game engine functions. However, Ga won't actually start until you
//call the `start` method from the applicaiton code, as you can see in
//all the examples (in the `examples` folder).
GA.create = function(width, height, setup, assetsToLoad, load) {

  //The `ga` object is returned by this function. All the game
  //engine's methods and properties are going to be attached to it.
  var ga = {};

  /*
  ### Initialize the game engine
  All of Ga's intializtion code happens here.
  */

  //Make the canvas element and add it to the DOM.
  var dips = 1; //window.devicePixelRatio;
  ga.canvas = document.createElement("canvas");
  ga.canvas.setAttribute("width", width * dips);
  ga.canvas.setAttribute("height", height * dips);
  ga.canvas.style.backgroundColor = "black";
  document.body.appendChild(ga.canvas);

  //Create the context as a property of the canvas.
  ga.canvas.ctx = ga.canvas.getContext("2d");

  ga.canvas.ctx.textBaseline = 'middle';
  ga.canvas.ctx.textAlign = "center";


  //Make the `stage`. The `stage` is the root container group
  //for all the sprites and other groups.
  ga.stage = makeStage();

  //Initialize the pointer.
  // ga.pointer = makePointer();

  //Make the keyboard keys (arrow keys and space bar.)
  ga.key = makeKeys();

  //An array to hold all the button sprites.
  ga.buttons = [];

  //Set `dragAndDrop` to `false` by default
  //(Change it to `true` and set the `draggable` property on sprites
  //to `true` to enable drag and drop.
  ga.dragAndDrop = false;

  //An array to store the draggable sprites.
  ga.draggableSprites = [];

  //An array to store the tweening functions.
  ga.tweens = [];

  //Set the game `state`.
  ga.state = undefined;

  //Set the user-defined `load` and `setup` states.
  ga.load = load || undefined;
  ga.setup = setup || undefined;

  //The `setup` function is required, so throw an error if it's
  //missing.
  if (ga.setup === undefined) {
    throw new Error(
      "Please supply the setup function in the constructor"
    );
  }

  //Get the user-defined array that lists the assets
  //that have to load.
  ga.assetFilePaths = assetsToLoad || undefined;

  //A Boolean to let us pause the game.
  ga.paused = false;

  //The upper-limit frames per second that the game should run at.
  //Ga defaults to 60 fps.
  //Use the `fps` getter/setter to modify this value.
  ga._fps = 60;
  ga._startTime = Date.now();
  ga._frameDuration = 1000 / ga._fps;
  ga._lag = 0;

  //Set sprite rendering position interpolation to
  //`true` by default
  ga.interpolate = true;

  //An array that stores functions which should be run inside
  //Ga's core `update` game loop. Just push any function you write
  //into this array, and ga will run it in a continuous loop.
  ga.updateFunctions = [];

  /*
  The canvas's x and y scale. These are set by getters and setter in
  the code ahead. The scale is used in the `makeInteractive`
  function for correct hit testing between the pointer and sprites
  in a scaled canvas. Here's some application code you can use to
  scale the Ga canvas to fit into the maximum size of the browser
  window.

      var scaleX = g.canvas.width / window.innerWidth,
          scaleY = g.canvas.height / window.innerHeight,
          //Or, scale to the height
          //scaleX = window.innerWidth / g.canvas.width,
          //scaleY = window.innerHeight / g.canvas.height,
          scaleToFit = Math.min(scaleX, scaleY);

      g.canvas.style.transformOrigin = "0 0";
      g.canvas.style.transform = "scale(" + scaleToFit + ")";

      //Set Ga's scale
      g.scale = scaleToFit;

  */
  //The game's screen's scale.
  ga.scale = 1;

  /*
  ### Core game engine methods
  This next sections contains all the important methods that the game engine needs to do its work.
  */

  //### gameLoop
  //The engine's game loop. Ga uses a fixed timestep for logic update
  //and rendering. This is mainly for simplicity. I'll probably
  //migrate to a "fixed timestep / variable rendering" with
  //interpolation in the
  //next major update. For a working example, see:
  //jsbin.com/tolime/1/edit
  //If the `fps` isn't set, the maximum framerate is used.
  //Use Ga's `fps` getter/setter (in the code ahead) to change the framerate
  //
  function gameLoop() {
    requestAnimationFrame(gameLoop, ga.canvas);
    if (ga._fps === undefined) {

      //Run the code for each frame.
      update();
      ga.render(ga.canvas, 0);
      
    }

    //If `fps` has been set, clamp the frame rate to that upper limit.
    else {

      //Calculate the time that has elapsed since the last frame
      var current = Date.now(),
        elapsed = current - ga._startTime;

      if (elapsed > 1000) elapsed = ga._frameDuration;

      //For interpolation:
      ga._startTime = current;

      //Add the elapsed time to the lag counter
      ga._lag += elapsed;

      //Update the frame if the lag counter is greater than or
      //equal to the frame duration
      while (ga._lag >= ga._frameDuration) {

        //Capture the sprites' previous positions for rendering
        //interpolation
        capturePreviousSpritePositions();

        //Update the logic
        update();

        //Reduce the lag counter by the frame duration
        ga._lag -= ga._frameDuration;
      }

      //Calculate the lag offset and use it to render the sprites
      var lagOffset = ga._lag / ga._frameDuration;
      ga.render(ga.canvas, lagOffset);
    }
  }

  //### capturePreviousSpritePositions
  //This function is run in the game loop just before the logic update
  //to store all the sprites' previous positions from the last frame.
  //It allows the render function to interpolate the sprite positions
  //for ultra-smooth sprite rendering at any frame rate
  function capturePreviousSpritePositions() {
    ga.stage.children.forEach(function(sprite) {
      setPosition(sprite);
    });

    function setPosition(sprite) {
      sprite._previousX = sprite.x;
      sprite._previousY = sprite.y;
      if (sprite.children && sprite.children.length > 0) {
        sprite.children.forEach(function(child) {
          setPosition(child);
        });
      }
    }
  }

  //### update
  //The things that should happen in the game loop.
  function update() {

    //Render the canvas.
    //ga.render(ga.canvas);

    //Update all the buttons in the game.
    if (ga.buttons.length > 0) {
      ga.canvas.style.cursor = "auto";
      for (var i = ga.buttons.length - 1; i >= 0; i--) {
        var button = ga.buttons[i];
        button.update(ga.pointer, ga.canvas);
        if (button.state === "over" || button.state === "down") {

          //If the button (or interactive sprite) isn't the actual
          //stage itself, change the cursor to a pointer.
          if (!button.stage) {
            ga.canvas.style.cursor = "pointer";
          }
        }
      }
    }

    //Update the pointer for drag and drop.
    if (ga.dragAndDrop) {
      ga.pointer.updateDragAndDrop();
    }

    //Run the current game `state` function if it's been defined and
    //the game isn't `paused`.
    if (ga.state && !ga.paused) {
      ga.state();
    }

    /*
    Loop through all the functions in the `updateFunctions` array
    and run any functions it contains. You can add any of your
    own custom functions to this array like this:

        var customFunction = function() {console.log("I'm in the game loop!);}
        ga.updateFunctions.push(customFunction);

    See the see the code in the `particleEffect` and `enableFullscreen`
    section of the `plugins.js` file to see typical examples of how code can be
    added to the game loop like this.
    */

    if (ga.updateFunctions.length !== 0) {
      for (var l = 0; l < ga.updateFunctions.length; l++) {
        var updateFunction = ga.updateFunctions[l];
        updateFunction();
      }
    }
  }

  //### start
  //The `start` method that gets the whole engine going. This needs to
  //be called by the user from the game application code, right after
  //Ga is instantiated.
  ga.start = function() {
    if (ga.assetFilePaths) {

      //Use the supplied file paths to load the assets then run
      //the user-defined `setup` function.
      ga.assets.whenLoaded = function() {

        //Clear the game `state` function for now to stop the loop.
        ga.state = undefined;

        //Call the `setup` function that was supplied by the user in
        //Ga's constructor.
        ga.setup();
      };
      ga.assets.load(ga.assetFilePaths);

      //While the assets are loading, set the user-defined `load`
      //function as the game state. That will make it run in a loop.
      //You can use the `load` state to create a loading progress bar.
      if (ga.load) {
        ga.state = ga.load;
      }
    }

    //If there aren't any assets to load,
    //just run the user-defined `setup` function.
    else {
      ga.setup();
    }

    //Start the game loop.
    gameLoop();
  };

  //### pause and resume
  //Next are a few convenience methods for interacting with the game engine.
  //This `pause` and `resume` methods start and stop the game loop to
  //allow you to run functions that should only execute once.
  ga.pause = function() {
    ga.paused = true;
  };
  ga.resume = function() {
    ga.paused = false;
  };

  //### hidePointer and showPointer
  //Use `hidePointer` and `showPointer` to hide and display the
  //pointer.
  // ga.hidePointer = function() {
  //   ga.canvas.style.cursor = "none";
  // };
  // ga.showPointer = function() {
  //   ga.canvas.style.cursor = "auto";
  // };

  //Getters and setters for various game engine properties.
  // Object.defineProperties(ga, {

  //   //### fps
  //   //The `fps` getter/setter. Use it to set the frame rate.
  //   fps: {
  //     get: function() {
  //       return ga._fps;
  //     },
  //     set: function(value) {
  //       ga._fps = value;
  //       ga._startTime = Date.now();
  //       ga._frameDuration = 1000 / ga._fps;
  //     },
  //     enumerable: true,
  //     configurable: true
  //   },

  //   //### backgroundColor
  //   //Set the background color.
  //   backgroundColor: {
  //     set: function(value) {
  //       ga.canvas.style.backgroundColor = value;
  //     },
  //     enumerable: true,
  //     configurable: true
  //   }
  // });



  /*
  Chapter 2: Sprites

  This chapter contains all the code for Ga's scene graph and sprite system. Ga has 6 built-in sprite types
  that have a wide range of applications for making games.

  - `circle`: Circles with fill and stroke colors.
  - `rectangle`: Rectangles with fill and stroke colors.
  - `line`: Lines with a color, width, and start and end points.
  - `text`: Single line dynamic text objects.
  - `sprite`: A versatile sprite that can be made from a single image, a frame in a texture atlas,
  a series of frames in sequence on a tileset or a series of frames in a texture atlas.
  - `button`: An interactive button with three states (up, over and down)
  and user-definable `press` and `release` actions.

  All sprites can be nested inside other sprites with an `addChild` method, and parent
  sprites have their own local coordinate system. Compose them together to make really complex game objects.

  There are also two special sprites:

  - `group`: This is a generic parent container is just used to group related sprites together.
  Its `width` and `height` can be assigned manually but, if they aren't, the group's `width`
  and `height` will match the area taken up by its children.
  - `stage`: this is a special group that is created by the Ga engine when it's initialized. The
  `stage` is the root container that contains everything in the game.

  Use these building blocks for making most of the kinds of things you'll need in your games.
  When sprites are created, they're assigned all of their basic properties with the help of a method called
  `makeDisplayObject`. This gives the sprites all their default properties. After `makeDisplayObject` runs,
  each sprite type is customized but their own constructor methods.
  */

  //### makeDisplayObject
  //`makeDisplayObject` assigns properties that are common for all the sprite types.
  function makeDisplayObject(o) {
    // we use this: console.log('using makeDisplayObject(o)');
    //Initialize the position
    o.x = 0;
    o.y = 0;

    //Initialize the velocity.
    o.vx = 0;
    o.vy = 0;

    //Initialize the `width` and `height`.
    o.width = 0;
    o.height = 0;

    //The sprite's width and height scale factors.
    o.scaleX = 1;
    o.scaleY = 1;

    //The sprite's pivot point, which is its center of rotation.
    //This is a percentage between 0.01 and 0.99.
    o.pivotX = 0.5;
    o.pivotY = 0.5;

    //The sprite's rotation and visibility.
    o.rotation = 0;
    o.visible = true;

    //Leave the sprite's `parent` as `undefined` for now.
    //(Most will be added as children to the `stage` at a later step.)
    o.parent = undefined;

    //Is this the `stage` object? This will be `false` for every
    //sprite, except the `stage`.
    o.stage = false;

    //Optional drop shadow properties.
    //Set `shadow` to `true` if you want the sprite to display a
    //shadow.
    o.shadow = false;
    o.shadowColor = "rgba(100, 100, 100, 0.5)";
    o.shadowOffsetX = 3;
    o.shadowOffsetY = 3;
    o.shadowBlur = 3;

    //Optional blend mode
    o.blendMode = undefined;

    //The sprite's private properties that are just used for internal
    //calculations. All these properties will be changed or accessed through a matching getter/setter
    o._alpha = 1;
    o._draggable = undefined;

    //The sprite's depth layer.
    o._layer = 0;

    //Is the sprite circular? If it is, it will be given a `radius`
    //and `diameter`.
    o._circular = false;

    //Is the sprite `interactive`? If it is, it can become clickable
    //or touchable.
    o._interactive = false;

    //properties to store the x and y positions from the previous
    //frame. Use for rendering interpolation
    o._previousX = undefined;
    o._previousY = undefined;

    //Add the sprite's container properties so that you can have
    //a nested parent/child scene graph hierarchy.
    //Create a `children` array that contains all the
    //in this container.

    o.children = [];
    //The `addChild` method lets you add sprites to this container.

    o.addChild = function(sprite) {

      //Remove the sprite from its current parent, if it has one, and
      //the parent isn't already this object
      if (sprite.parent) {
        sprite.parent.removeChild(sprite);
      }

      //Make this object the sprite's parent and
      //add it to this object's `children` array.
      sprite.parent = o;
      o.children.push(sprite);

      //Calculate the sprite's new width and height
      //o.calculateSize();
    };

    //The `removeChild` method lets you remove a sprite from its
    //parent container.
    o.removeChild = function(sprite) {
      if (sprite.parent === o) {
        o.children.splice(o.children.indexOf(sprite), 1);
      } else {
        throw new Error(sprite + "is not a child of " + o);
      }

      //Calculate the sprite's new width and height
      //o.calculateSize();
    };

    //Dynamically calculate the width and height of the sprite based
    //on the size and position of the children it contains
    /*
    o.calculateSize = function() {
      //Calculate the width based on the size of the largest child
      //that this sprite contains
      if (o.children.length > 0 && o.stage === false) {
        for(var i = 0; i < o.children.length - 1; i++) {
          var child = o.children[i];
          if (child.x + child.width > o.width) {
            o.width = child.x + child.width;
          }
          if (child.y + child.height > o.height) {
            o.height = child.y + child.height;
          }
        }
      }
    };
    */

    //Swap the depth layer positions of two child sprites
    o.swapChildren = function(child1, child2) {
      var index1 = o.children.indexOf(child1),
        index2 = o.children.indexOf(child2);
      if (index1 !== -1 && index2 !== -1) {

        //Swap the indexes
        child1.childIndex = index2;
        child2.childIndex = index1;

        //Swap the array positions
        o.children[index1] = child2;
        o.children[index2] = child1;
      } else {
        throw new Error(child + " Both objects must be a child of the caller " + o);
      }
    }

    //`add` and `remove` convenience methods let you add and remove
    //many sprites at the same time.
    o.add = function(spritesToAdd) {
      var sprites = Array.prototype.slice.call(arguments);
      if (sprites.length > 1) {
        sprites.forEach(function(sprite) {
          o.addChild(sprite);
        });
      } else {
        o.addChild(sprites[0]);
      }
    };
    o.remove = function(spritesToRemove) {
      var sprites = Array.prototype.slice.call(arguments);
      if (sprites.length > 1) {
        sprites.forEach(function(sprite) {
          o.removeChild(sprite);
        });
      } else {
        o.removeChild(sprites[0]);
      }
    };

    //A `setPosition` convenience function to let you set the
    //x any y position of a sprite with one line of code.
    o.setPosition = function(x, y) {
      o.x = x;
      o.y = y;
    };

    //The `put` methods are conveniences that help you position a
    //another sprite in and around this sprite.
    //First, get a short form reference to the sprite to make the code more
    //easier to read
    var a = o;

    //Center a sprite inside this sprite. `xOffset` and `yOffset`
    //arguments determine by how much the other sprite's position
    //should be offset from the center. These methods use the
    //sprites' global coordinates (`gx` and `gy`).
    //In all these functions, `b` is the second sprite that is being
    //positioned relative to the first sprite (this one), `a`.
    //Center `b` inside `a`.
    o.putCenter = function(b, xOffset, yOffset) {
      xOffset = xOffset || 0;
      yOffset = yOffset || 0;
      b.x = (a.x + a.halfWidth - b.halfWidth) + xOffset;
      b.y = (a.y + a.halfHeight - b.halfHeight) + yOffset;

      //Compensate for the parent's position
      o.compensateForParentPosition(a, b);
    };

    //Position `b` above `a`.
    o.putTop = function(b, xOffset, yOffset) {
      xOffset = xOffset || 0;
      yOffset = yOffset || 0;
      b.x = (a.x + a.halfWidth - b.halfWidth) + xOffset;
      b.y = (a.y - b.height) + yOffset;

      //Compensate for the parent's position
      o.compensateForParentPosition(a, b);
    };

    //Position `b` to the right of `a`.
    o.putRight = function(b, xOffset, yOffset) {
      xOffset = xOffset || 0;
      yOffset = yOffset || 0;
      b.x = (a.x + a.width) + xOffset;
      b.y = (a.y + a.halfHeight - b.halfHeight) + yOffset;

      //Compensate for the parent's position
      o.compensateForParentPosition(a, b);
    };

    //Position `b` below `a`.
    o.putBottom = function(b, xOffset, yOffset) {
      xOffset = xOffset || 0;
      yOffset = yOffset || 0;
      b.x = (a.x + a.halfWidth - b.halfWidth) + xOffset;
      b.y = (a.y + a.height) + yOffset;

      //Compensate for the parent's position
      o.compensateForParentPosition(a, b);
    };

    //Position `b` to the left of `a`.
    o.putLeft = function(b, xOffset, yOffset) {
      xOffset = xOffset || 0;
      yOffset = yOffset || 0;
      b.x = (a.x - b.width) + xOffset;
      b.y = (a.y + a.halfHeight - b.halfHeight) + yOffset;

      //Compensate for the parent's position
      o.compensateForParentPosition(a, b);
    };

    //`compensateForParentPosition` is a helper funtion for the above
    //`put` methods that subracts the parent's global position from
    //the nested child's position.
    o.compensateForParentPosition = function(a, b) {
      if (b.parent.gx !== 0 || b.parent.gy !== 0) {
        b.x -= a.gx;
        b.y -= a.gy;
      }
    }

    //Getters and setters for the sprite's internal properties.
    Object.defineProperties(o, {

      //`gx` and `gy` getters and setters represent the sprite's
      //global coordinates.
      gx: {
        get: function() {
          if (this.parent) {

            //The sprite's global x position is a combination of
            //its local x value and its parent's global x value
            return this.x + this.parent.gx;
          } else {
            return this.x;
          }
        },
        enumerable: true,
        configurable: true
      },
      gy: {
        get: function() {
          if (this.parent) {
            return this.y + this.parent.gy;
          } else {
            return this.y;
          }
        },
        enumerable: true,
        configurable: true
      },

      //A `position` getter. It's a convenience that lets you get and
      //set the sprite's position as an object with x and y values.
      position: {
        get: function() {
          return {
            x: o.x,
            y: o.y
          };
        },
        enumerable: true,
        configurable: true
      },

      //An `alpha` getter/setter. The sprite's `alpha` (transparency) should match its
      //parent's `alpha` value.
      alpha: {
        get: function() {

          //Find out the sprite's alpha relative to its parent's alpha
          var relativeAlpha = o.parent._alpha * o._alpha;
          return relativeAlpha;
        },
        set: function(value) {
          o._alpha = value;
        },
        enumerable: true,
        configurable: true
      },

      //The sprite's `halfWidth` and `halfHeight`.
      halfWidth: {
        get: function() {
          return o.width / 2;
        },
        enumerable: true,
        configurable: true
      },
      halfHeight: {
        get: function() {
          return o.height / 2;
        },
        enumerable: true,
        configurable: true
      },

      //The sprite's center point.
      centerX: {
        get: function() {
          return o.x + o.halfWidth;
        },
        enumerable: true,
        configurable: true
      },
      centerY: {
        get: function() {
          return o.y + o.halfHeight;
        },
        enumerable: true,
        configurable: true
      },

      //The sprite's depth layer. All sprites and groups have their depth layer
      //set to `0` when their first created. If you want to force a
      //sprite to appear above another sprite, set its `layer` to a
      //higher number.
      layer: {
        get: function() {
          return o._layer;
        },
        set: function(value) {
          o._layer = value;
          o.parent.children.sort(byLayer);
        },
        enumerable: true,
        configurable: true
      },

      //The `circular` property lets you define whether a sprite
      //should be interpreted as a circular object. If you set
      //`circular` to `true`, the sprite is sent to the `makeCircular`
      //function where its given `radius` and `diameter` properties.
      circular: {
        get: function() {
          return o._circular;
        },
        set: function(value) {

          //Give the sprite `diameter` and `radius` properties
          //if `circular` is `true`.
          if (value === true && o._circular === false) {
            makeCircular(o);
            o._circular = true;
          }

          //Remove the sprite's `diameter` and `radius` properties
          //if `circular` is `false`.
          if (value === false && o._circular === true) {
            delete o.diameter;
            delete o.radius;
            o._circular = false;
          }
        },
        enumerable: true,
        configurable: true
      },

      //Is the sprite draggable by the pointer? If `draggable` is set
      //to `true`, the sprite is added to Ga's `draggableSprites`
      //array. All the sprites in `draggableSprites` are updated each
      //frame to check whether they're being dragged.
      draggable: {
        get: function() {
          return o._draggable;
        },
        set: function(value) {

          //If it's `true` push the sprite into the `draggableSprites`
          //array.
          if (value === true) {
            ga.draggableSprites.push(o);
            o._draggable = true;

            //If Ga's `dragAndDrop` property is `false`, set it to
            //`true`
            if (ga.dragAndDrop === false) ga.dragAndDrop = true;
          }

          //If it's `false`, remove it from the `draggableSprites` array.
          if (value === false) {
            ga.draggableSprites.splice(ga.draggableSprites.indexOf(o), 1);
          }
        },
        enumerable: true,
        configurable: true
      },

      //Is the sprite interactive? If `interactive` is set to `true`,
      //the sprite is run through the `makeInteractive` method.
      //`makeInteractive` makes the sprite sensitive to pointer
      //actions. It also adds the sprite to the Ga's `buttons` array,
      //which is updated each frame in the `ga.update` method.
      interactive: {
        get: function() {
          return o._interactive;
        },
        set: function(value) {
          if (value === true) {

            //Add interactive properties to the sprite
            //so that it can act like a button.
            makeInteractive(o);
            o._interactive = true;
          }
          if (value === false) {

            //Remove the sprite's reference from the game engine's
            //`buttons` array so that it it's no longer affected
            //by mouse and touch interactivity.
            ga.buttons.splice(ga.buttons.indexOf(o), 1);
            o._interactive = false;
          }
        },
        enumerable: true,
        configurable: true
      },

      //The `localBounds` and `globalBounds` methods return an object
      //with `x`, `y`, `width`, and `height` properties that define
      //the dimensions and position of the sprite. This is a convenience
      //to help you set or test boundaries without having to know
      //these numbers or request them specifically in your code.
      localBounds: {
        get: function() {
          var rectangle = {
            x: 0,
            y: 0,
            width: o.width,
            height: o.height
          };
          return rectangle;
        },
        enumerable: true,
        configurable: true
      },
      globalBounds: {
        get: function() {
          rectangle = {
            x: o.gx,
            y: o.gy,
            width: o.gx + o.width,
            height: o.gy + o.height
          };
          return rectangle;
        },
        enumerable: true,
        configurable: true
      },

      //`empty` is a convenience property that will return `true` or
      //`false` depending on whether or not this sprite's `children`
      //array is empty.
      empty: {
        get: function() {
          if (o.children.length === 0) {
            return true;
          } else {
            return false;
          }
        },
        enumerable: true,
        configurable: true
      }
    });
  };

  //### remove
  //`remove` is a global convenience method that will
  //remove any sprite, or an argument list of sprites, from its parent.
  ga.remove = function(spritesToRemove) {
    var sprites = Array.prototype.slice.call(arguments);

    //Remove sprites that's aren't in an array
    if (!(sprites[0] instanceof Array)) {
      if (sprites.length > 1) {
        sprites.forEach(function(sprite) {
          sprite.parent.removeChild(sprite);
        });
      } else {
        sprites[0].parent.removeChild(sprites[0]);
      }
    }

    //Remove sprites in an array of sprites
    else {
      var spritesArray = sprites[0];
      if (spritesArray.length > 0) {
        for (var i = spritesArray.length - 1; i >= 0; i--) {
          var sprite = spritesArray[i];
          sprite.parent.removeChild(sprite);
          spritesArray.splice(spritesArray.indexOf(sprite), 1);
        }
      }
    }
  };

  //### makeCircular
  //The `makeCircular` function is run whenever a sprite's `circular`
  //property is set to `true`.
  //Add `diameter` and `radius` properties to circular sprites.
  // function makeCircular(o) {
  //   console.log('using @ line...')
  //   Object.defineProperties(o, {
  //     diameter: {
  //       get: function() {
  //         return o.width;
  //       },
  //       set: function(value) {
  //         o.width = value;
  //         o.height = value;
  //       },
  //       enumerable: true,
  //       configurable: true
  //     },
  //     radius: {
  //       get: function() {
  //         return o.width / 2;
  //       },
  //       set: function(value) {
  //         o.width = value * 2;
  //         o.height = value * 2;
  //       },
  //       enumerable: true,
  //       configurable: true
  //     }
  //   });
  // }

  //### makeStage
  //`makeStage` is called when Ga initializes. It creates a group
  //object called `stage` which will become the parent of all the other sprites
  //and groups.
  function makeStage() {
    // we use this: console.log('using makeStage()');
    var o = {};
    makeDisplayObject(o);

    //Flag this as being the `stage` object. There can
    //only be one stage
    o.stage = true;

    //Set the stage to the same height and width as the canvas
    //and position it at the top left corner
    o.width = ga.canvas.width;
    o.height = ga.canvas.height;
    o.x = 0;
    o.y = 0;

    //The stage has no parent
    o.parent = undefined;
    return o;
  }

  //### group
  //A `group` is a special kind of display object that doesn't have any
  //visible content. Instead, you can use it as a parent container to
  //group other sprites. Supply any number of
  //sprites to group as arguments, or don't supply any arguments if
  //you want to create an empty group. (You can always add sprites to
  //the group later using `addChild`).
  ga.group = function(spritesToGroup) {
    var o = {};

    //Make the group a display object.
    makeDisplayObject(o);

    //Add custom `addChild` and `removeChild` methods that calculate
    //the size of group based on its contents
    o.addChild = function(sprite) {
      if (sprite.parent) {
        sprite.parent.removeChild(sprite);
      }
      sprite.parent = o;
      o.children.push(sprite);
      o.calculateSize();
    };
    o.removeChild = function(sprite) {
      if (sprite.parent === o) {
        o.children.splice(o.children.indexOf(sprite), 1);
      } else {
        throw new Error(sprite + "is not a child of " + o);
      }
      o.calculateSize();
    };

    //Dynamically calculate the width and height of the sprite based
    //on the size and position of the children it contains
    /*
    o.calculateSize = function() {

      //Calculate the width based on the size of the largest child
      //that this sprite contains
      if (o.children.length > 0 && o.stage === false) {
        for(var i = 0; i < o.children.length - 1; i++) {
          var child = o.children[i];
          if (child.x + child.width > o.width) {
            o.width = child.x + child.width;
          }
          if (child.y + child.height > o.height) {
            o.height = child.y + child.height;
          }
        }
      }
    };
    */

    o.calculateSize = function() {
      //Calculate the width based on the size of the largest child
      //that this sprite contains
      if (o.children.length > 0) {

        //Some temporary private variables to help track the new
        //calculated width and height
        o._newWidth = 0;
        o._newHeight = 0;

        //Find the width and height of the child sprites furthest
        //from the top left corner of the group
        o.children.forEach(function(child) {

          //Find child sprites that combined x value and width
          //that's greater than the current value of `_newWidth`
          if (child.x + child.width > o._newWidth) {

            //The new width is a combination of the child's
            //x position and its width
            o._newWidth = child.x + child.width;
          }
          if (child.y + child.height > o._newHeight) {
            o._newHeight = child.y + child.height;
          }
        });

        //Apply the `_newWidth` and `_newHeight` to this sprite's width
        //and height
        o.width = o._newWidth;
        o.height = o._newHeight;
      }
    };

    //Add the group to the `stage`
    ga.stage.addChild(o);

    //Group any sprites that were passed to the group's arguments
    //(Important!: This bit of code needs to happen after adding the group to the stage)
    if (spritesToGroup) {
      var sprites = Array.prototype.slice.call(arguments);
      sprites.forEach(function(sprite) {
        o.addChild(sprite);
      });
    }

    //Return the group
    return o;
  };

  //### rectangle
  //`rectangle` creates and returns a basic rectangular shape.
  //arguments: width, height, fillColor, borderColor, widthOfBorder,
  //xPosition, yPosition.
  // ga.rectangle = function(width, height, fillStyle, strokeStyle, lineWidth, x, y) {
  //   console.log('using @ line...')
  //   var o = {};

  //   //Make this a display object.
  //   makeDisplayObject(o);

  //   //Add a mask property.
  //   o.mask = false;

  //   //Set the defaults.
  //   o.width = width || 32;
  //   o.height = height || 32;
  //   o.fillStyle = fillStyle || "red";
  //   o.strokeStyle = strokeStyle || "none";
  //   o.lineWidth = lineWidth || 0;
  //   o.x = x || 0;
  //   o.y = y || 0;

  //   //Add the sprite to the stage.
  //   ga.stage.addChild(o);

  //   //Add a `render` method that explains to the canvas how to draw
  //   //a rectangle.
  //   o.render = function(ctx) {
  //     ctx.strokeStyle = o.strokeStyle;
  //     ctx.lineWidth = o.lineWidth;
  //     ctx.fillStyle = o.fillStyle;
  //     ctx.beginPath();

  //     //Draw the rectangle around the context's center `0` point.
  //     ctx.rect(-o.width * o.pivotX, -o.height * o.pivotY,
  //       o.width,
  //       o.height
  //     );
  //     if (o.mask === true) {
  //       ctx.clip();
  //     } else {
  //       if (o.strokeStyle !== "none") ctx.stroke();
  //       if (o.fillStyle !== "none") ctx.fill();
  //     }
  //   };

  //   //Return the rectangle.
  //   return o;
  // };

  //### circle
  //`circle` returns a basic colored circle.
  //arguments: diameter, fillColor, outlineColor, borderColor,
  //xPosition, yPosition
  // ga.circle = function(diameter, fillStyle, strokeStyle, lineWidth, x, y) {
  //   console.log('using @ line...')
  //   var o = {};

  //   //Make this a display object.
  //   makeDisplayObject(o);

  //   //Add a mask property.
  //   o.mask = false;

  //   //Set the defaults.
  //   o.width = diameter || 32;
  //   o.height = diameter || 32;
  //   o.fillStyle = fillStyle || "red";
  //   o.strokeStyle = strokeStyle || "none";
  //   o.lineWidth = lineWidth || "none";
  //   o.x = x || 0;
  //   o.y = y || 0;

  //   //Add the sprite to the stage.
  //   ga.stage.addChild(o);

  //   //Add `diameter` and `radius` getters and setters.
  //   makeCircular(o);

  //   //Add a `render` method that explains to the canvas how to draw
  //   //a circle.
  //   o.render = function(ctx) {
  //     ctx.strokeStyle = o.strokeStyle;
  //     ctx.lineWidth = o.lineWidth;
  //     ctx.fillStyle = o.fillStyle;
  //     ctx.beginPath();
  //     ctx.arc(
  //       o.radius + (-o.diameter * o.pivotX),
  //       o.radius + (-o.diameter * o.pivotY),
  //       o.radius,
  //       0, 2 * Math.PI, false
  //     );
  //     if (o.mask === true) {
  //       ctx.clip();
  //     } else {
  //       if (o.strokeStyle !== "none") ctx.stroke();
  //       if (o.fillStyle !== "none") ctx.fill();
  //     }
  //   };

  //   //Return the circle sprite.
  //   return o;
  // };

  //### line
  //`line` creates and returns a line with a start and end points.
  //arguments: lineColor, lineWidth, startX, startY, endX, endY.
  ga.line = function(strokeStyle, lineWidth, ax, ay, bx, by) {
    var o = {};

    //Add basic properties to the sprite.
    makeDisplayObject(o);

    //Set the defaults.
    if (!ax && ax !== 0) ax = 0;
    if (!ay && ay !== 0) ay = 0;
    if (!bx && bx !== 0) bx = 32;
    if (!by && by !== 0) by = 32;
    o.ax = ax;
    o.ay = ay;
    o.bx = bx;
    o.by = by;
    o.strokeStyle = strokeStyle || "red";
    o.lineWidth = lineWidth || 1;

    //The `lineJoin` style.
    //Options are "round", "mitre" and "bevel".
    o.lineJoin = "round";

    //Add the sprite to the stage.
    ga.stage.addChild(o);

    //Add a `render` method that explains to the canvas how to draw
    //a line.
    o.render = function(ctx) {
      ctx.strokeStyle = o.strokeStyle;
      ctx.lineWidth = o.lineWidth;
      ctx.lineJoin = o.lineJoin;
      ctx.beginPath();
      ctx.moveTo(o.ax, o.ay);
      ctx.lineTo(o.bx, o.by);
      //ctx.closePath();
      if (o.strokeStyle !== "none") ctx.stroke();
      if (o.fillStyle !== "none") ctx.fill();
    };

    //Return the line.
    return o;
  };

  //### text
  //`text` creates and returns a single line of dynamic text.
  //arguments: stringContent, font, fontColor, xPosition, yPosition.
  ga.text = function(content, font, fillStyle, x, y) {
    // we use this: console.log('using ga.text');
    var o = {};

    //Add the basic sprite properties.
    makeDisplayObject(o);

    // //Set the defaults.
    o.content = content;
    o.font = font;
    o.fillStyle = fillStyle;
    // o.textBaseline = "center";


    //Measure the width and height of the text
    Object.defineProperties(o, {
      width: {
        get: function() {
          return ga.canvas.ctx.measureText(o.content).width;
        },
        enumerable: true,
        configurable: true
      },
      height: {
        get: function() {
          return ga.canvas.ctx.measureText("M").width;
        },
        enumerable: true,
        configurable: true
      }
    });

    //Add the sprite to the stage.
    ga.stage.addChild(o);

    //Set the object's x and y setters.
    o.x = x || 0;
    o.y = y || 0;

    //Add a `render` method that explains to the canvas how to draw text.
    o.render = function(ctx) {
      ctx.strokeStyle = o.strokeStyle;
      ctx.lineWidth = o.lineWidth;
      ctx.fillStyle = o.fillStyle;

      //Measure the width and height of the text
      if (o.width === 0) o.width = ctx.measureText(o.content).width;
      if (o.height === 0) o.height = ctx.measureText("M").width;
      ctx.translate(-o.width * o.pivotX, -o.height * o.pivotY)
      ctx.font = o.font;
      ctx.textBaseline = o.textBaseline;
      ctx.fillText(
        o.content,
        ga.canvas.width / 2,
        0
      );
    };

    //Return the text sprite.
    return o;
  };

  //### frame
  //The `frame` method returns and object that defines
  //in the position and size of a sub-image in a tileset. Use it if you
  //want to create a sprite from a sub-image inside an Image object.
  //arguments: sourceString, xPostionOfSubImage, yPositionOfSubImage,
  //widthOfSubImage, heightOfSubImage.
  ga.frame = function(source, x, y, width, height) {
    // we use this: console.log('using @ line...'), this);
    var o = {};
    o.image = source;
    o.x = x;
    o.y = y;
    o.width = width;
    o.height = height;
    return o;
  };

  //### frames
  //The `frames` function returns and object that defines
  //the position and size of many sub-images in a single tileset image.
  //arguments: sourceString, 2DArrayOfXandYPositions, widthOfSubImage,
  //heightOfSubImage.
  // ga.frames = function(source, arrayOfPositions, width, height) {
  //   console.log('using @ line...')
  //   var o = {};
  //   o.image = source;
  //   o.data = arrayOfPositions;
  //   o.width = width;
  //   o.height = height;
  //   return o;
  // };

  //### filmstrip
  //If you have a complex animation in a single image, you can use the
  //`filmstrip` method to automatically create an array of x,y
  //coordinates for each animation frame.
  //`filmstrip` arguments:
  //imageName, frameWidth, frameHeight, spacing
  //(The last `spacing` argument should be included if there's any
  //default spacing (padding) around tileset images.)
  // ga.filmstrip = function(imageName, frameWidth, frameHeight, spacing) {
  //   console.log('using @ line...')
  //   var image = ga.assets[imageName].source,
  //     positions = [],

  //     //Find out how many columns and rows there are in the image.
  //     columns = image.width / frameWidth,
  //     rows = image.height / frameHeight,

  //     //Find the total number of frames.
  //     numberOfFrames = columns * rows;

  //   for (var i = 0; i < numberOfFrames; i++) {

  //     //Find the correct row and column for each frame
  //     //and figure out its x and y position.
  //     var x, y;
  //     x = (i % columns) * frameWidth;
  //     y = Math.floor(i / columns) * frameHeight;

  //     //Compensate for any optional spacing (padding) around the tiles if
  //     //there is any. This bit of code accumulates the spacing offsets from the
  //     //left side of the tileset and adds them to the current tile's position.
  //     if (spacing && spacing > 0) {
  //       x += spacing + (spacing * i % columns);
  //       y += spacing + (spacing * Math.floor(i / columns));
  //     }

  //     //Add the x and y value of each frame to the `positions` array.
  //     positions.push([x, y]);
  //   }

  //   //Create and return the animation frames using the `frames` method.
  //   return ga.frames(imageName, positions, frameWidth, frameHeight);
  // };

  //### sprite
  //`sprite` creates and returns a sprite using a JavaScript Image object, a tileset
  //`frame`, a `filmstrip`, or a frame from a texture atlas (in
  //standard Texture Packer format).
  //arguments: sourceString.
  ga.sprite = function(source) {
    // we use this: console.log('using @ line...')
    var o = {};

    //If no `source` is provided, alert the user.
    if (source === undefined) throw new Error("Sprites require a source");

    //Make this a display object.
    makeDisplayObject(o);
    o.frames = [];
    o.loop = true;
    o._currentFrame = 0;

    //This next part is complicated. The code has to figure out what
    //the source is referring to, and then assign its properties
    //correctly to the sprite's properties. Read carefully!
    o.setTexture = function(source) {
      //If the source is just an ordinary string, use it to create the
      //sprite.
      if (!source.image) {
        //If the source isn't an array, then it must be a single image.
        if (!(source instanceof Array)) {
          //Is the string referring to a tileset frame from a Texture Packer JSON
          //file, or is it referring to a JavaScript Image object? Let's find out.

          //No, it's not an Image object. So it must be a tileset frame
          //from a texture atlas.

          //Use the texture atlas's properties to assign the sprite's
          //properties.
          o.tilesetFrame = ga.assets[source];
          o.source = o.tilesetFrame.source;
          o.sourceX = o.tilesetFrame.frame.x;
          o.sourceY = o.tilesetFrame.frame.y;
          o.width = o.tilesetFrame.frame.w;
          o.height = o.tilesetFrame.frame.h;
          o.sourceWidth = o.tilesetFrame.frame.w;
          o.sourceHeight = o.tilesetFrame.frame.h;

          //The source is an array. But what kind of array? Is it an array
          //Image objects or an array of texture atlas frame ids?
        } else {
          //The source is an array of frames on a texture atlas tileset.
          o.frames = source;
          o.source = ga.assets[source[0]].source;
          o.sourceX = ga.assets[source[0]].frame.x;
          o.sourceY = ga.assets[source[0]].frame.y;
          o.width = ga.assets[source[0]].frame.w;
          o.height = ga.assets[source[0]].frame.h;
          o.sourceWidth = ga.assets[source[0]].frame.w;
          o.sourceHeight = ga.assets[source[0]].frame.h;
        }
      }

      //If the source contains an `image` sub-property, this must
      //be a `frame` object that's defining the rectangular area of an inner sub-image
      //Use that sub-image to make the sprite. If it doesn't contain a
      //`data` property, then it must be a single frame.
      else if (source.image && !source.data) {
        //Throw an error if the source is not an image file.
        if (!(ga.assets[source.image].source instanceof Image)) {
          throw new Error(source.image + " is not an image file");
        }
        o.source = ga.assets[source.image].source;
        o.sourceX = source.x;
        o.sourceY = source.y;
        o.width = source.width;
        o.height = source.height;
        o.sourceWidth = source.width;
        o.sourceHeight = source.height;
      }

      //If the source contains an `image` sub-property
      //and a `data` property, then it contains multiple frames
      else if (source.image && source.data) {
        o.source = ga.assets[source.image].source;
        o.frames = source.data;

        //Set the sprite to the first frame
        o.sourceX = o.frames[0][0];
        o.sourceY = o.frames[0][1];
        o.width = source.width;
        o.height = source.height;
        o.sourceWidth = source.width;
        o.sourceHeight = source.height;
      }
    };

    //Use `setTexture` to change a sprite's source image
    //while the game is running
    o.setTexture(source);

    //Add a `gotoAndStop` method to go to a specific frame.
    o.gotoAndStop = function(frameNumber) {
      if (o.frames.length > 0) {

        //If each frame is an array, then the frames were made from an
        //ordinary Image object using the `frames` method.
        if (o.frames[0] instanceof Array) {
          o.sourceX = o.frames[frameNumber][0];
          o.sourceY = o.frames[frameNumber][1];
        }

        //If each frame isn't an array, and it has a sub-object called `frame`,
        //then the frame must be a texture atlas id name.
        //In that case, get the source position from the `frame` object.
        else if (ga.assets[o.frames[frameNumber]].frame) {
          o.source = ga.assets[o.frames[frameNumber]].source;
          o.sourceX = ga.assets[o.frames[frameNumber]].frame.x;
          o.sourceY = ga.assets[o.frames[frameNumber]].frame.y;
          o.sourceWidth = ga.assets[o.frames[frameNumber]].frame.w;
          o.sourceHeight = ga.assets[o.frames[frameNumber]].frame.h;
          o.width = ga.assets[o.frames[frameNumber]].frame.w;
          o.height = ga.assets[o.frames[frameNumber]].frame.h;
        }

        //Set the `_currentFrame` value.
        o._currentFrame = frameNumber;
      } else {
        throw new Error("Frame number " + frameNumber + "doesn't exist");
      }
    };

    //Set the sprite's getters
    o.x = 0;
    o.y = 0;

    //If the sprite has more than one frame, add a state player
    if (o.frames.length > 0) {
      ga.addStatePlayer(o);

      //Add a getter for the `_currentFrames` property.
      Object.defineProperty(o, "currentFrame", {
        get: function() {
          return o._currentFrame;
        },
        enumerable: false,
        configurable: false
      });
    }

    //Add the sprite to the stage
    ga.stage.addChild(o);

    //A `render` method that describes how to draw the sprite
    o.render = function(ctx) {
      ctx.drawImage(
        o.source,
        o.sourceX, o.sourceY,
        o.sourceWidth, o.sourceHeight, -o.width * o.pivotX, -o.height * o.pivotY,
        o.width, o.height
      );
    };

    //Return the sprite
    return o;
  };

  //### button
  //`button` creates and returns a button with `up`, `over` and `down`
  //states. You can also assign custom `press` and `release` methods.
  //arguments: sourceString (The same as an ordinary sprite.)
  // ga.button = function(source) {
  //   console.log('using @ line...')
  //   //First, make an ordinary sprite.
  //   var o = ga.sprite(source);

  //   //Assign this as a "button" subtype.
  //   o.subtype = "button";

  //   //Make it interactive (see ahead).
  //   makeInteractive(o);

  //   //Return it.
  //   return o;
  // };

  //### makeInteractive
  //The `makeInteractive` function lets you assign `press`, `release`, `over`, `tap`
  //and `out` actions to sprites.
  //Also tells you the pointer's state of interaction with the sprite.
  //`makeInteractive` is called on a sprite when a sprite's
  //`interactive` property is set to `true`.
  // function makeInteractive(o) {
  //   console.log('using @ line...')
  //   //The `press` and `release` methods. They're `undefined`
  //   //for now, but they'll be defined in the game program.
  //   o.press = o.press || undefined;
  //   o.release = o.release || undefined;
  //   o.over = o.over || undefined;
  //   o.out = o.out || undefined;
  //   o.tap = o.tap || undefined;

  //   //The `state` property tells you button's
  //   //current state. Set its initial state to "up".
  //   o.state = "up";

  //   //The `action` property tells you whether its being pressed or
  //   //released.
  //   o.action = "";

  //   //`pressed` is a Boolean that helps track whether or not
  //   //the button has been pressed down.
  //   o.pressed = false;

  //   //`enabled` is a Boolean which, if false, deactivates the button.
  //   o.enabled = true;

  //   //`hoverOver` is a Boolean which checkes whether the pointer
  //   //has hovered over the button.
  //   o.hoverOver = false;

  //   //Add the button into the global `buttons` array so that it
  //   //can be updated by the game engine.
  //   ga.buttons.push(o);

  //   //The `update` method will be called each frame inside
  //   //Ga's game loop.
  //   o.update = function(pointer, canvas) {

  //     //Only update the button if it's enabled.
  //     if (o.enabled) {

  //       //Figure out if the pointer is touching the button.
  //       var hit = ga.pointer.hitTestSprite(o);

  //       //1. Figure out the current state.
  //       if (pointer.isUp) {

  //         //Up state.
  //         o.state = "up";

  //         //Show the first frame, if this is a button.
  //         if (o.subtype === "button") o.show(0);
  //       }

  //       //If the pointer is touching the button, figure out
  //       //if the over or down state should be displayed.
  //       if (hit) {

  //         //Over state.
  //         o.state = "over";

  //         //Show the second frame if this sprite has
  //         //3 frames and it's button.
  //         if (o.frames && o.frames.length === 3 && o.subtype === "button") {
  //           o.show(1);
  //         }

  //         //Down state.
  //         if (pointer.isDown) {
  //           o.state = "down";

  //           //Show the third frame if this sprite is a button and it
  //           //has only three frames, or show the second frame if it
  //           //only has two frames.
  //           if (o.subtype === "button") {
  //             if (o.frames.length === 3) {
  //               o.show(2);
  //             } else {
  //               o.show(1);
  //             }
  //           }
  //         }
  //       }

  //       //Run the correct button action.
  //       //a. Run the `press` method if the button state is "down" and
  //       //the button hasn't already been pressed.
  //       if (o.state === "down") {
  //         if (!o.pressed) {
  //           if (o.press) o.press();
  //           o.pressed = true;
  //           o.action = "pressed";
  //         }
  //       }

  //       //b. Run the `release` method if the button state is "over" and
  //       //the button has been pressed.
  //       if (o.state === "over") {
  //         if (o.pressed) {
  //           if (o.release) o.release();
  //           o.pressed = false;
  //           o.action = "released";

  //           //If the pointer was tapped and the user assigned a `tap`
  //           //method, call the `tap` method
  //           if (ga.pointer.tapped && o.tap) o.tap();
  //         }

  //         //Run the `over` method if it has been assigned
  //         if (!o.hoverOver) {
  //           if (o.over) o.over();
  //           o.hoverOver = true;
  //         }
  //       }

  //       //c. Check whether the pointer has been released outside
  //       //the button's area. If the button state is "up" and it's
  //       //already been pressed, then run the `release` method.
  //       if (o.state === "up") {
  //         if (o.pressed) {
  //           if (o.release) o.release();
  //           o.pressed = false;
  //           o.action = "released";
  //         }

  //         //Run the `out` method if it has been assigned
  //         if (o.hoverOver) {
  //           if (o.out) o.out();
  //           o.hoverOver = false;
  //         }
  //       }
  //     }
  //   };
  // }

  //A convenience method that lets you access Images by their file names.
  ga.image = function(imageFileName) {
    return ga.assets[imageFileName];
  };

  //A convenience method that lets you access JSON files by their file names.
  // ga.json = function(jsonFileName) {
  //   return ga.assets[jsonFileName];
  // };

  //### addStatePlayer
  //`addStatePlayer` adds a state manager and keyframe animation player for
  //sprites with more than one frame. Its called automatically when
  //`sprite`s are created.
  // ga.addStatePlayer = function(sprite) {
  //   console.log('using @ line...')
  //   var frameCounter = 0,
  //     numberOfFrames = 0,
  //     startFrame = 0,
  //     endFrame = 0,
  //     timerInterval = undefined,
  //     playing = false;

  //   //The `show` function (to display static states.)
  //   function show(frameNumber) {

  //     //Reset any possible previous animations.
  //     reset();

  //     //Find the new state on the sprite.
  //     //If `frameNumber` is a number, use that number to go to the
  //     //correct frame.
  //     if (typeof frameNumber !== "string") {
  //       sprite.gotoAndStop(frameNumber);
  //     }

  //     //If `frameNumber` is string that describes a sprite's frame id,
  //     //then go to the index number that matches that id name.
  //     else {
  //       sprite.gotoAndStop(sprite.frames.indexOf(frameNumber));
  //     }
  //   }

  //   //The `play` function plays all the sprites frames.
  //   function play() {
  //     playSequence([0, sprite.frames.length - 1]);
  //   }

  //   //The `stop` function stops the animation at the current frame.
  //   function stop() {
  //     reset();
  //     sprite.gotoAndStop(sprite.currentFrame);
  //   }

  //   //The `playSequence` function, to play a sequence of frames.
  //   function playSequence(sequenceArray) {

  //     //Reset any possible previous animations.
  //     reset();

  //     //Figure out how many frames there are in the range.
  //     startFrame = sequenceArray[0];
  //     endFrame = sequenceArray[1];
  //     numberOfFrames = endFrame - startFrame;

  //     //Compensate for two edge cases:
  //     //1. if the `startFrame` happens to be `0`.
  //     if (startFrame === 0) {
  //       numberOfFrames += 1;
  //       frameCounter += 1;
  //     }

  //     //2. if only a two-frame sequence was provided.
  //     if (numberOfFrames === 1) {
  //       numberOfFrames = 2;
  //       frameCounter += 1;
  //     };

  //     //Calculate the frame rate. Set a default fps of 12.
  //     if (!sprite.fps) sprite.fps = 12;
  //     var frameRate = 1000 / sprite.fps;

  //     //Set the sprite to the starting frame.
  //     sprite.gotoAndStop(startFrame);

  //     //If the state isn't already playing, start it.
  //     if (!playing) {
  //       timerInterval = setInterval(advanceFrame.bind(this), frameRate);
  //       playing = true;
  //     }
  //   }

  //   //`advanceFrame` is called by `setInterval` to display the next frame
  //   //in the sequence based on the `frameRate`. When frame sequence
  //   //reaches the end, it will either stop it or loop it.
  //   function advanceFrame() {

  //     //Advance the frame if `frameCounter` is less than
  //     //the state's total frames.
  //     if (frameCounter < numberOfFrames) {

  //       //Advance the frame.
  //       sprite.gotoAndStop(sprite.currentFrame + 1);

  //       //Update the frame counter.
  //       frameCounter += 1;
  //     } else {

  //       //If we've reached the last frame and `loop`
  //       //is `true`, then start from the first frame again.
  //       if (sprite.loop) {
  //         sprite.gotoAndStop(startFrame);
  //         frameCounter = 1;
  //       }
  //     }
  //   }

  //   function reset() {

  //     //Reset `playing` to `false`, set the `frameCounter` to 0,
  //     //and clear the `timerInterval`.
  //     if (timerInterval !== undefined && playing === true) {
  //       playing = false;
  //       frameCounter = 0;
  //       startFrame = 0;
  //       endFrame = 0;
  //       numberOfFrames = 0;
  //       clearInterval(timerInterval);
  //     }
  //   }

  //   //Add the `show`, `play`, `playing`, `stop` and `playSequence` methods to the sprite.
  //   sprite.show = show;
  //   sprite.play = play;
  //   sprite.stop = stop;
  //   sprite.playing = playing;
  //   sprite.playSequence = playSequence;
  // };


  /*
  Rendering
  -------

  The render method that displays all the sprites on the canvas.
  Ga uses it inside the game loop to render the sprites like this:

      ga.render(canvasContext);

  */

  ga.render = function(canvas, lagOffset) {
    // we use this: console.log('using @ line...')
    //Get a reference to the context.
    var ctx = canvas.ctx;

    //Clear the canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Display the all the sprites.
    for (var i = 0; i < ga.stage.children.length; i++) {
      var sprite = ga.stage.children[i];

      //Only draw sprites if they're visible and inside the
      //area of the canvas.
      displaySprite(sprite);
    }

    function displaySprite(sprite) {
      if (
        sprite.name !== 'air' &&
        sprite.visible && sprite.gx < canvas.width + sprite.width && sprite.gx + sprite.width >= -sprite.width && sprite.gy < canvas.height + sprite.height && sprite.gy + sprite.height >= -sprite.height
      ) {
        //Save the current context state.
        ctx.save();

        //ctx.setTransform(1,0,0,1,0,0);
        //Calculate the sprites' interpolated render positions if
        //`ga.interpolate` is `true` (It is true by default)
        if (ga.interpolate) {
          if (sprite._previousX !== undefined) {
            sprite.renderX = (sprite.x - sprite._previousX) * lagOffset + sprite._previousX;
          } else {
            sprite.renderX = sprite.x;
          }
          if (sprite._previousY !== undefined) {
            sprite.renderY = (sprite.y - sprite._previousY) * lagOffset + sprite._previousY;
          } else {
            sprite.renderY = sprite.y;
          }
        } else {
          sprite.renderX = sprite.x;
          sprite.renderY = sprite.y;
        }

        //Draw the sprite
        ctx.translate(
          sprite.renderX + (sprite.width * sprite.pivotX),
          sprite.renderY + (sprite.height * sprite.pivotY)
        );
        /*
        var cos = Math.cos(sprite.rotation),
            sin = Math.sin(sprite.rotation),
            scaleX = sprite.scaleX,
            scaleY = sprite.scaleY,
            translateX = sprite.renderX + (sprite.width * sprite.pivotX),
            translateY = sprite.renderY + (sprite.height * sprite.pivotY);

        ctx.setTransform(
          scaleX + cos,
          sin, -sin,
          scaleY - cos,
          translateX,
          translateY
        );
        */
        //(scaleX+cos, skewX+sin, skewY-sin, scaleY-cos, translateX, translateY);

        //Set the alpha
        ctx.globalAlpha = sprite.alpha;

        //Rotate the sprite using its `rotation` value.
        ctx.rotate(sprite.rotation);

        //Scale the sprite using its `scaleX` and scaleY` properties.
        ctx.scale(sprite.scaleX, sprite.scaleY);

        //Add a shadow if the sprite's `shadow` property is `true`.
        if (sprite.shadow) {
          ctx.shadowColor = sprite.shadowColor;
          ctx.shadowOffsetX = sprite.shadowOffsetX;
          ctx.shadowOffsetY = sprite.shadowOffsetY;
          ctx.shadowBlur = sprite.shadowBlur;
        }

        //Add an optional blend mode
        if (sprite.blendMode) ctx.globalCompositeOperation = sprite.blendMode;

        //Use the sprite's custom `render` method to figure out how to
        //draw the sprite. This is only run if the sprite actually has
        //a `render` method. Most do, but `group` sprites don't and
        //neither does the `stage` object.
        if (sprite.render) sprite.render(ctx);

        //If the sprite contains child sprites in its
        //`children` array, display them by calling this very same
        //`displaySprite` function again.
        if (sprite.children && sprite.children.length > 0) {

          //Reset the context back to the parent sprite's top left corner
          ctx.translate(-sprite.width * sprite.pivotX, -sprite.height * sprite.pivotY);
          /*
        ctx.setTransform(
          -scaleX - cos,
          -sin, sin,
          -scaleY + cos,
          -translateX,
          -translateY
        );
        */
          for (var j = 0; j < sprite.children.length; j++) {

            //Find the sprite's child
            var child = sprite.children[j];

            //display the child
            displaySprite(child);
          }
        }

        //The context's original position will only be restored after
        //the child sprites have been rendered. This is why the children have
        //the same rotation and alpha as the parents.
        ctx.restore();
        //ctx.setTransform(1,0,0,1,0,0);
      }
    }
  }

  /*
  Chapter 4: Ga's helper objects and methods
  ------------------------------------------
  */

  //### asset
  //All the game engine's assets are stored in this object and it has
  //a `load` method that manages asset loading. You can load assets at
  //any time during the game by using the `asset.load` method.
  ga.assets = {

    //Properties to help track the assets being loaded.
    toLoad: 0,
    loaded: 0,

    //File extensions for different types of assets.
    imageExtensions: ["png"], //, "jpg", "gif", "webp"],
    // fontExtensions: ["ttf", "otf", "ttc", "woff"],
    // audioExtensions: ["mp3", "ogg", "wav", "webm"],
    // jsonExtensions: ["json"],

    //The callback function that should run when all assets have loaded.
    //Assign this when you load the fonts, like this: `assets.whenLoaded = makeSprites;`.
    whenLoaded: undefined,

    //The load method creates and loads all the assets. Use it like this:
    //`assets.load(["images/anyImage.png", "fonts/anyFont.otf"]);`.

    load: function(sources) {
      console.log("Loading assets...");

      //Get a reference to this asset object so we can
      //refer to it in the `forEach` loop ahead.
      var self = this;

      //Find the number of files that need to be loaded.
      self.toLoad = sources.length;
      sources.forEach(function(source) {

        //Find the file extension of the asset.
        var extension = source.split('.').pop();

        //#### Images
        //Load images that have file extensions that match
        //the `imageExtensions` array.
        if (self.imageExtensions.indexOf(extension) !== -1) {

          //Create a new image and add a loadHandler
          var image = new Image();
          image.addEventListener("load", function() {
            //Get the image file name.
            image.name = source;
            self[image.name] = {
              //If you just want the file name and the extension, you can
              //get it like this:
              //image.name = source.split("/").pop();
              //Assign the image as a property of the assets object so
              //we can access it like this: `assets["images/imageName.png"]`.
              source: image,
              frame: {
                x: 0,
                y: 0,
                w: image.width,
                h: image.height
              }
            };
            self.loadHandler();
          }, false);

          //Set the image's src property so we can start loading the image.
          image.src = source;
        }

        //#### Fonts
        //Load fonts that have file extensions that match the `fontExtensions` array.
        else if (self.fontExtensions.indexOf(extension) !== -1) {

          //Use the font's file name as the `fontFamily` name.
          var fontFamily = source.split("/").pop().split(".")[0];

          //Append an `@afont-face` style rule to the head of the HTML
          //document. It's kind of a hack, but until HTML5 has a
          //proper font loading API, it will do for now.
          var newStyle = document.createElement('style');
          var fontFace = "@font-face {font-family: '" + fontFamily + "'; src: url('" + source + "');}";
          newStyle.appendChild(document.createTextNode(fontFace));
          document.head.appendChild(newStyle);

          //Tell the loadHandler we're loading a font.
          self.loadHandler();
        }

        //#### Sounds
        //Load audio files that have file extensions that match
        //the `audioExtensions` array.
        else if (self.audioExtensions.indexOf(extension) !== -1) {
          //Create a sound sprite.
          //
          var soundSprite = ga.makeSound(source, self.loadHandler.bind(self));

          //Get the sound file name.
          soundSprite.name = source;

          //If you just want to extract the file name with the
          //extension, you can do it like this:
          //soundSprite.name = source.split("/").pop();
          //Assign the sound as a property of the assets object so
          //we can access it like this: `assets["sounds/sound.mp3"]`.
          self[soundSprite.name] = soundSprite;
        }

        //#### JSON
        //Load JSON files that have file extensions that match
        //the `jsonExtensions` array.
        else if (self.jsonExtensions.indexOf(extension) !== -1) {

          //Create a new `xhr` object and an object to store the file.
          var xhr = new XMLHttpRequest();
          var file = {};

          //Use xhr to load the JSON file.
          xhr.open("GET", source, true);
          xhr.addEventListener("readystatechange", function() {

            //Check to make sure the file has loaded properly.
            if (xhr.status === 200 && xhr.readyState === 4) {

              //Convert the JSON data file into an ordinary object.
              file = JSON.parse(xhr.responseText);

              //Get the file name.
              file.name = source;

              //Assign the file as a property of the assets object so
              //we can access it like this: `assets["file.json"]`.
              self[file.name] = file;

              //Texture Packer support.
              //If the file has a `frames` property then its in Texture
              //Packer format.
              if (file.frames) {

                //Create the tileset frames.
                self.createTilesetFrames(file, source);
              } else {

                //Alert the load handler that the file has loaded.
                self.loadHandler();
              }
            }
          });

          //Send the request to load the file.
          xhr.send();
        }

        //Display a message if a file type isn't recognized.
        else {
          console.log("File type not recognized: " + source);
        }
      });
    },

    //#### createTilesetFrames
    //`createTilesetFrames` parses the JSON file  texture atlas and loads the frames
    //into this `assets` object.
    // createTilesetFrames: function(json, source) {
    //   var self = this;

    //   //Get the image's file path.
    //   var baseUrl = source.replace(/[^\/]*$/, '');
    //   var image = new Image();
    //   image.addEventListener("load", loadImage, false);
    //   image.src = baseUrl + json.meta.image;

    //   function loadImage() {

    //     //Assign the image as a property of the `assets` object so
    //     //we can access it like this:
    //     //`assets["images/imageName.png"]`.
    //     self[baseUrl + json.meta.image] = {
    //       source: image,
    //       frame: {
    //         x: 0,
    //         y: 0,
    //         w: image.width,
    //         h: image.height
    //       }
    //     };

    //     //Loop through all the frames.
    //     Object.keys(json.frames).forEach(function(tilesetImage) {

    //       //console.log(json.frames[image].frame);
    //       //The `frame` object contains all the size and position
    //       //data.
    //       //Add the frame to the asset object so that we
    //       //can access it like this: `assets["frameName.png"]`.
    //       self[tilesetImage] = json.frames[tilesetImage];

    //       //Get a reference to the source so that it will be easy for
    //       //us to access it later.
    //       self[tilesetImage].source = image;
    //       //console.log(self[tilesetImage].source)
    //     });

    //     //Alert the load handler that the file has loaded.
    //     self.loadHandler();
    //   }
    // },

    //#### loadHandler
    //The `loadHandler` will be called each time an asset finishes loading.
    loadHandler: function() {
      var self = this;
      self.loaded += 1;
      console.log('Asset loaded:', self.loaded);

      //Check whether everything has loaded.
      if (self.toLoad === self.loaded) {

        //If it has, run the callback function that was assigned to the `whenLoaded` property

        //Reset `loaded` and `toLoaded` so we can load more assets
        //later if we want to.
        self.toLoad = 0;
        self.loaded = 0;
        self.whenLoaded();
      }
    }
  };

  /*
  ### keyboard
  The `keyboard` function creates `key` objects
  that listen for keyboard events. Create a new key object like
  this:

     var keyObject = g.keyboard(asciiKeyCodeNumber);

  Then assign `press` and `release` methods like this:

    keyObject.press = function() {
      //key object pressed
    };
    keyObject.release = function() {
      //key object released
    };

  Keyboard objects also have `isDown` and `isUp` Booleans that you can check.
  */

  function keyboard(keyCode) {
    // we use this: console.log('using keyboard');
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    //The `downHandler`
    key.downHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    );
    return key;
  }

  /*
  ### makeKeys
  `makeKeys` is called when Ga is initialized. It pre-defines the
  arrow keys and space bar so that you can use them right away in
  your games like this:

      g.key.leftArrow.press = function() {
        //left arrow pressed.
      };
      g.key.leftArrow.release = function() {
        //left arrow released.
      };

  The keyboard objects that `makeKeys` creates are:

      key.leftArrow
      key.upArrow
      key.rightArrow
      key.downArrow
      key.space

  */

  function makeKeys() {
    var o = {};
    //Assign the arrow keys and the space bar
    o.a = keyboard(65);
    o.d = keyboard(68);
    o.leftArrow = keyboard(37);
    o.upArrow = keyboard(38);
    o.rightArrow = keyboard(39);
    o.downArrow = keyboard(40);
    o.space = keyboard(32);
    return o;
  }

  //### byLayer
  //`byLayer` is an array sort method that's called when a sprite's
  //`layer` property is changed.
  // function byLayer(a, b) {
  //   console.log('testing12');
  //   //return a.layer - b.layer;
  //   if (a.layer < b.layer) {
  //     return -1;
  //   } else if (a.layer > b.layer) {
  //     return 1;
  //   } else {
  //     return 1;
  //   }
  // }

  //Make the `keyboard` and `makeDisplayObject` functions public.
  ga.keyboard = keyboard;
  ga.makeDisplayObject = makeDisplayObject;


/*CUSTOM******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
    // CONFIG
  ga.tileTypes = {
    air: 'air',
    floor: 'floor',
    ladder: 'ladder',
    door: 'door',
    battery: 'battery',
  }

  //#### getIndex
  //The `getIndex` helper method
  //converts a sprite's x and y position to an array index number.
  //It returns a single index value that tells you the map array
  //index number that the sprite is in
  ga.getSpriteIndex = function(sprite) {
    return ga.getIndex(sprite.x, sprite.y, 32, 32, 32);
  }

  ga.getIndex = function(x, y, tilewidth, tileheight, mapWidthInTiles) {
    var index = {};

    //Convert pixel coordinates to map index coordinates
    index.x = Math.floor(x / tilewidth);
    index.y = Math.floor(y / tileheight);

    //Return the index number
    return index.x + (index.y * mapWidthInTiles);
  };

  ga.getAdjacentTiles = function(index) {
    console.log('getting all tiles');
    return {
      c: ga.getAdjacentTile(index, 'c'),
      u: ga.getAdjacentTile(index, 'u'),
      r: ga.getAdjacentTile(index, 'r'),
      d: ga.getAdjacentTile(index, 'd'),
      l: ga.getAdjacentTile(index, 'l'),
      dl: ga.getAdjacentTile(index, 'dl'),
      dr: ga.getAdjacentTile(index, 'dr'),
    }
  }

  ga.getAdjacentTile = function(index, dir) {
    tileIndex = undefined;
    switch(dir) {
      case 'u':
        if(index < world.widthInTiles) {
          tileIndex = null;
        } else {
          tileIndex = index - 32;
        }
        break;
      case 'r':
        if((index + 1) % 32 === 0) {
          tileIndex = null;
        } else {
          tileIndex = index + 1;
        }
        break;
      case 'd':
        if(index >= world.widthInTiles * world.heightInTiles - world.widthInTiles) {
          tileIndex = null;
        } else {
          tileIndex = index + 32;
        }
        break;
      case 'l':
        if(index % 32 === 0) {
          tileIndex = null;
        } else {
          tileIndex = index - 1;
        }
        break;
      case 'dl':
        leftTile = ga.getAdjacentTile(index, 'l'); 
        downTile = ga.getAdjacentTile(index, 'd');
        tileIndex = leftTile ? downTile.index - 1 : null;
        break;
      case 'dr':
        rightTile = ga.getAdjacentTile(index, 'r');
        downTile = ga.getAdjacentTile(index, 'd');
        tileIndex = rightTile ? downTile.index + 1 : null;
        break;
      default:
        tileIndex = index;
        break;
    }
    // console.log('index', index, dir, tileIndex);
    type = world.tileTypes[world.objects[0].data[tileIndex] - 1];

    return {
      index: tileIndex,
      type: type ? type.name : undefined,
      isStable: type ? type.isStable : undefined,
    }
  }

  //### move
  //Move a sprite or an array of sprites by adding its
  //velocity to its position
  // ga.move = function(sprites) {
  //   if (sprites instanceof Array === false) {
  //     internal_move(sprites)
  //   } else {
  //     for (var i = 0; i < sprites.length; i++) {
  //       internal_move(sprites[i])
  //     }
  //   }
  // };

  // function internal_move(sprite) {
  // }

  //#### contain
  // ga.contain = function(s, bounds, bounce, extra){
  //   console.log('using @ line...')

  //   var x = bounds.x,
  //       y = bounds.y,
  //       width = bounds.width,
  //       height = bounds.height;

  //   //Set `bounce` to `false` by default
  //   bounce = bounce || false;

  //   //The `collision` object is used to store which
  //   //side of the containing rectangle the sprite hits
  //   var collision;

  //   //Left
  //   if (s.x < x) {

  //     //Bounce the sprite if `bounce` is true
  //     if (bounce) s.vx *= -1;

  //     //If the sprite has `mass`, let the mass
  //     //affect the sprite's velocity
  //     if(s.mass) s.vx /= s.mass;
  //     s.x = x;
  //     collision = "left";
  //   }

  //   //Top
  //   if (s.y < y) {
  //     if (bounce) s.vy *= -1;
  //     if(s.mass) s.vy /= s.mass;
  //     s.y = y;
  //     collision = "top";
  //   }

  //   //Right
  //   if (s.x + s.width > width) {
  //     if (bounce) s.vx *= -1;
  //     if(s.mass) s.vx /= s.mass;
  //     s.x = width - s.width;
  //     collision = "right";
  //   }

  //   //Bottom
  //   if (s.y + s.height > height) {
  //     if (bounce) s.vy *= -1;
  //     if(s.mass) s.vy /= s.mass;
  //     s.y = height - s.height;
  //     collision = "bottom";
  //   }

  //   //The `extra` function runs if there was a collision
  //   //and `extra` has been defined
  //   if (collision && extra) extra(collision);

  //   //Return the `collision` object
  //   return collision;
  // };

  /*
  #### getTile
  The `getTile` helper method
  converts a tile's index number into x/y screen
  coordinates, and capture's the tile's grid index (`gid`) number.
  It returns an object with `x`, `y`, `centerX`, `centerY`, `width`, `height`, `halfWidth`
  `halffHeight` and `gid` properties. (The `gid` number is the value that the tile has in the
  mapArray) This lets you use the returned object
  with the 2d geometric collision functions like `hitTestRectangle`
  or `rectangleCollision`

  The `world` object requires these properties:
  `x`, `y`, `tilewidth`, `tileheight` and `widthInTiles`
  */
  ga.getTile = function(index, mapArray, world) {
    var tile = {}
    tile.gid = mapArray[index];
    tile.width = world.tilewidth;
    tile.height = world.tileheight;
    tile.halfWidth = world.tilewidth / 2;
    tile.halfHeight = world.tileheight / 2;
    tile.x = ((index % world.widthInTiles) * world.tilewidth) + world.x;
    tile.y = ((Math.floor(index / world.widthInTiles)) * world.tileheight) + world.y;
    tile.gx = tile.x;
    tile.gy = tile.y;
    tile.centerX = tile.x + world.tilewidth / 2;
    tile.centery = tile.y + world.tileheight / 2;

    //Return the tile object
    return tile;
  };

  //### wait
  ga.wait = function(duration, callBack) {
    return setTimeout(callBack, duration);
  };


  //###`fadeOut`
  //Fade a sprite out, over a duration in frames.
  ga.fadeOut = function(sprite, frames) {
    if (frames === undefined) frames = 60;
    return ga.tweenProperty(
      sprite, "alpha", sprite.alpha, 0, frames, "sine"
    );
  }

  //###`fadeIn`
  //Fade a sprite in, over a duration in frames.
  ga.fadeIn = function(sprite, frames) {
    if (frames === undefined) frames = 60;
    return ga.tweenProperty(
      sprite, "alpha", sprite.alpha, 1, frames, "sine"
    );
  }

    //###`tweenProperty`
  //A low-level function that you can use to tween any sprite
  //property. It's used by all the higher-level tween functions,
  //but you can use it to create your own custom tween effects.

  ga.tweenProperty = function(
    sprite,                  //Sprite object
    property,                //String property
    startValue,              //Tween start value
    endValue,                //Tween end value
    totalFrames,             //Duration in frames
    type,                    //The easing type
    yoyo,                    //Yoyo?
    delayBeforeRepeat        //Delay in milliseconds before repeating
  ) {

    //Set defaults
    if (totalFrames === undefined) totalFrames = 60;
    if (type === undefined) type = "smoothstep";
    if (yoyo === undefined) yoyo = false;
    if (delayBeforeRepeat === undefined) delayBeforeRepeat = 0;

    //Create the tween object
    var o = {};

    //If the tween is a bounce type (a spline), set the
    //start and end magnitude values
    var typeArray = type.split(" ");
    if (typeArray[0] === "bounce") {
      o.startMagnitude = parseInt(typeArray[1]);
      o.endMagnitude = parseInt(typeArray[2]);
    }

    //Use `o.start` to make a new tween using the current
    //end point values
    o.start = function(startValue, endValue) {

      //Clone the start and end values so that any possible references to sprite
      //properties are converted to ordinary numbers 
      o.startValue = JSON.parse(JSON.stringify(startValue));
      o.endValue = JSON.parse(JSON.stringify(endValue));
      o.playing = true;
      o.totalFrames = totalFrames;
      o.frameCounter = 0;

      //Add the tween to the global `tweens` array. The `tweens` array is
      //updated on each frame
      ga.tweens.push(o);
    };

    //Call `o.start` to start the tween
    o.start(startValue, endValue);

    //The `update` method will be called on each frame by the game loop.
    //This is what makes the tween move
    o.update = function() {
      
      var time, curvedTime;

      if (o.playing) {

        //If the elapsed frames are less than the total frames,
        //use the tweening formulas to move the sprite
        if (o.frameCounter < o.totalFrames) {

          //Find the normalized value
          var normalizedTime = o.frameCounter / o.totalFrames;

          //Select the correct easing function from the 
          //`ease` object’s library of easing functions

          //If it's not a spline, use one of the ordinary easing functions
          if (typeArray[0] !== "bounce") {
            curvedTime = ease[type](normalizedTime);
          } 
          
          //If it's a spline, use the `spline` function and apply the
          //2 additional `type` array values as the spline's start and
          //end points
          else {
            curvedTime = ease.spline(normalizedTime, o.startMagnitude, 0, 1, o.endMagnitude);
          }

          //Interpolate the sprite's property based on the curve
          sprite[property] = (o.endValue * curvedTime) + (o.startValue * (1 - curvedTime));

          o.frameCounter += 1;
        }

        //When the tween has finished playing, run the end tasks
        else {
          o.end(); 
        }
      }
    };

    //The `end` method will be called when the tween is finished
    o.end = function() {

      //Set `playing` to `false`
      o.playing = false;

      //Call the tween's `onComplete` method, if it's been assigned
      if (o.onComplete) o.onComplete();

      //Remove the tween from the `tweens` array
      ga.tweens.splice(ga.tweens.indexOf(o), 1);

      //If the tween's `yoyo` property is `true`, create a new tween
      //using the same values, but use the current tween's `startValue`
      //as the next tween's `endValue` 
      if (yoyo) {
        ga.wait(delayBeforeRepeat, function() {
          o.start(o.endValue, o.startValue);
        });
      }
    };

    //Pause and play methods
    o.play = function() {o.playing = true;};
    o.pause = function() {o.playing = false;};
    
    //Return the tween object
    return o;
  }

  /*
  ###updateTweens
  `updateTweens` loops through all the sprites in `ga.particles`
  and runs their `updateParticles` functions.
  */

  ga.updateTweens = function() {
    
    //Update all the particles in the game.
    if (ga.tweens.length > 0) {
      for(var i = ga.tweens.length - 1; i >= 0; i--) {
        var tween = ga.tweens[i];
        if (tween) tween.update();
      }
    }
  }

  //Push `updateTweens` into the `ga.updateFunctions` array so that
  //it runs inside Ga's game loop. (See the `ga.update` method in the 
  //`ga.js` file to see how this works.
  ga.updateFunctions.push(ga.updateTweens);

  //###Easing functions
  //These are low-level functions that you won't use directly.
  //Instead, their used by the higher-level tweening functions.

  //Bezier curve
  ga.cubicBezier = function(t, a, b, c, d) {
    var t2 = t * t;
    var t3 = t2 * t;
    return a  
      + (-a * 3 + t * (3 * a - a * t)) * t
      + (3 * b + t * (-6 * b + b * 3 * t)) * t 
      + (c * 3 - c * 3 * t) * t2 + d * t3;
  }

  //The `ease` object. It stores all the easing functions
  var ease = {

    // //Linear
    // linear: function(x) {return x;},

    // //Smoothstep
    // smoothstep: function(x) {return x * x * (3 - 2 * x);},
    // smoothstepSquared: function(x) {return Math.pow((x * x * (3 - 2 * x)), 2);},
    // smoothstepCubed: function(x) {return Math.pow((x * x * (3 - 2 * x)), 3);},

    // //Acceleration
    // acceleration: function(x) {return x * x;},
    // accelerationCubed: function(x) {return Math.pow(x * x, 3);},

    // //Deceleration
    // deceleration: function(x) {return 1 - Math.pow(1 - x, 2);},
    // decelerationCubed: function(x) {return 1 - Math.pow(1 - x, 3);},

    //Sine
    sine: function(x) {return Math.sin(x * Math.PI / 2);},
    // sineSquared: function(x) {return Math.pow(Math.sin(x * Math.PI / 2), 2);},
    // sineCubed: function(x) {return Math.pow(Math.sin(x * Math.PI / 2), 2);},
    // inverseSine: function(x) {return 1 - Math.sin((1 - x) * Math.PI / 2);},
    // inverseSineSquared: function(x) {return 1 - Math.pow(Math.sin((1 - x) * Math.PI / 2), 2);},
    // inverseSineCubed: function(x) {return 1 - Math.pow(Math.sin((1 - x) * Math.PI / 2), 3);},

    //Spline
    spline: function(t, p0, p1, p2, p3) {
      return 0.5 * (
        (2 * p1) +
        (-p0 + p2) * t +
        (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t +
        (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t
      );
    }
  };

  /*
  ### makeTiledWorld
  */

  /*
  Chapter 6: Tiled editor importers
  ---------------------------------
  Ga lets you import JSON files created by the popular Tiled Editor game map and level editor.

  www.mapeditor.org

  Two functions called `makeTiledWorld` and `makeIsoTiledWorld` (for isometric maps, coming soon!) use this data to
  automatically build your game world for you.

  To prepare your Tiled Editor game world for use in Ga, give any significant thing a
  `name` property. Anything with a `name` property in Tiled Editor can
  be accessed in your code by its string name. Tiled Editor layers have a
  `name` property by default, and you can assign custom `name`
  properties to tiles and objects. Not everything needs a `name` property, just
  things that you want to specifically access in the world after its created.
  */

  ga.makeTiledWorld = function(tiledMap, tileset) {

    //Create a group called `world` to contain all the layers, sprites
    //and objects from the `tiledMap`. The `world` object is going to be
    //returned to the main game program
    tiledMap = JSON.parse(tiledMap); // ga.json(tiledMap);
    var world = ga.group();
    world.tileheight = tiledMap.tileheight;
    world.tilewidth = tiledMap.tilewidth;

    //Calculate the `width` and `height` of the world, in pixels
    world.width = tiledMap.width * tiledMap.tilewidth;
    world.height = tiledMap.height * tiledMap.tileheight;

    //Get a reference to the world's height and width in
    //tiles, in case you need to know this later (you will!)
    world.widthInTiles = tiledMap.width;
    world.heightInTiles = tiledMap.height;

    // Store tile names for ref
    world.tileTypes = tiledMap.tilesets[0].tileproperties;

    //Create an `objects` array to store references to any
    //named objects in the map. Named objects all have
    //a `name` property that was assigned in Tiled Editor
    world.objects = [];

    //The optional spacing (padding) around each tile
    //This is to account for spacing around tiles
    //that's commonly used with texture atlas tilesets. Set the
    //`spacing` property when you create a new map in Tiled Editor
    var spacing = tiledMap.tilesets[0].spacing;

    //Figure out how many columns there are on the tileset.
    //This is the width of the image, divided by the width
    //of each tile, plus any optional spacing thats around each tile
    var numberOfTilesetColumns =
      Math.floor(
        tiledMap.tilesets[0].imagewidth / (tiledMap.tilewidth + spacing)
      );

    //Loop through all the map layers
    tiledMap.layers.forEach(function(tiledLayer){

      //Make a group for this layer and copy
      //all of the layer properties onto it.
      var layerGroup = ga.group();

      Object.keys(tiledLayer).forEach(function(key) {
        //Add all the layer's properties to the group, except the
        //width and height (because the group will work those our for
        //itself based on its content).
        if (key !== "width" && key !== "height") {
          layerGroup[key] = tiledLayer[key];
        }
      });

      //Set the width and height of the layer to
      //the `world`'s width and height
      //layerGroup.width = world.width;
      //layerGroup.height = world.height;

      //Translate `opacity` to `alpha`
      layerGroup.alpha = tiledLayer.opacity;

      //Add the group to the `world`
      world.addChild(layerGroup);

      //Push the group into the world's `objects` array
      //So you can access it later
      world.objects.push(layerGroup);

      //Is this current layer a `tilelayer`?
      if (tiledLayer.type === "tilelayer") {

        //Loop through the `data` array of this layer
        tiledLayer.data.forEach(function(gid, index) {
          var tileSprite, texture, mapX, mapY, tilesetX, tilesetY,
              mapColumn, mapRow, tilesetColumn, tilesetRow;
          //If the grid id number (`gid`) isn't zero, create a sprite
          if (gid !== 0) {
            //Figure out the map column and row number that we're on, and then
            //calculate the grid cell's x and y pixel position.
            mapColumn = index % world.widthInTiles;
            mapRow = Math.floor(index / world.widthInTiles);
            mapX = mapColumn * world.tilewidth;
            mapY = mapRow * world.tileheight;

            //Figure out the column and row number that the tileset
            //image is on, and then use those values to calculate
            //the x and y pixel position of the image on the tileset
            tilesetColumn = ((gid - 1) % numberOfTilesetColumns);
            tilesetRow = Math.floor((gid - 1) / numberOfTilesetColumns);
            tilesetX = tilesetColumn * world.tilewidth;
            tilesetY = tilesetRow * world.tileheight;

            //Compensate for any optional spacing (padding) around the tiles if
            //there is any. This bit of code accumlates the spacing offsets from the
            //left side of the tileset and adds them to the current tile's position
            if (spacing > 0) {
              tilesetX
                += spacing
                + (spacing * ((gid - 1) % numberOfTilesetColumns));
              tilesetY
                += spacing
                + (spacing * Math.floor((gid - 1) / numberOfTilesetColumns));
            }

            //Use the above values to create the sprite's image from
            //the tileset image
            texture = ga.frame(
              tileset, tilesetX, tilesetY,
              world.tilewidth, world.tileheight
            );

            //I've dedcided that any tiles that have a `name` property are important
            //and should be accessible in the `world.objects` array.
            var tileproperties = tiledMap.tilesets[0].tileproperties,
                key = String(gid - 1);

            //If the JSON `tileproperties` object has a sub-object that
            //matches the current tile, and that sub-object has a `name` property,
            //then create a sprite and assign the tile properties onto
            //the sprite
            if (tileproperties[key] && tileproperties[key].name) {

              //Make a sprite
              tileSprite = ga.sprite(texture);

              //Copy all of the tile's properties onto the sprite
              //(This includes the `name` property)
              Object.keys(tileproperties[key]).forEach(function(property) {

                //console.log(tileproperties[key][property])
                tileSprite[property] = tileproperties[key][property];
              });

              //Push the sprite into the world's `objects` array
              //so that you can access it by `name` later
              world.objects.push(tileSprite);
            }

            //If the tile doesn't have a `name` property, just use it to
            //create an ordinary sprite (it will only need one texture)
            else {
              tileSprite = ga.sprite(texture);
            }

            //Position the sprite on the map
            tileSprite.x = mapX;
            tileSprite.y = mapY;

            //Make a record of the sprite's index number in the array
            //(We'll use this for collision detection later)
            tileSprite.index = index;

            //Make a record of the sprite's `gid` on the tileset.
            //This will also be useful for collision detection later
            tileSprite.gid = gid;

            //Add the sprite to the current layer group
            layerGroup.addChild(tileSprite);
          }
        });
      }

      // //Is this layer an `objectgroup`?
      // if (tiledLayer.type === "objectgroup") {
      //   tiledLayer.objects.forEach(function(object) {
      //     //We're just going to capture the object's properties
      //     //so that we can decide what to do with it later

      //     //Get a reference to the layer group the object is in
      //     object.group = layerGroup;

      //     //Because this is an object layer, it doesn't contain any
      //     //sprites, just data object. That means it won't be able to
      //     //calucalte its own height and width. To help it out, give
      //     //the `layerGroup` the same `width` and `height` as the `world`
      //     layerGroup.width = world.width;
      //     layerGroup.height = world.height;

      //     //Push the object into the world's `objects` array
      //     world.objects.push(object);
      //   });
      // }
    });

    //Search functions
    //`world.getObject` and `world.getObjects`  search for and return
    //any sprites or objects in the `world.objects` array.
    //Any object that has a `name` propery in
    //Tiled Editor will show up in a search.
    //`getObject` gives you a single object, `getObjects` gives you an array
    //of objects.
    //`getObject` returns the actual search function, so you
    //can use the following format to directly access a single object:
    //sprite.x = world.getObject("anySprite").x;
    //sprite.y = world.getObject("anySprite").y;

    world.getObject = function (objectName) {
      this.searchForObject = function() {
        var foundObject;
        world.objects.some(function(object) {
          if (object.name && object.name === objectName) {
            foundObject = object;
            return true;
          }
        });
        if (foundObject) {
          return foundObject;
        } else {
          console.log("There is no object with the property name: " + objectName);
        }
      };

      //Return the search function
      return this.searchForObject();
    };

    world.getObjects = function (namesOfObjects) {
      var objectNames = Array.prototype.slice.call(arguments);
      var foundObjects = [];
      world.objects.forEach(function(object) {
        if (object.name && objectNames.indexOf(object.name) !== -1) {
          foundObjects.push(object);
        }
      });
      if (foundObjects.length > 0) {
        return foundObjects;
      } else {
        console.log("I could not find those objects");
      }
      return foundObjects;
    };

    //That's it, we're done!
    //Finally, return the `world` object back to the game program
    return world;
  };

  /*
  ###shakingSprites

  An array to store all the shaking sprites in the game
  */

  ga.shakingSprites = [];

  /*
  ###updateShakingSprites
  
  `updateShakingSprites` loops through all the sprites in `ga.particles`
  and runs their `updateParticles` functions.
  */

  ga.updateShakingSprites = function() {
    
    //Update all the shaking sprites
    if (ga.shakingSprites.length > 0) {
      for(var i = ga.shakingSprites.length - 1; i >= 0; i--) {
        var shakingSprite = ga.shakingSprites[i];
        if (shakingSprite.updateShake) shakingSprite.updateShake();
      }
    }
  }

  //Push `updateShakingSprites` into the `ga.updateFunctions` array so that
  //it runs inside Ga's game loop. (See the `ga.update` method in the 
  //`ga.js` file to see how this works.
  ga.updateFunctions.push(ga.updateShakingSprites);

  /*
  shake
  -----

  Used to create a shaking effect, like a screen shake.
  `shake` arguments: sprite, magnitude, angularShake?
  Use it like this:

      g.shake(sprite, 0.05, true);

  If `angularShake?` (the 3rd argument) is `true`, the sprite will shake around
  its axis. The `magnitude` will be the maximum value, in
  radians, that it should shake. 
  
  If `angularShake?` is `false` the shake effect will happen on the x/y axis. 
  
      g.shake(sprite, 16, false);

  In that case the magnitude will be the maximum amount of 
  displacement, in pixels.
  */

  ga.shake = function(sprite, magnitude, angular, frameDur) {

    if (magnitude === undefined) magnitude = 16;
    if (angular === undefined) angular = false;

    //A counter to count the number of shakes
    var counter = 1;

    //The total number of shakes (there will be 1 shake per frame)
    var numberOfShakes = frameDur;

    //Capture the sprite's position and angle so you can
    //restore them after the shaking has finished
    var startX = sprite.x,
        startY = sprite.y,
        startAngle = sprite.rotation;

    //Divide the magnitude into 10 units so that you can 
    //reduce the amount of shake by 10 percent each frame
    var magnitudeUnit = magnitude / numberOfShakes;
    
    //The `randomInt` helper function
    var randomInt = function(min, max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    //Add the sprite to the `shakingSprites` array if it
    //isn't already there
    if(ga.shakingSprites.indexOf(sprite) === -1) {

      ga.shakingSprites.push(sprite);
      
      //Add an `updateShake` method to the sprite.
      //The `updateShake` method will be called each frame
      //in the game loop. The shake effect type can be either
      //up and down (x/y shaking) or angular (rotational shaking).
      sprite.updateShake = function(){
        if(angular) {
          angularShake();
        } else {
          upAndDownShake();
        }
      };
    }

    //The `upAndDownShake` function
    function upAndDownShake() {

      //Shake the sprite while the `counter` is less than 
      //the `numberOfShakes`
      if (counter < numberOfShakes) {

        //Reset the sprite's position at the start of each shake
        sprite.x = startX;
        sprite.y = startY;

        //Reduce the magnitude
        magnitude -= magnitudeUnit;

        //Randomly change the sprite's position
        sprite.x += randomInt(-magnitude, magnitude);
        sprite.y += randomInt(-magnitude, magnitude);

        //Add 1 to the counter
        counter += 1;
      }

      //When the shaking is finished, restore the sprite to its original 
      //position and remove it from the `shakingSprites` array
      if (counter >= numberOfShakes) {
        sprite.x = startX;
        sprite.y = startY;
        ga.shakingSprites.splice(ga.shakingSprites.indexOf(sprite), 1);
      }
    }
    
    //The `angularShake` function
    //First set the initial tilt angle to the right (+1) 
    var tiltAngle = 1;

    function angularShake() {
      if (counter < numberOfShakes) {

        //Reset the sprite's rotation
        sprite.rotation = startAngle;

        //Reduce the magnitude
        magnitude -= magnitudeUnit;

        //Rotate the sprite left or right, depending on the direction,
        //by an amount in radians that matches the magnitude
        sprite.rotation = magnitude * tiltAngle;
        counter += 1;

        //Reverse the tilt angle so that the sprite is tilted
        //in the opposite direction for the next shake
        tiltAngle *= -1;
      }

      //When the shaking is finished, reset the sprite's angle and
      //remove it from the `shakingSprites` array
      if (counter >= numberOfShakes) {
        sprite.rotation = startAngle;
        ga.shakingSprites.splice(ga.shakingSprites.indexOf(sprite), 1);
      }
    }
  };
 
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
/*******************************************************************************CUSTOM*/
  //Return `ga`.
  return ga;
};

//### ga
//The `ga` convenience function is just a nice quick way to create an
//instance of Ga without having the call `Ga.create()` It's really not
//necessary, but I like it!
window.ga = GA.create;
