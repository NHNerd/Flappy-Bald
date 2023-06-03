import { speachDOM } from './DOM.js';
import bird from './bird.js';

export default {
  i: 0,
  display: 'none',

  displayBlock() {
    this.display = 'block';
    speachDOM.style.display = this.display;
    speachDOM.style.transform = `translateY(${bird.yPos}px)`;
  },

  displayNone() {
    if (this.i == 0) {
      this.display = 'none';
      speachDOM.style.display = this.display;
      speachDOM.style.transform = `translateY(${bird.yPos}px)`;
      this.i += 1;
    }
  },

  resetState() {
    this.i = 0;
    this.display = 'none';
  },
};
