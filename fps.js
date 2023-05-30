import { fpsDOM } from './DOM.js';

fpsDOM.textContent = `FPS: 0`;
const fpsHandler = {
  fps: 16,
  fpsSum: 0,
  fpsAverage: 16,
  pTimestamp: undefined,
  i: 0,

  updateFps(timestamp, frequency) {
    this.frequency = frequency;
    this.timestamp = timestamp;

    if (this.i <= this.frequency && !isNaN(this.fps)) {
      this.fpsSum = this.fpsSum + this.fps;
      this.i++;
    }
    if (this.i == this.frequency) {
      this.i = 0;
      this.fpsAverage = this.fpsSum / this.frequency;
      console.log(this.fpsAverage);
      this.fpsSum = 0;
    }

    this.fps = timestamp - this.pTimestamp;
    this.pTimestamp = timestamp;

    this.setFpsCurent();
    return {
      timestamp: this.timestamp,
      pTimestamp: this.pTimestamp,
      fps: this.timestamp,
    };
  },

  setFpsCurent() {
    fpsDOM.textContent = `FPS: ${Math.floor(1000 / this.fpsAverage)}`;
  },
};

export default fpsHandler;
