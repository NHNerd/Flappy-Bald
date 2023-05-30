import birdHandler from './bird.js';
import fpsHandler from './fps.js';
import pipeHandler from './pipes.js';
import collision from './collision.js';

import { pauseDOM, restartDOM } from './DOM.js';

let animationId = undefined;
let ispauseing = false;

// handler loop

function loop(timestamp) {
  birdHandler.updatePosition(2, fpsHandler.fps);
  pipeHandler.updatePosition(2.5, fpsHandler.fps);
  collision.check();
  fpsHandler.updateFps(timestamp, 15); //? secont - frequency refresh

  animationId = requestAnimationFrame(loop);

  if (collision.value) {
    stopLoop();
  }
}

// Start loop
function startloop() {
  if (!ispauseing) {
    ispauseing = true;
    loop();
  }
}
// Stop loop

function stopLoop() {
  if (ispauseing) {
    ispauseing = false;
    cancelAnimationFrame(animationId);
  }
}

// Start/Stop on click
pauseDOM.addEventListener('click', () => {
  if (ispauseing) {
    stopLoop();
  } else {
    startloop();
  }
});

restartDOM.addEventListener('click', () => {
  collision.resetState();
  birdHandler.resetState();
  pipeHandler.resetState();
  startloop();
});
