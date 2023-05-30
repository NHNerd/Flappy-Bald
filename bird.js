import { birdDOM } from './DOM.js';

function speedExMath(num, pow) {
  return Math.pow(num, pow);
}
function fpsNormalaze(varable, fps) {
  return varable / (16 / fps);
}

let jump = false;
birdDOM.style.animation = 'dance 0.85s steps(9) infinite';

// sprite animation
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
    jump = true;
  }
});

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    event.preventDefault();
    jump = true;
  }
});

export default {
  yPos: 0,
  speedEx: 1.1,
  jumpEx: 16,
  beforeStart: 0,

  updatePosition(speed, fps) {
    this.fps = fps;
    this.speed = speed;

    // waite before change animation
    if (this.beforeStart < 40) {
      this.beforeStart += 1;
      return;
    }

    this.speedEx = speedExMath(this.speedEx, this.speedEx < 7 ? 1.08 : 1);
    this.jumpEx = speedExMath(jump ? 30 : this.jumpEx, 0.96);
    this.speed = this.speedEx - this.jumpEx;
    this.yPos += this.fps ? this.speed : this.speed;

    this.setBirdPosition();

    // refresh
    jump = false;
    return { yPos: this.yPos, beforeStart: this.beforeStart };
  },

  setBirdPosition() {
    // ${this.speed * 3 - 5}
    birdDOM.style.transform = `translateY(${this.yPos}px) rotate(${this.speed - 5}deg)`;
  },

  resetState() {
    this.yPos = -270;
    this.speedEx = 1.1;
    this.jumpEx = 16;
  },
};
