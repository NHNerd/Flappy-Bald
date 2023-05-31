import { birdDOM } from './DOM.js';

let jumpListener = false;

// sprite animation
birdDOM.style.animation = 'dance 0.85s steps(9) infinite';
let x = true;
document.addEventListener('mousedown', function (event) {
  if (x) {
    birdDOM.style.animation = 'fly-dance 0.8s steps(9) 1';
    setTimeout(() => {
      birdDOM.style.animation = 'fly 0.4s steps(6) infinite';
    }, 800);
    x = false;
  }

  if (!event.target.classList.contains('pause')) {
    event.preventDefault(); //? off click on a button in focus
    jumpListener = true;
  }
});

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    event.preventDefault();
    jumpListener = true;
  }
});

// jump
let powerJump = 3;
let conclusionJump = 0;
let accelerationJump = 13; //? handler
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

  updatePosition(speed, secondsPassed) {
    this.secondsPassed = secondsPassed;
    this.speed = speed;

    // waite before change animation
    if (this.beforeStart < 40) {
      this.beforeStart += 1;
      return;
    }

    accelerationJumpFunc(secondsPassed); //? return: conclusionJump

    this.speedCurrent = (this.speed - conclusionJump) * secondsPassed;
    this.yPos += this.speedCurrent;

    this.setBirdPosition();

    // refresh
    jumpListener = false;
    return { yPos: this.yPos, beforeStart: this.beforeStart };
  },

  setBirdPosition() {
    // ${this.speed * 3 - 5}
    birdDOM.style.transform = `translateY(${this.yPos}px) 
    rotate(${this.speedCurrent + 5}deg)`;
  },

  resetState() {
    // birdDOM.style.animation = 'dance 0.85s steps(9) infinite';
    powerJump = 3;
    this.yPos = 0;
    this.speedCurrent = 0;
    this.beforeStart = 0;

    this.setBirdPosition();
  },
};
