var worldJson = '{"height":24,"infinite":false,"layers":[{"data":[1,1,1,1,1,1,1,1,1,1,1,1,7,7,7,7,7,7,7,1,1,1,1,1,1,1,1,1,1,1,1,1,7,7,1,1,1,1,1,1,1,1,3,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,3,2,2,3,2,2,2,2,2,2,2,3,2,1,1,1,1,1,1,1,3,2,7,1,1,1,1,1,1,1,7,2,3,1,1,3,1,1,1,1,1,1,1,3,2,7,7,7,7,7,7,7,3,2,7,1,1,1,1,1,1,1,7,2,3,1,7,3,1,1,1,7,7,7,7,3,2,2,2,2,2,2,2,2,2,2,7,1,1,1,1,1,1,1,7,2,3,3,2,2,1,1,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7,1,1,1,1,1,1,1,7,2,3,3,1,1,1,1,3,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,7,1,1,1,1,1,1,1,7,2,3,3,7,1,1,1,3,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,7,1,1,1,1,1,1,1,7,2,3,2,2,3,1,1,3,7,7,7,7,7,2,7,7,7,7,7,7,7,7,2,1,1,7,1,7,1,7,1,1,2,3,1,1,3,1,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,1,7,3,1,3,1,1,1,1,1,1,1,1,1,1,7,7,7,7,7,1,1,1,1,1,1,1,1,1,1,7,3,3,2,2,1,3,7,7,1,7,7,1,1,1,1,3,2,2,2,2,2,1,1,1,1,2,2,2,2,2,2,7,3,3,1,1,7,2,2,2,3,2,2,2,7,7,7,3,1,1,7,7,7,7,7,1,1,2,2,2,2,2,2,7,3,3,7,1,7,7,7,7,3,7,7,7,7,7,7,3,1,3,2,2,2,2,2,1,1,2,2,7,7,7,2,7,3,2,2,3,7,2,2,2,3,2,2,2,7,7,7,3,1,3,1,1,7,7,7,7,7,1,2,2,7,7,2,7,3,1,1,3,7,2,7,2,3,2,7,2,7,7,7,3,1,3,1,3,2,2,2,2,2,1,1,2,2,7,2,7,3,1,7,3,7,2,2,2,3,2,2,2,7,7,7,3,1,3,1,3,1,1,7,7,7,7,7,1,2,2,2,7,3,3,2,2,7,1,1,1,3,1,1,1,7,7,7,3,1,3,1,3,1,3,2,2,2,2,2,1,1,1,1,7,3,3,1,1,7,2,2,2,3,2,2,2,7,7,7,3,1,3,1,3,1,3,1,1,7,7,7,7,7,1,1,7,3,3,7,1,7,2,7,2,3,2,7,2,7,7,7,3,1,3,1,3,1,3,1,3,2,2,2,2,2,1,1,7,3,2,2,3,7,2,7,2,3,2,7,2,7,7,7,3,1,3,1,3,1,3,1,3,1,1,7,7,7,7,7,7,3,1,1,3,7,2,2,2,3,2,2,2,7,7,7,3,1,3,1,3,1,3,1,3,1,3,2,2,2,2,2,7,3,4,1,3,1,1,1,1,3,1,1,1,1,1,1,3,1,3,1,3,1,3,1,3,1,3,1,1,1,1,1,7,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],"height":24,"name":"level","opacity":1,"type":"tilelayer","visible":true,"width":32,"x":0,"y":0}],"nextobjectid":10,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.1.6","tileheight":32,"tilesets":[{"columns":7,"firstgid":1,"image":"../../assets/tileset.png","imageheight":32,"imagewidth":224,"margin":0,"name":"js13k","spacing":0,"tilecount":7,"tileheight":32,"tileproperties":{"0":{"isStable":false,"name":"air"},"1":{"isStable":true,"name":"floor"},"2":{"isStable":true,"name":"ladder"},"3":{"isStable":false,"name":"door"},"4":{"isStable":false,"name":"player"},"5":{"isStable":false,"name":"enemy"},"6":{"isStable":false,"name":"battery"}},"tilepropertytypes":{"0":{"isStable":"bool","name":"string"},"1":{"isStable":"bool","name":"string"},"2":{"isStable":"bool","name":"string"},"3":{"isStable":"bool","name":"string"},"4":{"isStable":"bool","name":"string"},"5":{"isStable":"bool","name":"string"},"6":{"isStable":"bool","name":"string"}},"tilewidth":32}],"tilewidth":32,"type":"map","version":1,"width":32}';
//All of your game code will go here
 var g = ga(
  1024, 768, setup,
  [
    'tileset.png',
  ]
);

document.getElementById('restart').addEventListener('click', ()=>{location.reload()});
/***********************************************************************************
General TODO List:

-- Implement level-end mechanic (direction UP @ door)

-- Add enemies

-- Add sounds

***********************************************************************************/

