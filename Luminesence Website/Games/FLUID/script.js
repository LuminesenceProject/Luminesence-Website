const row = 64;
const col = 64;
const width = 8;
const height = 8;

let control = {
  diff: 1,
  visc: 1,
  fadeOutDensityRate: 0.01,
  fadeOutVelocityRate: 0.01,
  drawDensity: true,
  emitDensity: true,
  emitDensityScale: 50,
  emitDensityExpand: 0,
  drawVelocity: false,
  drawVelocityScale: 2,
  emitVelocity: true,
  emitVelocityScale: 256,
  emitVelocityExpand: 5 };


let gui = new dat.GUI({
  load: {
    "preset": "Default",
    "closed": false,
    "remembered": {
      "Default": {
        "0": {
          "diff": 1,
          "visc": 1,
          "fadeOutDensityRate": 0.01,
          "fadeOutVelocityRate": 0.01,
          "drawDensity": true,
          "emitDensity": true,
          "emitDensityExpand": 0,
          "emitDensityScale": 30,
          "drawVelocityScale": 2,
          "drawVelocity": false,
          "emitVelocity": true,
          "emitVelocityExpand": 5,
          "emitVelocityScale": 300 } },


      "Finger": {
        "0": {
          "diff": 1,
          "visc": 1,
          "fadeOutDensityRate": 0.01,
          "fadeOutVelocityRate": 0.01,
          "drawDensity": true,
          "emitDensity": true,
          "emitDensityExpand": 1,
          "emitDensityScale": 8,
          "drawVelocityScale": 2,
          "drawVelocity": false,
          "emitVelocity": true,
          "emitVelocityExpand": 5,
          "emitVelocityScale": 512 } } },



    "folders": {} } });


gui.remember(control);
gui.add(control, 'diff');
gui.add(control, 'visc');
gui.add(control, 'fadeOutDensityRate', 0, 1);
gui.add(control, 'fadeOutVelocityRate', 0, 1);
gui.add(control, 'drawDensity');
gui.add(control, 'emitDensity');
gui.add(control, 'emitDensityExpand', 0, 5).step(1);
gui.add(control, 'emitDensityScale');
gui.add(control, 'drawVelocityScale');
gui.add(control, 'drawVelocity');
gui.add(control, 'emitVelocity');
gui.add(control, 'emitVelocityExpand', 0, 5).step(1);
gui.add(control, 'emitVelocityScale');

class FluidDynamicSolver {

  constructor(width = 32, height = 32) {
    this.width = width;
    this.height = height;

    // expand 2 for boundaries
    this.size = (this.width + 2) * (this.height + 2);
    this.innerSize = this.width * this.height;

    // init
    this.u_prev = this.reset([]);
    this.v_prev = this.reset([]);
    this.d_prev = this.reset([]);
    this.u_next = this.reset([]);
    this.v_next = this.reset([]);
    this.d_next = this.reset([]);
  }

  idx(x, y) {
    return x + y * (this.width + 2);
  }

  addSource(source, target, dt) {
    for (let i = 0; i < this.size; i++) {
      target[i] += source[i] * dt;
    }
  }

  diffuse(prev, next, diff, dt, boundaryFlag) {
    const a = dt * diff;

    // do 20 iterations of Gauss-Seidel relaxation
    for (let k = 0; k < 20; k++) {

      // ignore the boundaries
      for (let i = 1; i <= this.width; i++) {
        for (let j = 1; j <= this.height; j++) {
          next[this.idx(i, j)] = (prev[this.idx(i, j)] + a * (
          next[this.idx(i - 1, j)] +
          next[this.idx(i + 1, j)] +
          next[this.idx(i, j - 1)] +
          next[this.idx(i, j + 1)])) / (1 + 4 * a);
        }
      }

      this.setBoundary(next, boundaryFlag);
    }
  }

  advection(prev, next, u_next, v_next, dt, boundaryFlag) {
    const d = dt;
    for (let i = 1; i <= this.width; i++) {
      for (let j = 1; j <= this.height; j++) {
        const x = Math.min(Math.max(0.5, i - d * u_next[this.idx(i, j)]), this.width + 0.5);
        const y = Math.min(Math.max(0.5, j - d * v_next[this.idx(i, j)]), this.height + 0.5);
        const i0 = x | 0;
        const j0 = y | 0;
        const i1 = i0 + 1;
        const j1 = j0 + 1;
        const s1 = x - i0;
        const s0 = 1 - s1;
        const t1 = y - j0;
        const t0 = 1 - t1;
        next[this.idx(i, j)] =
        s0 * (t0 * prev[this.idx(i0, j0)] + t1 * prev[this.idx(i0, j1)]) +
        s1 * (t0 * prev[this.idx(i1, j0)] + t1 * prev[this.idx(i1, j1)]);
      }
    }

    this.setBoundary(next, boundaryFlag);
  }

