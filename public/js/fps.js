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

    this.pTimeStamp = timeStamp;

    return {
      secondsPassed: this.secondsPassed,
    };
  },
};

export default fpsHandler;
