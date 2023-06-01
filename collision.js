import {
  birdDOM,
  pipeUpDOM,
  pipeDownDOM,
  floorDOM,
  menuDOM,
  coffeeDOM,
  coffeeCountDOM,
} from './DOM.js';

import coffee from './coffee.js';

const collision = {
  value: false,
  i: 0,
  coffeeScore: 0,

  check() {
    // Bbox
    const birdRect = birdDOM.getBoundingClientRect();
    const birdRectRight = birdRect.right - 35;
    const birdRectLeft = birdRect.left + 80;
    const birdRectBottom = birdRect.bottom - 59;
    const birdRectTop = birdRect.top + 39;

    pipeUpDOM.forEach((pipeUpElement) => {
      const pipeUpRect = pipeUpElement.getBoundingClientRect();
      if (
        birdRectRight > pipeUpRect.left &&
        birdRectLeft < pipeUpRect.right &&
        birdRectBottom > pipeUpRect.top &&
        birdRectTop < pipeUpRect.bottom
      ) {
        console.log('Bird collided with pipeUp!');
        this.value = true;
      }
    });

    pipeDownDOM.forEach((pipeDownElement) => {
      const pipeDownRect = pipeDownElement.getBoundingClientRect();
      if (
        birdRectRight > pipeDownRect.left &&
        birdRectLeft < pipeDownRect.right &&
        birdRectBottom > pipeDownRect.top &&
        birdRectTop < pipeDownRect.bottom
      ) {
        this.value = true;
        console.log('Bird collided with pipeDown!');
      }
    });

    const floorRect = floorDOM.getBoundingClientRect();
    if (birdRectBottom > floorRect.top) {
      this.value = true;
      console.log('Bird collided with floor!');
    }
    const coffeeDOMRect = coffeeDOM.getBoundingClientRect();
    if (
      birdRectRight > coffeeDOMRect.left &&
      birdRectLeft < coffeeDOMRect.right &&
      birdRectBottom > coffeeDOMRect.top &&
      birdRectTop < coffeeDOMRect.bottom
    ) {
      coffee.coffeeScore += 1;
      this.coffeeScore = coffee.coffeeScore;
      coffeeCountDOM.textContent = `x ${this.coffeeScore}`;
      coffeeDOM.style.display = 'none';
    }

    if (this.value) {
      menuDOM.style.display = 'block';
    } else {
      menuDOM.style.display = 'none';
    }
  },
  resetState() {
    this.value = false;
    this.i = 0;
    coffeeCountDOM.textContent = `x 0`;
    this.coffeeScore = 0;
  },
};

export default collision;