var config = {
  playerMoveSpeed: 150,
  enemyMoveSpeed: 250,
  blockRespawnSpeed: 3300,
  pathUpdateFrequency: 500,
  enemyUnstuckSpeed: undefined, //see below
  allowFallingKills: false,
  difficulties: {
    playground: 'playground',
    easy: 'easy',
    normal: 'normal',
    hard: 'hard',
  },
  difficulty: undefined,
}

function updateDifficulty(diff) {
  if(diff === config.difficulties.normal) {
    config.difficulty = config.difficulties.normal;
    config.allowFallingKills = false;
    config.enemyMoveSpeed = 250;
    config.enemyUnstuckSpeed = config.blockRespawnSpeed / 2.5;
  }
  if(diff === config.difficulties.hard) {
    config.difficulty = config.difficulties.hard;
    config.allowFallingKills = true;
    config.enemyMoveSpeed = 200;
    config.enemyUnstuckSpeed = config.blockRespawnSpeed / 2.5;
  }
  if(diff === config.difficulties.easy) {
    config.difficulty = config.difficulties.easy;
    config.allowFallingKills = false;
    config.enemyMoveSpeed = 300;
    config.enemyUnstuckSpeed = config.blockRespawnSpeed / 2;
  }
  if(diff === config.difficulties.playground) {
    config.difficulty = config.difficulties.playground;
    config.allowFallingKills = false;
    config.enemyMoveSpeed = 250;
    config.enemyUnstuckSpeed = config.blockRespawnSpeed / 2.5;
  }
  console.log('Updated to', diff);
}
updateDifficulty(config.difficulties.normal);

// Remove batteries for easy mode
// tile, number, offset
// This isn't really a sustainable method, but will work for the initial game version.
//Start the Ga engine
g.start();
//Declare your global variables (global to this game)
var player, treasure, enemies, exit, exits,
    message, gameScene, gameOverScene, sound, 
    introMessage1, introMessage2, titleMessageSub1, 
    titleMessageSub2, titleMessageSub3, titleMessageMain,
    floors, ladders, batteries, skipQuake, titleMessageSub4;
destroyedBlocks = {
  queue: [],
  hash: {},
}

const holesWithEnemies = [];
const batteryHash = {};
const exitHash = {};
const closingBlocks = [];
let totalBatteries = 0;
let collectedBatteries = 0;
enemies = [];

function rB(t, n, o) {
  while(n) {
    n--;
    batteryHash[t - (n * o)].visible = false;
    collectedBatteries++;
  }
}

// Create and render player
function makePlayer(sX, sY) {
  let player = g.sprite({image: "tileset.png", x: 128, y: 0, width: 32, height: 32})
  player.spawnX = sX;
  player.spawnY = sY;
  player.x = player.spawnX;
  player.y = player.spawnY;
  player.dead = false;
  player.won = false;
  player.hasStarted = false;
  player.landingTile = undefined;
  player.lastMove = Date.now();
  player.movement = {
    falling: false,
    moving: false,
    direction: directions.still,
  }
  player.freshSpawn = true;
  player.currentTile = g.getSpriteIndex(player);
  return player;
}

function makeEnemy(sX, sY, id) {
  let enemy = g.sprite({image: "tileset.png", x: 160, y: 0, width: 32, height: 32})
  enemy.spawnX = sX;
  enemy.spawnY = sY;
  enemy.x = enemy.spawnX;
  enemy.y = enemy.spawnY;
  enemy.id = id;
  enemy.movement = {
    falling: false,
    moving: false,
    stuck: false,
    stuckAt: undefined,
    direction: directions.still,
  }
  enemy.allowMoveAgain = function() {
    enemy.movement.moving = false;
  }
  enemy.makeStuck = function(blockRef) {
    this.movement.moving = false;
    this.movement.falling = false;
    this.movement.stuck = true;
    this.inHoleRef = blockRef;
    this.movement.stuckAt = Date.now();
  }
  enemy.unStick = function() {
    this.movement.stuck = false;
    this.inHoleRef = undefined;
    this.movement.stuckAt = undefined;
    this.climbingOut = true;
  }
  enemy.climbingOut = false;
  enemy.currentTile = g.getSpriteIndex(enemy);
  enemy.dead = false;
  enemy.freshSpawn = true;
  enemy.inHoleRef = undefined;
  enemy.needsPath = true;
  enemy.pathData = {
    path: null,
    updated: null,
    distance: null,
  }
  return enemy;
}

function makeEnemies() {
  enemies.push(makeEnemy(672, 256, 1));
  enemies.push(makeEnemy(0, 128, 2));
  enemies.push(makeEnemy(320, 352, 3));
  enemies.push(makeEnemy(288, 32, 4));
  enemies.push(makeEnemy(928, 704, 5));

  enemies.forEach(enemy => {
    gameScene.addChild(enemy);
  })
}

function lose() {
  gameScene.visible = false;
  gameOverScene.visible = true;
  titleScreen.visible = false
  endMessage.content = "Oh no! You're part of the building, now.";
  endMessage.y = g.canvas.height / 2 - 35;
}

