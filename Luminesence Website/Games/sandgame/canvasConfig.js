
const __max_width = 550;
const __max_height = 600;

/* Need to use a smaller size when on mobile devices with small screens */
const width = Math.min(__max_width, Math.max(screen.width - 6, 1));
const height = Math.min(__max_height, Math.max(screen.height - 200, 100));

const MAX_FPS = 1000;
const DEFAULT_FPS = 100;

const MAX_NUM_PARTICLES = 10000;