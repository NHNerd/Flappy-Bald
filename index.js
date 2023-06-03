import birdHandler from './bird.js';
import fpsHandler from './fps.js';
import pipeHandler from './pipes.js';
import collision from './collision.js';
import discoBall from './discoBall.js';
import parallax from './parallax.js';
import coffee from './coffee.js';
import speach from './speach.js';
import coins from './coins.js';

import { pauseDOM, restartDOM, coffeeButtonDOM } from './DOM.js';

let animationId = undefined;
let ispausing = false;
let performanceNow = 0;
let performanceStartLock = true;
let performanceStart;

restartDOM.textContent = 'start';
coffee.clickListner();
coffee.animationListner();

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
  coins.coinsCounter();
  speach.displayNone();

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
  let x = 0;
  if (coffeeButtonDOM.style.display === 'block') {
    if (event.code === 'KeyC') {
      if (ispausing) {
        if (collision.coffeeScore > 0) {
          stopLoop();
          coffeeButtonDOM.style.display = 'none';
          coffeeButtonDOM.textContent = 'resume';
          coins.resetCoffeeScoreChange();
          x = 1;
        }
      } else {
        if ((x = 1)) {
          startloop();
          coffeeButtonDOM.textContent = 'drink';
          coffee.resetState();
          x = 0;
        }
      }
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
    coffeeButtonDOM.style.display = 'none';
    coffeeButtonDOM.textContent = 'resume';
    coins.resetCoffeeScoreChange();
  } else {
    startloop();
    coffeeButtonDOM.textContent = 'drink';
    coffee.resetState();
  }
});

restartDOM.addEventListener('click', () => {
  performanceStartLock = true;
  restartDOM.textContent = 'restart';
  collision.resetState();
  birdHandler.resetState();
  pipeHandler.resetState();
  parallax.resetState();
  coffee.resetState();
  coins.resetState();
  speach.resetState();
  startloop();
});