function win() {
  gameScene.visible = false;
  titleScreen.visible = false
  gameOverScene.visible = true;
  endMessage.content = "You made it, nice work! We'll be back online in no time!";
  endMessage.y = g.canvas.height / 2 - 35;
}

function title() {
  titleScreen.visible = true;
  gameScene.visible = false;
  gameOverScene.visible = false;
  introScene.visible = false;
}

function intro() {
  gameScene.visible = false;
  titleScreen.visible = false;
  gameOverScene.visible = false;
  introScene.visible = true;
}

//The `setup` function will run only once.
//Use it for initialization tasks
function setup() {

  class Sound {
    constructor(context) {
      this.ctx = context;
    }

    init() {
      this.osc = this.ctx.createOscillator();
      this.gainNode = this.ctx.createGain();

      this.osc.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);
      this.osc.type = 'sine';
    }

    play(value, time) {
      this.init();

      this.osc.frequency.value = value;
      this.gainNode.gain.setValueAtTime(.5, this.ctx.currentTime);
              
      this.osc.start(time);
      this.stop(time);

    }

    stop(time) {
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + .25);
      this.osc.stop(time + .25);
    }

    battery() {
      this.play(8000, this.ctx.currentTime);
    }

    move() {
      this.play(5, this.ctx.currentTime);
      this.play(5, this.ctx.currentTime);
      this.play(5, this.ctx.currentTime);
    }

    blast() {
      this.play(50, this.ctx.currentTime);
      this.play(99, this.ctx.currentTime + .05);
    }

    doorOpen() {
      this.play(261.63, this.ctx.currentTime + .25);
      this.play(329.63, this.ctx.currentTime + .35);
    }

    win() {
      this.play(261.63, this.ctx.currentTime + .25);
      this.play(329.63, this.ctx.currentTime + .35);
      this.play(392.00, this.ctx.currentTime + .45);
      this.play(523.25, this.ctx.currentTime + .55);
    }

    lose() {
      this.play(261.63, this.ctx.currentTime + .25);
      this.play(246.94, this.ctx.currentTime + .35);
      this.play(233.08, this.ctx.currentTime + .45);
    }
  }
  let ctx = new (window.AudioContext || window.webkitAudioContext)();
  sound = new Sound(ctx);

  //Set the canvas border and background color
  g.canvas.style.border = "none";
  g.backgroundColor = "black";

  //Add some text for the game over message
  endMessage = g.text("Placeholder Text", "32px Helvetica", "#15e815", 0, 0);
  //Create a `gameOverScene` group and add the message sprite to it
  gameOverScene = g.group(endMessage);
  //Make the `gameOverScene` invisible for now
  gameOverScene.visible = false;

  //Add some text for the game over message
  introMessage1 = g.text(
    "Sir! That earthquake knocked the building offline! The bio-restraint has failed...", 
    "25px Helvetica", "#15e815", 0, 0);
  introMessage1.y = 200;
  introMessage2 = g.text(
    "Electronics are dead, batteries scattered, and the security-organics are haywire!",
    "25px Helvetica", "#15e815", 0, 0);
  introMessage2.y = 250;
  introMessage3 = g.text(
    "The door cycle will drain the reserve. Go retrive the batteries so we can fix this!",
    "25px Helvetica", "#15e815", 0, 0);
  introMessage3.y = 300;
  introMessage4 = g.text(
    "You're the best Organic Electro-Chemical Technician we've got, be safe in there.",
    "25px Helvetica", "#15e815", 0, 0);
  introMessage4.y = 350;
  //Create a `gameOverScene` group and add the message sprite to it
  introScene = g.group(introMessage1, introMessage2, introMessage3, introMessage4);
  //Make the `gameOverScene` invisible for now
  introScene.visible = false;

  //Add some text for the game over message
  titleMessageMain = g.text("- OFFLINE: O.E.C.T. -", "64px Courier", "#15e815", 0, 0);
  titleMessageSub1 = g.text("By Ben Fox.", "32px Courier", "#15e815", 0, 0);
  titleMessageSub2 = g.text("[ SPACE ] to page/pause.", "32px Courier", "#15e815", 0, 0);
  titleMessageSub3 = g.text("[ A/D ] to blast the floor. [ ARROWS ] to move.", "32px Courier", "#15e815", 0, 0);
  titleMessageSub4 = g.text(`[ D ] -> Difficulty: ${config.difficulty.toUpperCase()}`, "24px Courier", "#0098ff", 0, 0);
  titleMessageMain.y = 275;
  titleMessageSub1.y = 360;
  titleMessageSub2.y = 410;
  titleMessageSub3.y = 460;
  titleMessageSub4.y = 510;
  //Create a `gameOverScene` group and add the message sprite to it
  titleScreen = g.group(titleMessageMain, titleMessageSub1, titleMessageSub2, titleMessageSub3, titleMessageSub4);
  //Make the `gameOverScene` invisible for now
  titleScreen.visible = false;

  world = g.makeTiledWorld(worldJson, 'tileset.png');

  // DEV ONLY
  // world.objects[0].data.filter((el, idx) => {
  //   if(el===0)
  //     console.log(`WARNING: INDEX ${idx} HAS NO TILE`);
  //   return el === 0;
  // });

  //Create the `gameScene` group
  gameScene = g.group();

  // Create reference to level tiles
  exits = world.getObjects(g.tileTypes.door);
  // airs = world.getObjects(g.tileTypes.air);
  floors = world.getObjects(g.tileTypes.floor);
  ladders = world.getObjects(g.tileTypes.ladder);
  batteries = world.getObjects(g.tileTypes.battery);

  // Render level tiles
  exits.forEach(exit => {
    gameScene.addChild(exit);
    exit.canUse = false;
    exit.alpha = .25;
    exitHash[exit.index] = exit;
  })
  floors.forEach(floor => {
    gameScene.addChild(floor);
  })
  batteries.forEach(battery => {
    gameScene.addChild(battery);
    batteryHash[battery.index] = battery;
  })
  totalBatteries = Object.keys(batteryHash).length;
  // airs.forEach(air => {
  //   gameScene.addChild(air);
  // })
  ladders.forEach(ladder => {
    gameScene.addChild(ladder);
  })

  // pointer = g.pointer;

  // pointer.press = function() {
  //   const index = g.getIndex(pointer.centerX, pointer.centerY, 32, 32, 32);
  //   const currentCoords = g.getTile(index, world.objects[0].data, world);
  //   console.log(index, currentCoords.x, currentCoords.y);
  // }

  //Left arrow key `press` method
  directions = {
    up: 'u',
    down: 'd',
    left: 'l',
    right: 'r',
    current: 'c',
    still: 'still',
  }

  // movement = {
  //   falling: false,
  //   moving: false,
  //   direction: directions.still,
  // }

  // -> test enclosed spawn
  // player = makePlayer(672, 256)
  // player = makePlayer(288, 640);
  player = makePlayer(32, 704);
  gameScene.addChild(player);

  // test enemy:
  // enemies.push(makeEnemy(416, 704, 1));

