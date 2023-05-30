import { birdDOM, pipeUpDOM, pipeDownDOM, floorDOM, menuDOM } from './DOM.js';

const collision = {
  value: false,

  check() {
    const birdRect = birdDOM.getBoundingClientRect();
    const birdRectRight = birdRect.right - 22;
    const birdRectLeft = birdRect.left + 20;
    const birdRectBottom = birdRect.bottom - 50;
    const birdRectTop = birdRect.top + 35;

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

    if (this.value) {
      menuDOM.style.display = 'block';
    } else {
      menuDOM.style.display = 'none';
    }
  },
  resetState() {
    this.value = false;
  },
};

export default collision;
