// Collection of helper functions often called (except by the game loop)

// Draw a 32x32 tile aligned on the grid
var draw_tile = (id, tile_x, tile_y) => {
  c.drawImage(tileset, id * 16, 0, 16, 16, tile_x * 32, 40 + tile_y * 32, 32, 32);
}

// Draw a 32x32 sprite anywhere (don't forget to add 40 to y to draw in the scene)
var draw_sprite = (id, x, y) => {
  c.drawImage(tileset, id * 16, 0, 16, 16, x, y, 32, 32);
}

// Which tile is at these coordinates (in px)? (returns 0 by default)
var tile_at = (x, y) => {
  if(!level_data.tiles[~~(y / 32)]){
    return 0;
  }
  
  return level_data.tiles[~~(y / 32)][~~(x / 32)] || 0;
}

// Set a tile in the current level at these coordinates (in px)
var set_tile = (x, y, value) => {
  if(!level_data.tiles[~~(y / 32)]){
    return;
  }
  level_data.tiles[~~(y / 32)][~~(x / 32)] = value;
}

// Is a tile id currently solid? 
// Clouds are solid after a time travel
// (optionally, consider spikes solid, because cubes can be placed on them)
var is_solid = (id, spikes) => {
  if(id == 13){
    document.title = heros.length + " " + hero + " " + frame;
  }
  return (id == 13 && hero != 0) || (spikes && id == 7) || solid[id] || 0;
}

// Is a tile writable (in the editor, a.k.a don't already contain a pipe or a balance or a time machine)
var is_writable = (tile_x, tile_y) => {
  if(!level_data.tiles[tile_y]){
    return 0;
  }
  return !level_data.tiles[tile_y][tile_x] || level_data.tiles[tile_y][tile_x] < 14 || level_data.tiles[tile_y][tile_x] > 21
}

// Reset a hero (after starting a level / reversing time)
var reset_hero = () => {

  return {
    x: (level_data && level_data.start) ? level_data.start[0] * 32 : 640,
    y: (level_data && level_data.start) ? level_data.start[1] * 32 : 0,
    vx: 0,
    vy: 0,
    grounded: 0,
    keyleft: keyleft || false,
    left: [],
    keyup: keyup || false,
    up: [],
    keyright: keyright || false,
    right: [],
    space: [],
    shift: [],
    leftclick: [],
    rightclick: [],
    angle: 0,
    direction: 1, // 0: left, 1: right
    state: 0, // 0: idle, 1: walking, 2: jumping, 3: dead
    cube_held: null,
    cube_below: null,
    position_on_cube: null,
    pick_cube_animation_frame: 0,
    can_jump: true
  }
}

// Reset all the settings of the current level (before playing : 0 / before going back in time: 1)
var reset_current_level = (timetravel) => {
  
  // Reset win condition
  win = false;
  coins_left = 0;
  win_frame = 0;
  lose_frame = 0;
  paradox_frame = 0;

  // Current frame
  frame = 0;

  // Reset "present" hero
  current_hero = reset_hero();

  // Solidity of the tiles (some of them vary during gameplay, so we reset it before each level and after reset)
  solid = [
    0, // 0: sky
    0, // 1: time machine placeholder
    0, // 2: flag
    1, // 3: ground
    1, // 4: portalable wall
    1, // 5: brick
    0, // 6: coin
    0, // 7: spike
    1, // 8: ice
    1, // 9: solid yellow block
    0, // 10: non-solid yellow block
    0, // 11: yellow toggle
    0, // 12: cube
    0, // 13: cloud
    1, // 14: pipe placeholder
    0, // 15: Balance
    1, // 16: pipe top left
    1, // 17: pipe top right
    1, // 18: pipe body left
    1, // 19: pipe body right
    1, // 20: Green switch
    0, // 21: Green switch pressed
    0, // 22: Tardis top
    0, // 23: Tardis bottom
    0, // 24: flag pole
    0  // 25: yellow toggle pressed
  ];
  
  // Cubes (parsed at frame 0)
  level_data.cubes = [];
  
  // Yellow toggles state at last frame
  yellow_toggle_last_frame = false;
  yellow_toggle_on = true;
  yellow_toggle_delay = 0;
  
  // Pipes state
  pipes_state = [];
  
  // Balances state
  balances_state = [];
  
  // Portals
  blue_portal = { tile_x: -1, tile_y: -1 };
  orange_portal = { tile_x: -2, tile_y: -2 };
  
  // Heros (playing simultaneously after time travels)
  if(!timetravel){
    heros = [];
  }
}


// Make an empty level (for the editor)
var reset_maker_level = () => {
  
  // Editor's level data
  level_data = {
    tiles: [],
    pipes: [],
    balances: [],
    cubes: [],
    tested: false
  }

  for(j = 0; j < 20; j++){
    level_data.tiles[j] = [];
  }

  // Pipes
  pipe_click = 0;
  current_pipe = 0;

  // Balances
  balance_click = 0;
  current_balance = 0;
  
  // Current tile in the level editor (0: sky / 1: start / etc.)
  current_editor_tile = 0;
  
  // Reset ability to quit
  shared = true;
  chose_a_tile = false;
};