/******************* GRAPHING AND dijkstra ************************/
  levelGraph = makeLevelGraph();
  
  dijkstra2 = new Graph(levelGraph);

  function makeLevelGraph() {
    const graph = {};

    // There should be 48 tiles in the graph
    // object[n].index is the unique ID for this tile.
    const objects = world.objects;
    for(let i = 0, len = objects.length; i < objects.length; i++) {
      let co = objects[i]
      if(co.name !== 'level') {
        if(1===1) { // co.name !== g.tileTypes.floor) {
          // Took this out to improve pathing, let enemies use open air
          // ruleOut = {current: g.getAdjacentTile(co.index, 'c'), below: g.getAdjacentTile(co.index, 'd')}
          // if(ruleOut.current.type !== g.tileTypes.ladder && !ruleOut.below.isStable) {
          //   // skip
          // } else {
            graph[co.index] = {};
            // These should all be tiles which are walkable.
            adjTiles = g.getAdjacentTiles(co.index);
            if(adjTiles.d.isStable) {
              if(canMoveFromTo(player, adjTiles.c, adjTiles.u)) {
                graph[co.index][adjTiles.u.index] = 1;
              }
              if(canMoveFromTo(player, adjTiles.c, adjTiles.d)) {
                graph[co.index][adjTiles.d.index] = 1;
              }
              if(canMoveFromTo(player, adjTiles.c, adjTiles.l)) {
                graph[co.index][adjTiles.l.index] = 1;
              }
              if(canMoveFromTo(player, adjTiles.c, adjTiles.r)) {
                graph[co.index][adjTiles.r.index] = 1;
              }
            } else if (!adjTiles.d.isStable) {
              graph[co.index][adjTiles.d.index] = 1;
            }
          // }
        }
      }
    }

    return graph;
  }
/******************* GRAPHING AND dijkstra ************************/

