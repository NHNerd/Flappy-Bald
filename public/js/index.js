import birdHandler from './bird.js';
import fpsHandler from './fps.js';
import pipeHandler from './pipes.js';
import collision from './collision.js';
import discoBall from './discoBall.js';
import snowFall from './snowFall.js';
import parallax from './parallax.js';
import coffee from './coffee.js';
import speach from './speach.js';
import coins from './coins.js';
import sound from './sound.js';

import { pauseDOM, restartDOM, coffeeButtonDOM, pauseMenuDOM, birdDOM } from './DOM.js';

let animationId = undefined;
let ispausing = false;
let performanceNow = 0;
let performanceStartLock = true;
let performanceStart;
let gameStarted = false;
let isDrinking = false;
let isCollisionPipe = true;

restartDOM.textContent = 'start';
// coffee.clickListner();
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
    collision.check(isCollisionPipe);
  }

  if (discoBall.yPosDisco >= -410) {
    discoBall.updatePosition();
  }
  snowFall.updateOpacity();

  parallax.updatePosition(fpsHandler.secondsPassed);
  birdHandler.updatePosition(440, fpsHandler.secondsPassed);
  pipeHandler.updatePosition(200, fpsHandler.secondsPassed, isCollisionPipe);
  coffee.coffeeDisplay();
  coins.coinsCounter();
  speach.displayNone();
  fpsHandler.updateFps(timestamp, performanceNow, 35); //? secont - frequency refresh

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
let x = true;
function firstAnimationCb() {
  if (x) {
    birdDOM.style.animation = 'dance-fly 0.8s steps(9) 1';
    setTimeout(() => {
      birdDOM.style.animation = 'fly 0.4s steps(6) infinite';
    }, 800);
    x = false;
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
    if (collision.coffeeScore > 0) {
      stopLoop();
      coffeeButtonDOM.style.display = 'none';
      coffeeButtonDOM.textContent = 'resume';
      coins.resetCoffeeScoreChange();
      sound.playDrinkSound();
      isDrinking = true;
      coffee.startloop(); // Start another loop from coffee.js
    }
  } else {
    if (isDrinking) {
      startloop();

      coffeeButtonDOM.textContent = 'drink';
      coffee.resetState();
      isDrinking = false;
    }
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
  snowFall.resetState();
  startloop();
  sound.playGameMusic();
  sound.pauseMenuMusic();
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
  let swipeStartYPos = 0;
  let swipeCurrentYPos = 0;
  let xCbCalled = false;

  document.addEventListener(
    'touchstart',
    throttle((event) => {
      if (
        !event.target.classList.contains('pause') &&
        !event.target.classList.contains('restart') &&
        !event.target.classList.contains('coffee-button') &&
        !event.target.classList.contains('user-name')
      ) {
        event.preventDefault(); //? off click on a button in focus
        spaceCb(event);
        swipeStartYPos = event.changedTouches[0].pageY;
      }
    }),
    100
  );

  //Mobile
  document.addEventListener('touchmove', (event) => {
    swipeCurrentYPos = event.changedTouches[0].pageY;
    if (swipeStartYPos > swipeCurrentYPos + 100 && !xCbCalled) {
      xCb(event);
      xCbCalled = true;
    }
    if (
      swipeStartYPos < swipeCurrentYPos - 160 &&
      !xCbCalled &&
      coffeeButtonDOM.style.display === 'block'
    ) {
      coffeButtonCb();
      xCbCalled = true;

      isCollisionPipe = false;
      setTimeout(() => {
        isCollisionPipe = true;
      }, 1650);
    }
  });
  document.addEventListener('touchend', () => {
    xCbCalled = false;
  });

  restartDOM.addEventListener('touchend', () => {
    reset();
    firstAnimationCb();
  });
  pauseDOM.addEventListener('touchend', () => {
    if (isDrinking === false) {
      pauseCb();
    }
  });
  coffeeButtonDOM.addEventListener('touchstart', () => {
    coffeButtonCb();
    // Off collision per 3 second
    isCollisionPipe = false;
    setTimeout(() => {
      isCollisionPipe = true;
    }, 1650);
  });
} else {
  document.addEventListener('mousedown', function (event) {
    if (!event.target.classList.contains('pause') && !event.target.classList.contains('coffee-button')) {
      if (gameStarted) {
        event.preventDefault(); //? off click on a button in focus
        spaceCb(event);
      }
    }
  });

  //PC
  if (false) {
  }
  document.addEventListener(
    'keydown',
    throttle((event) => {
      if (
        (event.key === 'NumpadEnter' || event.key === 'Enter') &&
        !gameStarted &&
        restartDOM.style.pointerEvents === 'all'
      ) {
        reset();
        firstAnimationCb();
      }
      if ((event.key === ' ' || event.key === 'Spacebar') && gameStarted) {
        spaceCb(event);
      } else if ((event.key === 'x' || event.key === 'X' || event.code === 'KeyX') && gameStarted) {
        xCb(event);
      } else if (event.key === 'Escape' && gameStarted && isDrinking === false) {
        pauseCb();
      }

      if (
        coffeeButtonDOM.style.display === 'block' &&
        (event.key === 'c' || event.key === 'C' || event.code === 'KeyC')
      ) {
        coffeButtonCb();
        // Off collision per 3 second
        isCollisionPipe = false;
        setTimeout(() => {
          isCollisionPipe = true;
        }, 1450);
      }
    }, 80)
  );

  pauseDOM.addEventListener('click', () => {
    if (isDrinking === false) {
      pauseCb();
    }
  });

  coffeeButtonDOM.addEventListener('click', () => {
    coffeButtonCb();
    isCollisionPipe = false;
    setTimeout(() => {
      isCollisionPipe = true;
    }, 1450);
  });

  restartDOM.addEventListener('click', () => {
    reset();
    firstAnimationCb();
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
