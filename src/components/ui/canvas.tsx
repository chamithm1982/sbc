
// @ts-nocheck
// Disabling TypeScript checks for this file due to its original JavaScript nature and heavy DOM manipulation.

function Wave(options: any) {
  this.init(options || {});
}

Wave.prototype = {
  init: function (options: any) {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.001;
    this.amplitude = options.amplitude || 1;
    this.waveValue = 0; // Renamed to avoid conflicts and be clearer
  },
  update: function () {
    this.phase += this.frequency;
    this.waveValue = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.waveValue;
  },
  value: function () { // Keep original value function if it's used elsewhere, but update should use internal prop
    return this.waveValue;
  },
};

function Line(options: any) {
  this.init(options || {});
}

Line.prototype = {
  init: function (options: any) {
    this.spring = options.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (var t, n = 0; n < E.size; n++) {
      t = new Node();
      t.x = pos.x;
      t.y = pos.y;
      this.nodes.push(t);
    }
  },
  update: function () {
    let spring = this.spring;
    let node = this.nodes[0];
    node.vx += (pos.x - node.x) * spring;
    node.vy += (pos.y - node.y) * spring;
    for (var n, i = 0, a = this.nodes.length; i < a; i++) {
      node = this.nodes[i];
      if (i > 0) {
        n = this.nodes[i - 1];
        node.vx += (n.x - node.x) * spring;
        node.vy += (n.y - node.y) * spring;
        node.vx += n.vx * E.dampening;
        node.vy += n.vy * E.dampening;
      }
      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      spring *= E.tension;
    }
  },
  draw: function () {
    let currentX = this.nodes[0].x;
    let currentY = this.nodes[0].y;
    
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(currentX, currentY);
    
    for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
      const pNode = this.nodes[a];
      const cNode = this.nodes[a + 1];
      currentX = 0.5 * (pNode.x + cNode.x);
      currentY = 0.5 * (pNode.y + cNode.y);
      ctx.quadraticCurveTo(pNode.x, pNode.y, currentX, currentY);
    }
    const pNodeFinal = this.nodes[a];
    const cNodeFinal = this.nodes[a + 1];
    ctx.quadraticCurveTo(pNodeFinal.x, pNodeFinal.y, cNodeFinal.x, cNodeFinal.y);
    ctx.stroke();
    ctx.closePath();
  },
};

let ctx: CanvasRenderingContext2D | null = null;
let hueEffect: Wave; // Changed from 'f' to be more descriptive
let pos = { x: 0, y: 0 };
let lines: Line[] = [];
const E = {
  debug: true,
  friction: 0.5,
  trails: 30, 
  size: 50,
  dampening: 0.025, 
  tension: 0.98, 
};

function Node(this: any) {
  this.x = 0;
  this.y = 0;
  this.vy = 0;
  this.vx = 0;
}

function onMousemove(e: MouseEvent | TouchEvent) {
  function initLines() {
    lines = [];
    for (let i = 0; i < E.trails; i++) {
      lines.push(new (Line as any)({ spring: 0.45 + (i / E.trails) * 0.025 }));
    }
  }

  function processEvent(event: MouseEvent | TouchEvent) {
    if ((event as TouchEvent).touches && (event as TouchEvent).touches.length > 0) {
      pos.x = (event as TouchEvent).touches[0].pageX;
      pos.y = (event as TouchEvent).touches[0].pageY;
    } else {
      pos.x = (event as MouseEvent).clientX;
      pos.y = (event as MouseEvent).clientY;
    }
    // Don't prevent default on mousemove as it can break scrolling or other interactions.
    // Only prevent default for touch events if necessary, but typically not needed for move.
    // e.preventDefault(); 
  }

  function handleTouchStart(event: TouchEvent) {
    if (event.touches.length === 1) {
      pos.x = event.touches[0].pageX;
      pos.y = event.touches[0].pageY;
      // event.preventDefault(); // Prevent default only if it causes issues like page scroll
    }
  }

  document.removeEventListener("mousemove", onMousemove);
  document.removeEventListener("touchstart", onMousemove); 
  
  document.addEventListener("mousemove", processEvent);
  document.addEventListener("touchmove", processEvent); 
  document.addEventListener("touchstart", handleTouchStart);

  processEvent(e); // Process the initial event that triggered this
  initLines();

  if (ctx && !ctx.running) {
    ctx.running = true;
    render();
  }
}

function render() {
  if (ctx && ctx.running) {
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "hsla(" + Math.round(hueEffect.update()) + ",100%,50%,0.25)";
    ctx.lineWidth = 0.5; 
    
    for (let i = 0; i < E.trails; i++) {
      const line = lines[i];
      if (line) { 
        line.update();
        line.draw();
      }
    }
    ctx.frame++;
    window.requestAnimationFrame(render);
  }
}

function resizeCanvas() {
  const canvasEl = document.getElementById("canvas") as HTMLCanvasElement;
  if (!ctx || !canvasEl) return;

  if (canvasEl.parentElement) {
    ctx.canvas.width = canvasEl.parentElement.offsetWidth;
    ctx.canvas.height = canvasEl.parentElement.offsetHeight;
  } else { // Fallback if no parent
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }
}

// Store event listeners to remove them later if renderCanvas is called multiple times.
let hasInitialized = false;
const eventListeners: Array<{target: EventTarget, type: string, listener: EventListenerOrEventListenerObject}> = [];

function addManagedEventListener(target: EventTarget, type: string, listener: EventListenerOrEventListenerObject) {
    target.addEventListener(type, listener);
    eventListeners.push({ target, type, listener });
}

function removeAllManagedEventListeners() {
    eventListeners.forEach(({ target, type, listener }) => {
        target.removeEventListener(type, listener);
    });
    eventListeners.length = 0; // Clear the array
}


export const renderCanvas = function () {
  if (typeof window === 'undefined') return; // Don't run on server

  const canvasEl = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvasEl) {
    console.error("Canvas element not found!");
    return;
  }
  
  const tempCtx = canvasEl.getContext("2d");
  if (!tempCtx) {
    console.error("Failed to get 2D context!");
    return;
  }
  ctx = tempCtx;

  // If called again, remove old listeners to prevent multiple initializations
  if (hasInitialized) {
      removeAllManagedEventListeners();
      if (ctx && ctx.running) {
          ctx.running = false; // Stop previous animation loop
      }
  }

  ctx.running = true;
  ctx.frame = 1;

  hueEffect = new (Wave as any)({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });
  
  // Initialize position to center of canvas or window
  pos.x = canvasEl.parentElement ? canvasEl.parentElement.offsetWidth / 2 : window.innerWidth / 2;
  pos.y = canvasEl.parentElement ? canvasEl.parentElement.offsetHeight / 2 : window.innerHeight / 2;
  
  // Initialize lines
  lines = [];
  for (let i = 0; i < E.trails; i++) {
    lines.push(new (Line as any)({ spring: 0.45 + (i / E.trails) * 0.025 }));
  }

  addManagedEventListener(document, "mousemove", onMousemove);
  addManagedEventListener(document, "touchstart", onMousemove); 
  addManagedEventListener(document.body, "orientationchange", resizeCanvas);
  addManagedEventListener(window, "resize", resizeCanvas);
  
  addManagedEventListener(window, "focus", () => {
    if (ctx && !ctx.running) {
      ctx.running = true;
      render();
    }
  });
  addManagedEventListener(window, "blur", () => {
    if (ctx) {
      ctx.running = false; 
    }
  });

  hasInitialized = true;
  resizeCanvas(); 
  render(); 
};