/******************* MESSAGING AND KEYS ************************/
  //You can also do it the long way, like this:
  g.key.space.press = function() {
    if (g.state === title) {
      g.shake(titleScreen, 16, false, 120);
      if(!skipQuake) {
        skipQuake = g.wait(2000, () => {
          g.state = intro;
        });
      } else {
        clearTimeout(skipQuake);
        g.state = intro;
      }
    } else if (g.state === intro) {
      if(skipQuake) { skipQuake = undefined }
      if(config.difficulty !== config.difficulties.playground) {
        enemies.push(makeEnemy(672, 256, 1));
        enemies.push(makeEnemy(0, 128, 2));
        enemies.push(makeEnemy(320, 352, 3));
        enemies.push(makeEnemy(288, 32, 4));
        enemies.push(makeEnemy(928, 704, 5));

        enemies.forEach(enemy => {
          gameScene.addChild(enemy);
        })
      }
      if(config.difficulty === config.difficulties.easy) {
        rB(645, 2, 32);
        rB(649, 2, 32);
        rB(684, 10, 32);
        rB(275, 8, 1);
        rB(444, 3, 1);
        rB(476, 2, 1);
        rB(508, 1, 1);
      }
      g.state = play;
      gameScene.visible = true;
      introScene.visible = false;
      console.log('*** starting game loop ***');
      for(var key in config) {
        console.log(`${key}: ${config[key]}`);
      }
      console.log('total batteries:', totalBatteries);
      console.log('total enemies:', enemies.length);
      console.log('**************************');
    } else if(g.state === play) {
      if(g.paused && !player.dead) {
        g.resume();
      } else {
        g.pause();
      }
    } else if (g.state === win || g.state === lose) {
      location.reload();
    }
  }
  g.key.rightArrow.press = function() {
    !player.hasStarted ? player.hasStarted = true : player.hasStarted;
    player.movement.direction = directions.right;
  };
  g.key.leftArrow.press = function() {
    !player.hasStarted ? player.hasStarted = true : player.hasStarted;
    player.movement.direction = directions.left;
  };
  g.key.upArrow.press = function() {
    !player.hasStarted ? player.hasStarted = true : player.hasStarted;
    player.movement.direction = directions.up;
  };
  g.key.downArrow.press = function() {
    !player.hasStarted ? player.hasStarted = true : player.hasStarted;
    player.movement.direction = directions.down;
  };
  g.key.a.press = function() {
    !player.hasStarted ? player.hasStarted = true : player.hasStarted;
    destroyBlock('dl');
  };
  g.key.d.press = function() {
    if(g.state === play) {
      !player.hasStarted ? player.hasStarted = true : player.hasStarted;
      destroyBlock('dr');
    } else if(g.state === title) {
      cycleDifficulty();
    }
  };

  function cycleDifficulty() {
    if(config.difficulty === config.difficulties.normal) {
      updateDifficulty(config.difficulties.hard)
    } else if(config.difficulty === config.difficulties.hard) {
      updateDifficulty(config.difficulties.playground)
    } else if(config.difficulty === config.difficulties.playground) {
      updateDifficulty(config.difficulties.easy)
    } else if(config.difficulty === config.difficulties.easy) {
      updateDifficulty(config.difficulties.normal)
    }
    console.log('test');
    titleMessageSub4.content = `[ D ] -> Difficulty: ${config.difficulty.toUpperCase()}${config.difficulty === config.difficulties.hard ? ' (!)' : '' }`;
  }

  g.key.rightArrow.release = function() {
    if(player.movement.direction === directions.right) {
      player.movement.direction = directions.still;
    }
  };
  g.key.leftArrow.release = function() {
    if(player.movement.direction === directions.left) {
      player.movement.direction = directions.still;
    }
  };
  g.key.upArrow.release = function() {
    if(player.movement.direction === directions.up) {
      player.movement.direction = directions.still;
    }
  };
  g.key.downArrow.release = function() {
    if(player.movement.direction === directions.down) {
      player.movement.direction = directions.still;
    }
  };
/******************* MESSAGING AND KEYS ************************/

  //set the game state to `play`
  g.state = title;
  // for dev:
  // g.state = intro;
  // g.state = play;
  // g.state = win;
  // g.state = lose;
}

function doorsOpen() {
  exits.forEach(exit => {
    exit.alpha = 1;
    exit.canUse = true;
  })
}

/************* MOVEMENT CODE *******************/

function destroyBlock(dir) {
  currentTile = g.getSpriteIndex(player);
  tileToDestroy = g.getAdjacentTile(currentTile, dir);
  aboveTile = g.getAdjacentTile(tileToDestroy.index, directions.up);

  // don't allow destroying the same block if it's already destroyed
  if(!destroyedBlocks.hash[tileToDestroy.index] && aboveTile.type !== g.tileTypes.floor && !player.dead) {

    spriteToDestroy = floors.find(el => {
      return el.index === tileToDestroy.index;
    })

    if(spriteToDestroy && spriteToDestroy.visible) {
      let adjust = 1;
      if(dir === 'dl') {
        adjust *= -1;
      }
      var line = g.line('yellow', 3, player.centerX + 10*adjust, player.centerY + 2, spriteToDestroy.centerX  + 2*adjust, spriteToDestroy.centerY - 16);
      g.wait(35, () => {
        g.remove(line)
      });
      // ga.line = function(strokeStyle, lineWidth, ax, ay, bx, by) {

      sound.blast();
      // Change the block type to air:
      world.children[0].data[tileToDestroy.index] = 1;
      // fade out the block:
      g.fadeOut(spriteToDestroy, 15);
      // store relevant data for the destroyed block:
      let blockData = {
        sprite: spriteToDestroy,
        tile: tileToDestroy,
        time: Date.now(),
        occupied: false,
        occupy: function() {
          this.occupied = true;
          world.children[0].data[this.tile.index] = 2;
        },
        vacate: function() {
          this.occupied = false;
          world.children[0].data[this.tile.index] = 1;
        },
      };
      addDestroyedBlock(blockData);
    }
  }
}

