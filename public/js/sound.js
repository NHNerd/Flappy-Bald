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

function setAllSoundVolumes(volume) {
  jumpSound.volume = 0.03 * volume;
  superJumpSound.volume = 0.15 * volume;
  coffeeSound.volume = 0.3 * volume;
  drinkSound.volume = 0.1 * volume;
  collisionSound.volume = 0.1 * volume;
  gameOverSound.volume = 0.1 * volume;
}

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
        backSound.volume = 0.14;
      } else {
        backSound.volume = 0;
      }
    });
  },

  isSoundFunc() {
    soundCheckBoxDOM.addEventListener('change', () => {
      isSound = !isSound;
      if (isSound) {
        setAllSoundVolumes(1);
      } else {
        setAllSoundVolumes(0);
      }
    });
  },
};

setAllSoundVolumes(1);

backSound.loop = true;
backSound.volume = 0.14;

// screen visible stop/start audio
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    backSound.pause();
  } else {
    backSound.play();
  }
});
