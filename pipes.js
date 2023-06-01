import {
  pipes1DOM,
  pipes2DOM,
  pipeUpDOM,
  pipeDownDOM,
  coffeeDOM,
  tabletDOM,
  floorDOM,
  scoreDOM,
} from './DOM.js';

// Random pipes high
let pipeUpHeight1 = 0;
let pipeDownHeight1 = 0;
let pipeUpHeight2 = 0;
let pipeDownHeight2 = 0;
let pipeUpHeight;
let CoffeeDisplayrandom = 1;

function pipesRandomHigh1() {
  let random = Math.random(3) * 40;

  pipeUpHeight1 = `${random + 10}%`;
  pipeDownHeight1 = `${40 - random + 10}%`;

  pipeUpDOM.forEach((pipeUpElement, index) => {
    if (index) {
      pipeUpElement.style.height = pipeUpHeight1;
      //for coffee position
      pipeUpHeight = pipeUpElement.offsetHeight;
      CoffeeDisplayrandom = Math.random(pipeUpHeight) * 1.8;
      if (CoffeeDisplayrandom >= 1) {
        coffeeDOM.style.display = 'block';
      } else {
        coffeeDOM.style.display = 'none';
      }
    }
  });
  pipeDownDOM.forEach((pipeDownElement, index) => {
    if (index) {
      pipeDownElement.style.height = pipeDownHeight1;
    }
  });
}

function pipesRandomHigh2() {
  let randomSecond = Math.random(4) * 40;

  pipeUpHeight2 = `${randomSecond + 10}%`;
  pipeDownHeight2 = `${40 - randomSecond + 10}%`;

  pipeUpDOM.forEach((pipeUpElement, index) => {
    if (!index) {
      pipeUpElement.style.height = pipeUpHeight2;
    }
  });
  pipeDownDOM.forEach((pipeDownElement, index) => {
    if (!index) {
      pipeDownElement.style.height = pipeDownHeight2;
    }
  });
}

pipesRandomHigh2.pipeUpHeight;
pipesRandomHigh1();
pipesRandomHigh2();

scoreDOM.textContent = 0;

export default {
  xPos1: 0,
  xPos2: -315,
  tabletPos: 0,
  floorPos: 0,
  score: 0,
  i: 0,

  updatePosition(speed, secondsPassed) {
    // waite before change animation
    if (this.i < 20) {
      this.i += 90 * secondsPassed;
      return;
    }

    this.speed = speed;
    this.secondsPassed = secondsPassed;
    if (this.xPos1 > 560 + 64) {
      this.xPos1 = 0;
      this.score += 1;
      pipesRandomHigh2();
    }
    if (this.xPos2 > 560 + 64) {
      this.xPos2 = 0;
      this.score += 1;
      pipesRandomHigh1();
    }

    if (this.floorPos > 559) {
      this.floorPos = 0;
    }

    //first start delay
    if (this.i < 300) {
      this.i += 100 * secondsPassed;
      this.xPos1 = -3;
      this.xPos2 = -318;
    }
    this.xPos1 += this.speed * secondsPassed;
    this.xPos2 += this.speed * secondsPassed;
    this.tabletPos += this.speed * secondsPassed;
    this.floorPos += this.speed * secondsPassed;
    this.setPipePosition();
    return {
      xPos1: this.xPos1,
      xPos2: this.xPos2,
    };
  },

  setPipePosition() {
    pipes1DOM.style.transform = `translateX(${-this.xPos1}px)`;
    pipes2DOM.style.transform = `translateX(${-this.xPos2}px)`;
    coffeeDOM.style.transform = `translate(${-this.xPos2}px, ${pipeUpHeight + 100}px)`;
    tabletDOM.style.transform = `translateX(${-this.tabletPos}px)`;
    floorDOM.style.transform = `translateX(${-this.floorPos}px)`;
    scoreDOM.textContent = this.score;
  },

  resetState() {
    this.i = 0;
    this.xPos1 = 0;
    this.xPos2 = -315;
    this.floorPos = 0;
    this.tabletPos = 0;
    this.score = 0;

    this.setPipePosition();
  },
};