function respawnNextBlock() {
  let blockIndex = destroyedBlocks.queue[0];
  let blockData = destroyedBlocks.hash[blockIndex];
  closingBlocks.push(blockIndex);
  removeDestroyBlock(blockData);
  world.children[0].data[blockIndex] = 2;
  let tween = g.fadeIn(blockData.sprite, 10);
  tween.onComplete = function() {
    closingBlocks.splice(closingBlocks.indexOf(blockIndex), 1);
  }
}

function addDestroyedBlock(bData) {
  // add the block data to easily accessible hash
  destroyedBlocks.hash[bData.tile.index] = bData;
  // add the block index to a queue to track respawn
  destroyedBlocks.queue.push(bData.tile.index);
}

function removeDestroyBlock(bData) {
  // shift block index from the queue, delete it from the hash
  delete destroyedBlocks.hash[destroyedBlocks.queue.shift()];
}

function respawnEnemy(eSprite) {
  eSprite.needsPath = true;
  eSprite.x = eSprite.spawnX;
  eSprite.y = eSprite.spawnY;
  eSprite.currentTile = g.getSpriteIndex(eSprite);
  eSprite.inHoleRef = undefined;
  eSprite.freshSpawn = true;
  eSprite.movement = {
    falling: false,
    moving: false,
    stuck: false,
    stuckAt: undefined,
    direction: directions.still,
  }
  eSprite.pathData = {
    path: null,
    updated: null,
    distance: null,
  }
  setTimeout(function(){
    eSprite.visible = true;
  }, 250);
  setTimeout(function(){
    eSprite.dead = false;
  }, 1000);
}

function canMoveFromTo(sprite, currentTile, destTile) {
  let dir = currentTile.index - destTile.index;
  switch(dir) {
    case 32:
      if(destTile.type && 
        currentTile.type === g.tileTypes.ladder && 
        destTile.type !== g.tileTypes.floor) {
        return true;
      }
    break;
    case -32:
      if(destTile.type && currentTile.type === g.tileTypes.ladder && destTile.type !== g.tileTypes.floor || 
        destTile.type && destTile.type === g.tileTypes.ladder ||
        destTile.type && sprite.movement.falling) {
        return true;
      }
    break;
    case -1:
      if(destTile.type && destTile.type !== g.tileTypes.floor) {
        return true;
      }
    break;
    case 1:
      if(destTile.type && destTile.type !== g.tileTypes.floor) {
        return true;
      }
    break;
    default:
      return false;
    break;
  }
}

function moveOneTile(sprite, currentTileIndex, dir) {
  // let adjacentTiles = g.getAdjacentTiles(currentTileIndex);
  let currentTile = g.getAdjacentTile(currentTileIndex, directions.current);
  let moveToTile = g.getAdjacentTile(currentTileIndex, dir);

  canMove = canMoveFromTo(sprite, currentTile, moveToTile);

  if(canMove) {
    let nextTileIndex = moveToTile.index;
    let currentCoords = g.getTile(currentTileIndex, world.objects[0].data, world);
    let nextCoords = g.getTile(nextTileIndex, world.objects[0].data, world);
    nextX = nextCoords.x;
    nextY = nextCoords.y;
    sprite.x = nextX;
    sprite.y = nextY;
    sprite.currentTile = nextTileIndex;
    return true;
  }
  // Prevent bug at bottom of map w/ infinite loop
  return false;
}

function teleportTo(sprite, tile) {
    nextCoords = g.getTile(tile, world.objects[0].data, world);
    nextX = nextCoords.x;
    nextY = nextCoords.y;
    sprite.x = nextX;
    sprite.y = nextY;
    return true;
}

function isFalling(sprite) {
  thisTile = g.getAdjacentTile(sprite.currentTile, directions.current);
  belowTile = g.getAdjacentTile(sprite.currentTile, directions.down);

  if(thisTile.type !== g.tileTypes.ladder && !belowTile.isStable && belowTile.index) {//adjacentTiles.d.type === g.tileTypes.air) {
    // sprite.movement.falling = true;
    return true;
  } else {
    // sprite.movement.falling = false;
    return false;
  }
}

function allowPlayerMoveAgain() {
  player.movement.moving = false;
}

function checkForPlayerKill(enemy){
  if(enemy.currentTile === player.currentTile &&
    (config.allowFallingKills || (!config.allowFallingKills && !player.movement.falling))) {
    console.log('DEV ONLY: You Died!');
    makePlayerDead();
  }
}

function makeEnemyDead(enemy) {
  enemy.dead = true;
  enemy.visible = false;
  respawnEnemy(enemy);
}
function makePlayerDead() {
    sound.lose();
    g.shake(gameScene, 12, false, 75);
    player.dead = true;
    player.visible = false;
    setTimeout(function() {
      g.resume();
      g.state = lose
    }, 1500);
    g.pause();
}

function checkForFallenIntoBlock(enemy) {
  let occupiedBlock = destroyedBlocks.hash[enemy.currentTile];
  if(occupiedBlock) {
    // console.log('Stuck and occupied');
    enemy.makeStuck(occupiedBlock);
    occupiedBlock.occupy();
  }
}

function getOutOfHole(enemy) {
  if(!enemy.dead && destroyedBlocks.hash[enemy.inHoleRef.tile.index]) {
    enemy.inHoleRef.vacate();
    enemy.unStick();
  }
}

