import { birdDOM } from './DOM.js';

let jumpListener = false;
let isSuperJump = false;

// sprite animation
birdDOM.style.animation = 'dance 0.85s steps(9) infinite';

// jump
let powerJump = 3;
let conclusionJump = 0;
let accelerationJump = 13; //? handler
let isFirstJump = true;

function accelerationJumpFunc(secondsPassed) {
  if (jumpListener) {
    powerJump = 3;
  }
  powerJump = powerJump - 2.8 * secondsPassed; //? handler
  powerJump = Math.max(0, powerJump);
  conclusionJump = Math.pow(accelerationJump, powerJump);
  return { conclusionJump: conclusionJump };
}

export default {
  yPos: 0,
  speedCurrent: 0,
  beforeStart: 0,
  superJump: 100,

  setJumpListener(isJump, isSuper) {
    jumpListener = isJump;
    isSuperJump = isSuper;
  },

  updatePosition(speed, secondsPassed) {
    this.secondsPassed = secondsPassed;
    this.speed = speed;

    // waite before change animation
    if (this.beforeStart < 40) {
      this.beforeStart += 1;
      return;
    }
    if (isSuperJump) {
      this.superJump = 1.085;
    }
    accelerationJumpFunc(secondsPassed); //? return: conclusionJump

    // limited height of fly
    if (this.yPos < -800) {
      this.yPos = -800;
    }
    this.speedCurrent = (this.speed - conclusionJump) * secondsPassed;
    this.yPos += this.speedCurrent;

    this.setBirdPosition();

    // refresh
    jumpListener = false;
    this.superJump = 100;
    return { yPos: this.yPos, beforeStart: this.beforeStart };
  },

  setBirdPosition() {
    // ${this.speed * 3 - 5}

    birdDOM.style.transform = `translate3d(0, ${this.yPos}px, 0)
    rotate(${((this.speed - conclusionJump) / this.superJump) * 0.9 + 5}deg)`;
  },

  resetState() {
    powerJump = 3;
    accelerationJump = 13;
    isFirstJump = true;
    this.yPos = 0;
    this.speedCurrent = 0;
    this.beforeStart = 0;

    this.setBirdPosition();
  },
};
