import { fpsDOM } from './DOM.js';

fpsDOM.textContent = `FPS: 0`;
const fpsHandler = {
  pTimeStamp: 0,
  secondsPassed: 0,
  i: 0,
  fps: 60,
  fpsSum: 0,
  fpsAverage: 0,

  updateFps(timeStamp, performanceNow, frequency) {
    this.frequency = frequency;
    this.performanceNow = performanceNow;
    this.timeStamp = timeStamp;

    // speed sync
    timeStamp = typeof timeStamp === 'number' ? timeStamp : performanceNow;
    this.secondsPassed = (timeStamp - this.pTimeStamp) / 1000;
    // this.secondsPassed = Math.min(this.secondsPassed, 0.09); //? secure
    this.secondsPassed = Math.min(0.018, Math.abs(this.secondsPassed));

    // FPS
    // this.fps = 1000 / (timeStamp - this.pTimeStamp);
    // if (this.i == frequency) {
    //   this.fpsAverage = this.fpsSum / frequency;
    //   this.fpsSum = 0;
    //   this.i = 0;
    // } else {
    //   this.fpsSum = this.fpsSum + this.fps;
    //   this.i++;
    // }

    this.pTimeStamp = timeStamp;

    // this.setFpsCurent();
    return {
      secondsPassed: this.secondsPassed,
    };
  },

  // setFpsCurent() {
  //   fpsDOM.textContent = `FPS: ${Math.floor(this.fpsAverage)}`;
  // },
};

export default fpsHandler;