function moveEnemy(enemy) {
  if(enemy.freshSpawn) {
    enemy.movement.falling = isFalling(enemy);
    enemy.freshSpawn = false;
  }
  // Everything happens in !moving, to save resources
  if(!enemy.movement.moving) {
    // Make sure we're not falling now...
    if(!enemy.movement.stuck) {
      enemy.movement.falling = isFalling(enemy);
    } else {
      // console.log('Stuck!', enemy.currentTile, enemy.pathData);
    }


    // Figure out if enemy needs path
    if(!enemy.movement.falling && enemy.needsPath) {
      let adjust = 0;
      if(enemy.movement.stuck) {
        adjust = 32;
      }

      if(config.difficulty === config.difficulties.hard) {
        enemy.pathData = dijkstra2.shortestPath(enemy.currentTile - adjust, player.movement.falling ? player.landingTile : player.currentTile);
      } else {
        enemy.pathData = dijkstra2.shortestPath(enemy.currentTile - adjust, player.currentTile);
      }
      enemy.needsPath = false;
    }
    if(!enemy.movement.falling && Date.now() - enemy.pathData.updated > config.pathUpdateFrequency) {
      enemy.needsPath = true;
    }

    if (enemy.movement.stuck) {
      if(Date.now() - enemy.movement.stuckAt > config.enemyUnstuckSpeed) {
        getOutOfHole(enemy);
      }
    }

    // if(!nextTile && eSprite.pathData.distance !== Infinity) {
    //   eSprite.needsPath = true;
    // }

    let enemyDidMove = false;
    let currentPathTile = enemy.pathData.path ? enemy.pathData.path[0] : undefined;
    let nextTile = enemy.pathData.path ? enemy.pathData.path[1] : undefined;

    if(!enemy.movement.stuck) {
      if(enemy.movement.falling) {
        // Prevent enemies falling into the same hole.
        if(destroyedBlocks.hash[enemy.currentTile + 32] && !destroyedBlocks.hash[enemy.currentTile + 32].occupied
          || !destroyedBlocks.hash[enemy.currentTile + 32]) {
          enemyDidMove = moveOneTile(enemy, enemy.currentTile, directions.down);
        }
      } else if (nextTile) {
        // console.log('Need to move', enemy.climbingOut, enemy.currentTile, currentPathTile, nextTile);
        // Prevent enemies from climbing straight up and falling back into the hole
        // if(enemy.climbingOut && (enemy.currentTile === nextTile || enemy.currentTile - 32 === nextTile)) {
        //   console.log('nextTile', nextTile);
        //   nextTile += Math.random() < 0.5 ? -1 : 1;
        //   console.log('nextTile', nextTile);
        // }
        enemy.movement.direction = getEnemyMoveDir(currentPathTile, nextTile);
        enemyDidMove = moveOneTile(enemy, currentPathTile, enemy.movement.direction);
        // console.log('enemyDidMove', enemyDidMove);
      }

      if(enemyDidMove) {
        !enemy.movement.falling && enemy.pathData.path ? enemy.pathData.path.shift() : '';
        
        enemy.movement.moving = true;
        g.wait(config.enemyMoveSpeed, enemy.allowMoveAgain);
      }
    }
    if(!enemy.movement.stuck) {
      enemy.movement.falling = isFalling(enemy);
    }
  }

  function getEnemyMoveDir(cT, nT) {
    if(nT < cT) {
      // moving l/u
      if(nT + 1 === cT) {
        return directions.left;
      } else {
        return directions.up;
      }
    } else if (nT > cT) {
      // moving r/d
      if(nT - 1 === cT) {
        return directions.right;
      } else {
        return directions.down;
      }
    }
  }

}

function movePlayer() {
  if(player.freshSpawn) {
    player.movement.falling = isFalling(player);
    player.freshSpawn = false;
  }
  if(!player.movement.moving) {
    let playerDidMove;

    if(Date.now() > player.lastMove + 2000) {
      // If the player hasn't moved they may be stuck. If they're stuck for good, kill them.
      let l = g.getAdjacentTile(player.currentTile, directions.left);
      let r = g.getAdjacentTile(player.currentTile, directions.right);
      let d = g.getAdjacentTile(player.currentTile, directions.down);
      if(l.type === g.tileTypes.floor && r.type === g.tileTypes.floor && d.type === g.tileTypes.floor) {
        makePlayerDead();
      }
      player.lastMove = Date.now();
    }

    if(player.movement.falling) {
      playerDidMove = moveOneTile(player, player.currentTile, directions.down);
    } else if (player.movement.direction !== directions.still) {
      playerDidMove = moveOneTile(player, player.currentTile, player.movement.direction);
    }


    if(playerDidMove) {
      player.lastMove = Date.now();
      sound.move();
      checkForExitWin();
      checkForBatteryPickup();
      player.movement.moving = true;
      g.wait(config.playerMoveSpeed, allowPlayerMoveAgain);
    }

    player.movement.falling = isFalling(player);
    if(player.movement.falling && !player.landingTile) {
      idx = player.currentTile;
      
      while(!player.landingTile) {
        let tile = world.tileTypes[world.objects[0].data[idx] - 1];
        if(tile && tile.isStable) {
          player.landingTile = idx - 32;
        } else if (!tile) {
          player.landingTile = idx - 32;
        } else {
          idx += 32;  
        }
      }
    } else if(!player.movement.falling) {
      player.landingTile = undefined;
    }
  }
}

