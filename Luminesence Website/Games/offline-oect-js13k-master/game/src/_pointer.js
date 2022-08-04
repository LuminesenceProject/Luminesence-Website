  //Initialize the pointer.
  // ga.pointer = makePointer();

  //### makePointer
  //Makes a pointer object that unifies touch and mouse interactivity.
  //The pointer has `x` and `y` properties and `isUp`, `isDown` and
  //`tapped` Boolean states.
  // function makePointer() {
  //   console.log('using makePointer() - DELETE FOR DIST BUILD')
  //   var o = {};
  //   o._x = 0;
  //   o._y = 0;

  //   //Add `centerX` and `centerY` getters so that we
  //   //can use the pointer's coordinates with easing
  //   //and collision functions.
  //   Object.defineProperties(o, {
  //     x: {
  //       get: function() {
  //         return o._x / ga.scale;
  //       },
  //       enumerable: true,
  //       configurable: true
  //     },
  //     y: {
  //       get: function() {
  //         return o._y / ga.scale;
  //       },
  //       enumerable: true,
  //       configurable: true
  //     },
  //     centerX: {
  //       get: function() {
  //         return o.x;
  //       },
  //       enumerable: true,
  //       configurable: true
  //     },
  //     centerY: {
  //       get: function() {
  //         return o.y;
  //       },
  //       enumerable: true,
  //       configurable: true
  //     },
  //     //`position` returns an object with x and y properties that
  //     //contain the pointer's position.
  //     position: {
  //       get: function() {
  //         return {
  //           x: o.x,
  //           y: o.y
  //         };
  //       },
  //       enumerable: true,
  //       configurable: true
  //     }
  //   });

  //   //Booleans to track the pointer state.
  //   o.isDown = false;
  //   o.isUp = true;
  //   o.tapped = false;

  //   //Properties to help measure the time between up and down states.
  //   o.downTime = 0;
  //   o.elapsedTime = 0;

  //   //Optional, user-definable `press`, `release`, and `tap` methods
  //   o.press = undefined;
  //   o.release = undefined;
  //   o.tap = undefined;

  //   //A `dragSprite` property to help with drag and drop.
  //   o.dragSprite = null;

  //   //The drag offsets to help drag sprites.
  //   o.dragOffsetX = 0;
  //   o.dragOffsetY = 0;


  //   //The pointer's mouse `moveHandler`
  //   o.moveHandler = function(event) {

  //     //Find the pointer’s x and y position (for mouse).
  //     //Subtract the element's top and left offset from the browser window.
  //     o._x = (event.pageX - event.target.offsetLeft);
  //     o._y = (event.pageY - event.target.offsetTop);

  //     //Prevent the canvas from being selected.
  //     event.preventDefault();
  //   };

  //   //The pointer's `touchmoveHandler`.
  //   o.touchmoveHandler = function(event) {

  //     //Find the touch point's x and y position.
  //     o._x = (event.targetTouches[0].pageX - ga.canvas.offsetLeft);
  //     o._y = (event.targetTouches[0].pageY - ga.canvas.offsetTop);

  //     //Prevent the canvas from being selected.
  //     event.preventDefault();
  //   };

  //   //The pointer's `downHandler`.
  //   o.downHandler = function(event) {

  //     //Find the pointer’s x and y position (for mouse).
  //     o._x = (event.pageX - event.target.offsetLeft);
  //     o._y = (event.pageY - event.target.offsetTop);

  //     //Set the down states.
  //     o.isDown = true;
  //     o.isUp = false;
  //     o.tapped = false;

  //     //Capture the current time.
  //     o.downTime = Date.now();

  //     //Call the `press` method if it's been assigned by the user
  //     if (o.press) o.press();

  //     //Prevent the canvas from being selected.
  //     event.preventDefault();
  //   };

  //   //The pointer's `touchstartHandler`.
  //   o.touchstartHandler = function(event) {

  //     //Find the touch point's x and y position.
  //     o._x = event.targetTouches[0].pageX - ga.canvas.offsetLeft;
  //     o._y = event.targetTouches[0].pageY - ga.canvas.offsetTop;

  //     //Set the down states.
  //     o.isDown = true;
  //     o.isUp = false;
  //     o.tapped = false;

  //     //Capture the current time.
  //     o.downTime = Date.now();

  //     //Call the `press` method if it's been assigned by the user.
  //     if (o.press) o.press();

  //     //Prevent the canvas from being selected.
  //     event.preventDefault();
  //   };

  //   //The pointer's `upHandler`.
  //   o.upHandler = function(event) {

  //     //Figure out how much time the pointer has been down.
  //     o.elapsedTime = Math.abs(o.downTime - Date.now());

  //     //If it's less than 200 milliseconds, it must be a tap or click.
  //     if (o.elapsedTime <= 200) {
  //       o.tapped = true;

  //       //Call the `tapped` method if it's been assigned by the user.
  //       if (o.tap) o.tap();
  //     }
  //     o.isUp = true;
  //     o.isDown = false;

  //     //Call the `release` method if it's been assigned by the user.
  //     if (o.release) o.release();

  //     //Prevent the canvas from being selected.
  //     event.preventDefault();
  //   };

  //   //Bind the events to the handlers.
  //   //Mouse events.
  //   ga.canvas.addEventListener(
  //     "mousemove", o.moveHandler.bind(o), false
  //   );
  //   ga.canvas.addEventListener(
  //     "mousedown", o.downHandler.bind(o), false
  //   );

  //   //Add a `mouseup` event to the `window` object as well to
  //   //catch a mouse button release outside of the canvas area.
  //   window.addEventListener(
  //     "mouseup", o.upHandler.bind(o), false
  //   );

  //   //Touch events.
  //   ga.canvas.addEventListener(
  //     "touchmove", o.touchmoveHandler.bind(o), false
  //   );
  //   ga.canvas.addEventListener(
  //     "touchstart", o.touchstartHandler.bind(o), false
  //   );

  //   //Add a `touchend` event to the `window` object as well to
  //   //catch a mouse button release outside of the canvas area.
  //   window.addEventListener(
  //     "touchend", o.upHandler.bind(o), false
  //   );

  //   //Disable the default pan and zoom actions on the `canvas`.
  //   ga.canvas.style.touchAction = "none";

  //   //`hitTestSprite` figures out if the pointer is touching a sprite.
  //   o.hitTestSprite = function(sprite) {
  //     var hit = false;

  //     //Is the sprite rectangular?
  //     if (!sprite.circular) {

  //       //Get the position of the sprite's edges using global
  //       //coordinates.
  //       var left = sprite.gx, // * ga.scale,
  //         right = (sprite.gx + sprite.width), // * ga.scale,
  //         top = sprite.gy, // * ga.scale,
  //         bottom = (sprite.gy + sprite.height), // * ga.scale;

  //         //Find out if the point is intersecting the rectangle.
  //         hit = o.x > left && o.x < right && o.y > top && o.y < bottom;
  //     }

  //     //Is the sprite circular?
  //     else {

  //       //Find the distance between the point and the
  //       //center of the circle.
  //       var vx = o.x - ((sprite.gx + sprite.halfWidth)), // * ga.scale),
  //         vy = o.y - ((sprite.gy + sprite.halfHeight)), // * ga.scale),
  //         magnitude = Math.sqrt(vx * vx + vy * vy);

  //       //The point is intersecting the circle if the magnitude
  //       //(distance) is less than the circle's radius.
  //       hit = magnitude < sprite.radius;
  //     }
  //     return hit;
  //   };

  //   o.updateDragAndDrop = function() {
  //     if (o.isDown) {

  //       //Capture the co-ordinates at which the pointer was
  //       //pressed down and find out if it's touching a sprite.
  //       if (o.dragSprite === null) {

  //         //Loop through the draggable sprites in reverse to start searching at the bottom of the stack.
  //         for (var i = ga.draggableSprites.length - 1; i > -1; i--) {
  //           var sprite = ga.draggableSprites[i];

  //           //Check for a collision with the pointer using `hitTestPoint`.
  //           if (sprite.draggable && o.hitTestSprite(sprite)) {

  //             //Calculate the difference between the pointer's
  //             //position and the sprite's position.
  //             o.dragOffsetX = o.x - sprite.gx;
  //             o.dragOffsetY = o.y - sprite.gy;

  //             //Set the sprite as the pointer's `dragSprite` property.
  //             o.dragSprite = sprite;

  //             //The next two lines re-order the `sprites` array so that the
  //             //selected sprite is displayed above all the others.
  //             //First, splice the sprite out of its current position in
  //             //its parent's `children` array.
  //             var children = sprite.parent.children;
  //             children.splice(children.indexOf(sprite), 1);

  //             //Next, push the `dragSprite` to the end of its `children` array so that it's
  //             //displayed last, above all the other sprites.
  //             children.push(sprite);

  //             //Reorganize the `draggableSpites` array in the same way
  //             ga.draggableSprites.splice(ga.draggableSprites.indexOf(sprite), 1);
  //             ga.draggableSprites.push(sprite);
  //             break;
  //           }
  //         }
  //       } else {

  //         //If the pointer is down and it has a `dragSprite`, make the sprite follow the pointer's
  //         //position, with the calculated offset.
  //         o.dragSprite.x = o.x - o.dragOffsetX;
  //         o.dragSprite.y = o.y - o.dragOffsetY;
  //       }
  //     }

  //     //If the pointer is up, drop the `dragSprite` by setting it to `null`.
  //     if (o.isUp) {
  //       o.dragSprite = null;
  //     }

  //     //Change the mouse arrow pointer to a hand if it's over a
  //     //sprite.
  //     ga.draggableSprites.some(function(sprite) {
  //       if (sprite.draggable && o.hitTestSprite(sprite)) {
  //         ga.canvas.style.cursor = "pointer";
  //         return true;
  //       } else {
  //         ga.canvas.style.cursor = "auto";
  //         return false;
  //       }
  //     });
  //   }

  //   //Return the pointer.
  //   return o;
  // }
  //### END makePointer