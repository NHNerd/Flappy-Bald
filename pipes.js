import {
  pipes1DOM,
  pipes2DOM,
  pipeUpDOM,
  pipeDownDOM,
  tabletDOM,
  floorDOM,
  scoreDOM,
} from './DOM.js';

const random50 = Math.random(2) * 50;
const random50Second = Math.random(random50) * 50;

const pipeUpHeight1 = `${random50 + 10}%`;
const pipeDownHeight1 = `${50 - random50 + 10}%`;
const pipeUpHeight2 = `${random50Second + 10}%`;
const pipeDownHeight2 = `${50 - random50Second + 10}%`;

pipeUpDOM.forEach((pipeUpElement, index) => {
  if (index) {
    pipeUpElement.style.height = pipeUpHeight1;
  } else {
    pipeUpElement.style.height = pipeUpHeight2;
  }
});
pipeDownDOM.forEach((pipeDownElement, index) => {
  if (index) {
    pipeDownElement.style.height = pipeDownHeight1;
  } else {
    pipeDownElement.style.height = pipeDownHeight2;
  }
});

scoreDOM.textContent = 0;

export default {
  xPos1: 0,
  xPos2: -315,
  tabletPos: 0,
  floorPos: 0,
  score: 0,
  i: 0,

  updatePosition(speed, fps) {
    // waite before change animation
    if (this.i < 40) {
      this.i += 1;
      return;
    }

    this.speed = speed;
    this.fps = fps;
    if (this.xPos1 > 560 + 64) {
      this.xPos1 = 0;
      this.score += 1;
    }
    if (this.xPos2 > 560 + 64) {
      this.xPos2 = 0;
      this.score += 1;
    }
    if (this.floorPos > 559) {
      this.floorPos = 0;
    }

    if (this.i < 250) {
      this.i += 1;
      this.xPos1 = -3;
      this.xPos2 = -318;
    }
    this.xPos1 += this.fps ? this.speed / (16 / this.fps) : this.speed;
    this.xPos2 += this.fps ? this.speed / (16 / this.fps) : this.speed;
    this.tabletPos += this.fps ? this.speed / (16 / this.fps) : this.speed;
    this.floorPos += this.fps ? this.speed / (16 / this.fps) : this.speed;
    this.setPipePosition();
    return {
      xPos1: this.xPos1,
      xPos2: this.xPos2,
    };
  },

  setPipePosition() {
    pipes1DOM.style.transform = `translateX(${-this.xPos1}px)`;
    pipes2DOM.style.transform = `translateX(${-this.xPos2}px)`;
    tabletDOM.style.transform = `translateX(${-this.tabletPos}px)`;
    floorDOM.style.transform = `translateX(${-this.floorPos}px)`;

    scoreDOM.textContent = this.score;
  },

  resetState() {
    this.xPos1 = 0;
    this.xPos2 = -315;
    this.score = 0;
  },
};