//The `play` state
function play() {
  if(player.hasStarted) {
    // player.currentTile will need setting.
    checkForAnyoneInClosingBlock();
    movePlayer();
    enemies.forEach(enemy => {
      if(!enemy.dead) {
        // console.log(`Cycling for enemy ${enemy.id}`)
        moveEnemy(enemy);
        if(!enemy.movement.stuck) {
          checkForPlayerKill(enemy);
          checkForFallenIntoBlock(enemy);
        }
      }
    })

    checkForBlockRespawn();

  }

}

function checkForAnyoneInClosingBlock() {
  if(closingBlocks.indexOf(player.currentTile) !== -1) {
    makePlayerDead();
  }
  enemies.forEach(enemy => {
    if(closingBlocks.indexOf(enemy.currentTile) !== -1) {
      makeEnemyDead(enemy);
    }
  });
}

function checkForBlockRespawn() {
  try {
    if (destroyedBlocks.queue.length && Date.now() - destroyedBlocks.hash[destroyedBlocks.queue[0]].time > config.blockRespawnSpeed) {
      respawnNextBlock();
    }
  } catch (err) {
    console.log('Block respawn error', err)
    console.log('Queue length', destroyedBlocks.queue.length);
    console.log('Queue', destroyedBlocks.queue);
    console.log('Hash', destroyedBlocks.hash);
  }
}

function checkForBatteryPickup() {
  if(batteryHash[player.currentTile] && batteryHash[player.currentTile].visible) {
    batteryHash[player.currentTile].visible = false;
    collectedBatteries++;
    sound.battery();
    console.log('COLLECTED A BATTERY');
    if(totalBatteries === collectedBatteries) {
      sound.doorOpen();
      doorsOpen();
      console.log('ALL BATTERIES GOTTEN');
    }
  }
}

function checkForExitWin() {
  if(!player.won && exitHash[player.currentTile] && exitHash[player.currentTile].canUse) {
    console.log('DEV ONLY: You Won!')
    player.won = true;
    sound.win();
    g.state = win;
  }
}
/************* MOVEMENT CODE **********************/

/**************** DIJKSTRA CODE ******************/

/** from: https://github.com/mburst/dijkstras-algorithm/blob/master/dijkstras.js
 * Basic priority queue implementation. If a better priority queue is wanted/needed,
 * this code works with the implementation in google's closure library (https://code.google.com/p/closure-library/).
 * Use goog.require('goog.structs.PriorityQueue'); and new goog.structs.PriorityQueue()
 */

function PriorityQueue () {
  this._nodes = [];

  this.enqueue = function (priority, key) {
    this._nodes.push({key: key, priority: priority });
  };
  this.dequeue = function () {
    return this._nodes.shift().key;
  };
  this.sort = function () {
    this._nodes.sort(function (a, b) {
      return a.priority - b.priority;
    });
  };
  this.isEmpty = function () {
    return !this._nodes.length;
  };
}

/**
 * Pathfinding starts here
 */
function Graph(vertices){
  var INFINITY = 1/0;
  this.vertices = vertices;

  this.addVertex = function(name, edges){
    this.vertices[name] = edges;
  };

  this.shortestPath = function (start, finish) {
    start = start.toString();
    finish = finish.toString();

    var nodes = new PriorityQueue(),
        distances = {},
        previous = {},
        path = [],
        smallest, vertex, neighbor, alt;

    for(vertex in this.vertices) {
      if(vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      }
      else {
        distances[vertex] = INFINITY;
        nodes.enqueue(INFINITY, vertex);
      }

      previous[vertex] = null;
    }

    nodes.sort();

    while(!nodes.isEmpty()) {
      smallest = nodes.dequeue();

      if(smallest === finish) {
        path = [];

        while(previous[smallest]) {
          path.push(Number(smallest));
          smallest = previous[smallest];
        }
        break;
      }

      // This is custom. In this game, at least, we can assume this means
      // that there is no connected path to the player.
      if(distances[smallest] === INFINITY && smallest == '0') {
        break;
      }

      if(!smallest || distances[smallest] === INFINITY){
        continue;
      }

      for(neighbor in this.vertices[smallest]) {
        alt = distances[smallest] + this.vertices[smallest][neighbor];

        if(alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;

          nodes.enqueue(alt, neighbor);
          nodes.sort();
        }
      }
    }

    return {
      path: path.concat([Number(start)]).reverse(),
      distance: path.length,
      updated: Date.now(),
    }
  };
}

function stateless() {}
/**************** DIJKSTRA CODE ******************/
