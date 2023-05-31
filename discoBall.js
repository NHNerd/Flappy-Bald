import { discoBallDOM } from './DOM.js';

export default {
  yPosDisco: 0,
  iDisco: 0,

  updatePosition() {
    // waite before change animation
    if (this.iDisco < 40) {
      this.iDisco += 1;
      return;
    }

    this.yPosDisco -= 10;
    if (this.yPosDisco < -400) {
      discoBallDOM.style.display = 'none';
    }
    this.setPipePosition();
  },

  setPipePosition() {
    discoBallDOM.style.transform = `translateY(${this.yPosDisco}px)`;
  },

  resetState() {
    this.yPosDisco = 0;
    this.iDisco = 0;
  },
};
