const fpsDOM = document.querySelector('.fps');

fpsDOM.textContent = `FPS: 0`;
const fpsHandler = {
  fps: 16,
  pTimestamp: undefined,

  updateFps(timestamp) {
    this.timestamp = timestamp;
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
    fpsDOM.textContent = `FPS: ${Math.floor(1000 / this.fps)}`;
  },
};

export default fpsHandler;