  setBoundary(target, boundaryFlag) {
    for (let i = 1; i <= this.width; i++) {
      target[this.idx(i, 0)] = (boundaryFlag === 2 ? -1 : 1) * target[this.idx(i, 1)];
      target[this.idx(i, this.height + 1)] = (boundaryFlag === 2 ? -1 : 1) * target[this.idx(i, this.height)];
    }

    for (let j = 1; j <= this.height; j++) {
      target[this.idx(0, j)] = (boundaryFlag === 1 ? -1 : 1) * target[this.idx(1, j)];
      target[this.idx(this.width + 1, j)] = (boundaryFlag === 1 ? -1 : 1) * target[this.idx(this.width, j)];
    }

    target[this.idx(0, 0)] = (target[this.idx(0, 1)] + target[this.idx(1, 0)]) / 2;
    target[this.idx(0, this.height + 1)] = (target[this.idx(0, this.height)] + target[this.idx(1, this.height + 1)]) / 2;
    target[this.idx(this.width + 1, 0)] = (target[this.idx(this.width, 0)] + target[this.idx(this.width + 1, 1)]) / 2;
    target[this.idx(this.width + 1, this.height + 1)] = (target[this.idx(0, this.height)] + target[this.idx(1, this.height + 1)]) / 2;
  }

  stepDensity(diff, dt) {
    this.addSource(this.d_prev, this.d_next, dt);

    [this.d_prev, this.d_next] = [this.d_next, this.d_prev];
    this.diffuse(this.d_prev, this.d_next, diff, dt, 0);

    [this.d_prev, this.d_next] = [this.d_next, this.d_prev];
    this.advection(this.d_prev, this.d_next, this.u_next, this.v_next, dt, 0);
  }

  stepVelocity(visc, dt) {
    this.addSource(this.u_prev, this.u_next, dt);
    this.addSource(this.v_prev, this.v_next, dt);

    [this.u_prev, this.u_next] = [this.u_next, this.u_prev];
    this.diffuse(this.u_prev, this.u_next, visc, dt, 1);
    [this.v_prev, this.v_next] = [this.v_next, this.v_prev];
    this.diffuse(this.v_prev, this.v_next, visc, dt, 2);

    this.project(this.u_prev, this.v_prev, this.u_next, this.v_next);

    [this.u_prev, this.u_next] = [this.u_next, this.u_prev];
    [this.v_prev, this.v_next] = [this.v_next, this.v_prev];
    this.advection(this.u_prev, this.u_next, this.u_prev, this.v_prev, dt, 1);
    this.advection(this.v_prev, this.v_next, this.u_prev, this.v_prev, dt, 2);

    this.project(this.u_prev, this.v_prev, this.u_next, this.v_next);
  }

  project(p, div, u, v) {
    const h = 1 / this.width;
    for (let i = 1; i <= this.width; i++) {
      for (let j = 1; j <= this.height; j++) {
        div[this.idx(i, j)] = -0.5 * h * (
        u[this.idx(i + 1, j)] - u[this.idx(i - 1, j)] +
        v[this.idx(i, j + 1)] - v[this.idx(i, j - 1)]);
        p[this.idx(i, j)] = 0;
      }
    }

    this.setBoundary(div, 0);
    this.setBoundary(p, 0);

    // do 20 iterations of Gauss-Seidel relaxation
    for (let k = 0; k < 20; k++) {

      // ignore the boundaries
      for (let i = 1; i <= this.width; i++) {
        for (let j = 1; j <= this.height; j++) {
          p[this.idx(i, j)] = (div[this.idx(i, j)] + (
          p[this.idx(i - 1, j)] +
          p[this.idx(i + 1, j)] +
          p[this.idx(i, j - 1)] +
          p[this.idx(i, j + 1)])) / 4;
        }
      }

      this.setBoundary(p, 0);
    }


    for (let i = 1; i <= this.width; i++) {
      for (let j = 1; j <= this.height; j++) {
        u[this.idx(i, j)] -= 0.5 * (p[this.idx(i + 1, j)] - p[this.idx(i - 1, j)]) / h;
        v[this.idx(i, j)] -= 0.5 * (p[this.idx(i, j + 1)] - p[this.idx(i, j - 1)]) / h;
      }
    }

    this.setBoundary(u, 1);
    this.setBoundary(v, 2);
  }

  set(target, source) {
    for (let i = 0; i < this.size; i++) {
      target[i] = source[i];
    }
    return target;
  }

  reset(target, value = 0) {
    for (let i = 0; i < this.size; i++) {
      target[i] = value;
    }
    return target;
  }

