import birdHandler from './bird.js';
import fpsHandler from './fps.js';
import pipeHandler from './pipes.js';
import collision from './collision.js';
import discoBall from './discoBall.js';
import parallax from './parallax.js';
import coffee from './coffee.js';
import speach from './speach.js';
import coins from './coins.js';
import sound from './sound.js';

import { pauseDOM, restartDOM, coffeeButtonDOM, pauseMenuDOM } from './DOM.js';

let animationId = undefined;
let ispausing = false;
let performanceNow = 0;
let performanceStartLock = true;
let performanceStart;
let gameStarted = false;

restartDOM.textContent = 'start';
coffee.clickListner();
coffee.animationListner();
sound.isMusicFunc();
sound.isSoundFunc();

// handler loop
function loop(timestamp) {
  //Time on start
  if (performanceStartLock) {
    performanceStart = performance.now();
    performanceStartLock = false;
  }
  //Current time
  performanceNow = performance.now() - performanceStart;

  gameStarted = true;

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
    gameStarted = false;
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

function spaceCb(event) {
  event.preventDefault();
  birdHandler.setJumpListener(true, false);
  sound.playJumpSound();
}
function xCb(event) {
  event.preventDefault();
  birdHandler.setJumpListener(true, true);
  sound.playSuperJumpSound();
}
function escCb() {
  if (ispausing) {
    stopLoop();
    pauseMenuDOM.style.display = 'flex';
    pauseDOM.textContent = 'unpause';
  } else {
    startloop();
    pauseMenuDOM.style.display = 'none';
    pauseDOM.textContent = 'pause';
  }
}
function reset() {
  performanceStartLock = true;
  pauseDOM.style.display = 'block';
  restartDOM.textContent = 'restart';
  collision.resetState();
  birdHandler.resetState();
  pipeHandler.resetState();
  parallax.resetState();
  coffee.resetState();
  coins.resetState();
  speach.resetState();
  startloop();
  sound.playBackMusic();
  performanceStartLock = true;
  pauseDOM.style.display = 'block';
  restartDOM.textContent = 'restart';
  collision.resetState();
  birdHandler.resetState();
  pipeHandler.resetState();
  parallax.resetState();
  coffee.resetState();
  coins.resetState();
  speach.resetState();
  startloop();
  sound.playBackMusic();
}
function pauseCb() {
  if (ispausing) {
    stopLoop();
    pauseMenuDOM.style.display = 'flex';
    pauseDOM.textContent = 'unpause';
  } else {
    startloop();
    pauseMenuDOM.style.display = 'none';
    pauseDOM.textContent = 'pause';
  }
}
function coffeButtonCb() {
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
}

function throttle(func, delay) {
  let timerId;
  let isThrottled = false;

  return function (...args) {
    if (isThrottled) {
      return;
    }

    isThrottled = true;
    func.apply(this, args);

    timerId = setTimeout(() => {
      isThrottled = false;
    }, delay);
  };
}

if (window.matchMedia('(pointer: coarse)').matches) {
  document.addEventListener(
    'touchstart',
    throttle((event) => {
      spaceCb(event);
    }),
    90
  );
  restartDOM.addEventListener('touchend', () => {
    reset();
  });
  pauseDOM.addEventListener('touchend', () => {
    pauseCb();
  });
  coffeeButtonDOM.addEventListener('touchstart', () => {
    coffeButtonCb();
  });
} else {
  document.addEventListener(
    'keydown',
    throttle((event) => {
      if (event.key === ' ' || event.key === 'Spacebar') {
        spaceCb(event);
      } else if (event.key === 'x' || event.key === 'X') {
        xCb(event);
      } else if (event.key === 'Escape' && gameStarted) {
        escCb();
      }

      let x = 0;
      if (
        (coffeeButtonDOM.style.display === 'block' && event.key === 'c') ||
        event.key === 'C'
      ) {
        if (ispausing) {
          if (collision.coffeeScore > 0) {
            stopLoop();
            coffeeButtonDOM.style.display = 'none';
            coffeeButtonDOM.textContent = 'resume';
            coins.resetCoffeeScoreChange();
            sound.playDrinkSound();
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
    }, 80)
  );

  pauseDOM.addEventListener('click', () => {
    pauseCb();
  });

  coffeeButtonDOM.addEventListener('click', () => {
    coffeButtonCb();
  });

  restartDOM.addEventListener('click', () => {
    reset();
  });
}

//! Register serviceWorker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('service-worker.js')
    .then(function (registration) {
      console.log('Service Worker зарегистрирован успешно:', registration);
    })
    .catch(function (error) {
      console.log('Ошибка регистрации Service Worker:', error);
    });
}
