const pipe = document.querySelector('.pipes');
const pipe2 = document.querySelector('.pipes2');
const pipeUpElements = document.querySelectorAll('.pipeUp');
const pipeDownElements = document.querySelectorAll('.pipeDown');
const scoreElement = document.querySelector('.score');

const random50 = Math.random(2) * 50;
const random50Second = Math.random(random50) * 50;

const pipeUpHeight1 = `${random50 + 10}%`;
const pipeDownHeight1 = `${50 - random50 + 10}%`;
const pipeUpHeight2 = `${random50Second + 10}%`;
const pipeDownHeight2 = `${50 - random50Second + 10}%`;

pipeUpElements.forEach((pipeUpElement, index) => {
  if (index) {
    pipeUpElement.style.height = pipeUpHeight1;
  } else {
    pipeUpElement.style.height = pipeUpHeight2;
  }
});
pipeDownElements.forEach((pipeDownElement, index) => {
  if (index) {
    pipeDownElement.style.height = pipeDownHeight1;
  } else {
    pipeDownElement.style.height = pipeDownHeight2;
  }
});

scoreElement.textContent = 0;
export default {
  xPos1: 0,
  xPos2: -315,
  score: 0,

  updatePosition(speed, fps) {
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

    this.xPos1 += this.fps ? this.speed / (16 / this.fps) : this.speed;
    this.xPos2 += this.fps ? this.speed / (16 / this.fps) : this.speed;
    this.setPipePosition();
    return {
      xPos1: this.xPos1,
      xPos2: this.xPos2,
    };
  },

  setPipePosition() {
    pipe.style.transform = `translateX(${-this.xPos1}px)`;
    pipe2.style.transform = `translateX(${-this.xPos2}px)`;
    scoreElement.textContent = this.score;
  },

  resetState() {
    this.xPos1 = 0;
    this.xPos2 = -315;
    this.score = 0;
  },
};
