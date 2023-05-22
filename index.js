import birdHandler from './bird.js';
import fpsHandler from './fps.js';
import pipeHandler from './pipes.js';
import collision from './collision.js';

const pause = document.querySelector('.pause');
const restart = document.querySelector('.restart');

let animationId = undefined;
let ispauseing = false;

// handler loop
function loop(timestamp) {
  birdHandler.updatePosition(2, fpsHandler.fps);
  pipeHandler.updatePosition(2.5, fpsHandler.fps);
  collision.check();
  fpsHandler.updateFps(timestamp);

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
pause.addEventListener('click', () => {
  if (ispauseing) {
    stopLoop();
  } else {
    startloop();
  }
});

restart.addEventListener('click', () => {
  collision.resetState();
  birdHandler.resetState();
  pipeHandler.resetState();
  startloop();
});
