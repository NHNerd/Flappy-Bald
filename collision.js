import { birdDOM, pipeUpDOM, pipeDownDOM, floorDOM, menuDOM } from './DOM.js';

const collision = {
  value: false,
  i: 0,

  check() {
    // waite before change animation
    // if (this.i < 40) {
    //   this.i += 1;
    //   return;
    // }

    // Bbox
    const birdRect = birdDOM.getBoundingClientRect();
    const birdRectRight = birdRect.right - 35;
    const birdRectLeft = birdRect.left + 80;
    const birdRectBottom = birdRect.bottom - 55;
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

    if (this.value) {
      menuDOM.style.display = 'block';
    } else {
      menuDOM.style.display = 'none';
    }
  },
  resetState() {
    this.value = false;
    this.i = 0;
  },
};

export default collision;
