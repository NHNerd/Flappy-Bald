import { musicCheckBoxDOM, soundCheckBoxDOM } from './DOM.js';

let backSound = new Audio('./public/sound/back.mp3');
let gameOverSound = new Audio('./public/sound/game-over.wav');
let jumpSound = new Audio('./public/sound/pryjok-2.mp3');
let superJumpSound = new Audio('./public/sound/super-jump.mp3');
let coffeeSound = new Audio('./public/sound/coffee.mp3');
let drinkSound = new Audio('./public/sound/drink.wav');
let collisionSound = new Audio('./public/sound/collision.mp3');
let isMusic = true;
let isSound = true;
export default {
  playBackMusic() {
    backSound.currentTime = 0;
    backSound.play();
  },

  pauseBackMusic() {
    backSound.pause();
  },

  playJumpSound() {
    jumpSound.currentTime = 0; // Сбросить текущую позицию воспроизведения
    jumpSound.play();
  },
  playSuperJumpSound() {
    superJumpSound.currentTime = 0; // Сбросить текущую позицию воспроизведения
    superJumpSound.play();
  },
  playCoffeeSound() {
    coffeeSound.currentTime = 0;
    coffeeSound.play();
  },
  playDrinkSound() {
    drinkSound.currentTime = 0;
    drinkSound.play();
  },
  playCollisionSound() {
    collisionSound.currentTime = 0;
    collisionSound.play();
  },
  isEndCollisionSound() {
    collisionSound.addEventListener('ended', () => {
      gameOverSound.currentTime = 0;
      gameOverSound.play();
    });
  },

  isMusicFunc() {
    musicCheckBoxDOM.addEventListener('change', () => {
      isMusic = !isMusic;
      if (isMusic) {
        backSound.volume = 0.2;
      } else {
        backSound.volume = 0;
      }
    });
  },
  isSoundFunc() {
    soundCheckBoxDOM.addEventListener('change', () => {
      isSound = !isSound;
      if (isSound) {
        jumpSound.volume = 0.1;
        superJumpSound.volume = 0.4;
        coffeeSound.volume = 0.6;
        drinkSound.volume = 0.15;
        collisionSound.volume = 0.8;
        gameOverSound.volume = 0.8;
      } else {
        jumpSound.volume = 0;
        superJumpSound.volume = 0;
        coffeeSound.volume = 0;
        drinkSound.volume = 0;
        collisionSound.volume = 0;
        gameOverSound.volume = 0;
      }
    });
  },
};

jumpSound.volume = 0.1;
superJumpSound.volume = 0.4;
coffeeSound.volume = 0.6;
drinkSound.volume = 0.15;
collisionSound.volume = 0.8;
gameOverSound.volume = 0.8;

backSound.loop = true;
backSound.volume = 0.2;

// screen visible stop/start audio
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    backSound.pause();
  } else {
    backSound.play();
  }
});
