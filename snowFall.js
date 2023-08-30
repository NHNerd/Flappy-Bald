import { snowFallDOM } from './DOM.js';

export default {
  opacity: 0,
  time: Math.random(4) * 30000 + 10000,
  x: false,

  updateOpacity() {
    if (this.opacity === 0) {
      this.x = true;
      setTimeout(() => {
        if (this.x) {
          this.time = Math.random(this.time) * 30000 + 10000;
        }
        this.opacity = 0.5;
      }, this.time);
    } else {
      this.x = false;
      setTimeout(() => {
        this.opacity = 0;
      }, this.time);
    }

    this.setOpacity();
  },

  setOpacity() {
    snowFallDOM.style.opacity = this.opacity;
  },

  resetState() {
    this.opacity = 0;
    this.time = Math.random(4) * 30000 + 10000;
    this.x = false;
  },
};
