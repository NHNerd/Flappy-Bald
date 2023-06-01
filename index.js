import birdHandler from './bird.js';
import fpsHandler from './fps.js';
import pipeHandler from './pipes.js';
import collision from './collision.js';
import discoBall from './discoBall.js';
import parallax from './parallax.js';
import coffee from './coffee.js';

import { pauseDOM, restartDOM, coffeeButtonDOM } from './DOM.js';

let animationId = undefined;
let ispausing = false;
let performanceNow = 0;
let performanceStartLock = true;
let performanceStart;

restartDOM.textContent = 'start';
coffee.clickListner();

// handler loop
function loop(timestamp) {
  //Time on start
  if (performanceStartLock) {
    performanceStart = performance.now();
    performanceStartLock = false;
  }
  //Current time
  performanceNow = performance.now() - performanceStart;

  if (ispausing) {
    collision.check();
  }

  if (discoBall.yPosDisco >= -410) {
    discoBall.updatePosition();
  }

  parallax.updatePosition(fpsHandler.secondsPassed);
  birdHandler.updatePosition(440, fpsHandler.secondsPassed);
  pipeHandler.updatePosition(200, fpsHandler.secondsPassed);
  coffee.coffeeDisplay();

  fpsHandler.updateFps(timestamp, performanceNow, 15); //? secont - frequency refresh

  animationId = requestAnimationFrame(loop);

  if (collision.value) {
    stopLoop();
  }
}

// Start loop
function startloop() {
  if (!ispausing) {
    ispausing = true;
    loop();
  }
}
// Stop loop

function stopLoop() {
  if (ispausing) {
    ispausing = false;
    cancelAnimationFrame(animationId);
  }
}

// Start/Stop on click
document.addEventListener('keydown', function (event) {
  if (event.code === 'Escape') {
    if (ispausing) {
      stopLoop();
    } else {
      startloop();
    }
  }
});
pauseDOM.addEventListener('click', () => {
  if (ispausing) {
    stopLoop();
  } else {
    startloop();
  }
});

coffeeButtonDOM.addEventListener('click', () => {
  if (ispausing) {
    stopLoop();
  } else {
    startloop();
  }
});

restartDOM.addEventListener('click', () => {
  console.log('click RESTART');
  performanceStartLock = true;
  restartDOM.textContent = 'restart';
  collision.resetState();
  birdHandler.resetState();
  pipeHandler.resetState();
  parallax.resetState();
  coffee.resetState();
  startloop();
});