  fadeOut(target, rate) {
    for (let i = 0; i < this.size; i++) {
      target[i] *= rate;
    }
    return target;
  }}


let fluid = new FluidDynamicSolver(col, row);
let dt = 1 / 60;

let d_ui = fluid.reset([]);
let u_ui = fluid.reset([]);
let v_ui = fluid.reset([]);

let canvas = document.createElement('canvas');
canvas.width = col * width;
canvas.height = row * height;

let lastX, lastY;
function pointerMoveHandle(x, y) {
  let tileX = (x / width | 0) + 1;
  let tileY = (y / height | 0) + 1;
  if (lastX !== undefined) {
    let deltaX = x - lastX;
    let deltaY = y - lastY;

    if (control.emitDensity) {
      for (let i = Math.max(1, tileX - control.emitDensityExpand); i <= Math.min(tileX + control.emitDensityExpand, col); i++) {
        for (let j = Math.max(1, tileY - control.emitDensityExpand); j <= Math.min(tileY + control.emitDensityExpand, row); j++) {
          d_ui[fluid.idx(i, j)] += Math.sqrt(deltaX * deltaX + deltaY * deltaY) * control.emitDensityScale;
        }
      }
    }

    if (control.emitVelocity) {
      for (let i = Math.max(1, tileX - control.emitVelocityExpand); i <= Math.min(tileX + control.emitVelocityExpand, col); i++) {
        for (let j = Math.max(1, tileY - control.emitVelocityExpand); j <= Math.min(tileY + control.emitVelocityExpand, row); j++) {
          u_ui[fluid.idx(i, j)] += deltaX * control.emitVelocityScale;
          v_ui[fluid.idx(i, j)] += deltaY * control.emitVelocityScale;
        }
      }
    }
  }

  lastX = x;
  lastY = y;
}

canvas.addEventListener('mousemove', function (e) {
  pointerMoveHandle(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
  e.preventDefault();
});

canvas.addEventListener('touchmove', function (e) {
  let touch = e.touches[0];
  pointerMoveHandle(touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop);
  e.preventDefault();
});

// simulate touch
for (let i = 0; i < 100; i++) {
  pointerMoveHandle(canvas.width / 4 + i, canvas.height / 4 + i);
}

let ctx = canvas.getContext('2d');

document.body.appendChild(canvas);

let stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

let last = null;
function loop() {

  stats.begin();

  if (last) {
    dt = (new Date() - last) / 1000;
  }

  fluid.set(fluid.d_prev, d_ui);
  fluid.set(fluid.u_prev, u_ui);
  fluid.set(fluid.v_prev, v_ui);
  fluid.stepVelocity(control.visc, dt);
  fluid.stepDensity(control.diff, dt);

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let d = fluid.d_next;
  let u = fluid.u_next;
  let v = fluid.v_next;

  ctx.strokeStyle = 'green';
  ctx.beginPath();
  for (let i = 1; i <= fluid.width; i++) {
    for (let j = 1; j <= fluid.height; j++) {

      if (control.drawDensity) {
        let alpha = d[fluid.idx(i, j)];
        let discard = false;
        if (alpha < 0.05) {
          discard = true;
        } else if (alpha < 0.1) {
          ctx.fillStyle = "#00020c";
        } else if (alpha < 0.2) {
          ctx.fillStyle = "#00091d";
        } else if (alpha < 0.25) {
          ctx.fillStyle = "#7e0713";
        } else if (alpha < 0.3) {
          ctx.fillStyle = "#dd5500";
        } else if (alpha < 0.5) {
          ctx.fillStyle = "#ff8b0f";
        } else if (alpha < 0.7) {
          ctx.fillStyle = "#ffc73a";
        } else if (alpha < 0.9) {
          ctx.fillStyle = "#ffea59";
        } else {
          ctx.fillStyle = "#ffff89";
        }
        if (!discard)
        ctx.fillRect((i - 1) * width, (j - 1) * height, width, height);
      }

      if (control.drawVelocity) {

        ctx.moveTo((i - 0.5) * width, (j - 0.5) * height);
        ctx.lineTo((i - 0.5) * width + u[fluid.idx(i, j)] * width * dt * control.drawVelocityScale,
        (j - 0.5) * height + v[fluid.idx(i, j)] * height * dt * control.drawVelocityScale);
      }
    }
  }
  ctx.stroke();


  fluid.fadeOut(fluid.d_next, 1 - control.fadeOutDensityRate);
  fluid.fadeOut(fluid.u_next, 1 - control.fadeOutVelocityRate);
  fluid.fadeOut(fluid.v_next, 1 - control.fadeOutVelocityRate);

  fluid.reset(d_ui);
  fluid.reset(u_ui);
  fluid.reset(v_ui);

  last = new Date();

  stats.end();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);