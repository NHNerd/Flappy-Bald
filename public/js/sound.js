import { musicCheckBoxDOM, soundCheckBoxDOM } from './DOM.js';

// Ту нужны полные пути
let menu = new Audio('./public/sound/menu.mp3');
let game = new Audio('./public/sound/game.mp3');
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
  playGameMusic() {
    game.currentTime = 0;
    game.play();
  },

  pauseGameMusic() {
    game.pause();
  },
  playMenuMusic() {
    setTimeout(() => {
      menu.currentTime = 0;
      menu.play();
    }, 1000);
  },
  pauseMenuMusic() {
    menu.pause();
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
        game.volume = 0.14;
        menu.volume = 0.07;
      } else {
        game.volume = 0;
        menu.volume = 0;
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

game.loop = true;
game.volume = 0.14;
menu.loop = true;
menu.volume = 0.07;

// screen visible stop/start audio
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    game.pause();
  } else {
    game.play();
  }
});
