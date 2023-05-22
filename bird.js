const bird = document.querySelector('.bird');

function speedExMath(num, pow) {
  return Math.pow(num, pow);
}

let jump = false;

document.addEventListener('mousedown', function (event) {
  if (!event.target.classList.contains('pause')) {
    event.preventDefault(); //? off click on a button in focus
    jump = true;
  }
});
document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    event.preventDefault();
    jump = true;
  }
});

export default {
  yPos: 0,
  speedEx: 1.1,
  jumpEx: 16,

  updatePosition(speed, fps) {
    this.fps = fps;
    this.speed = speed;

    this.speedEx = speedExMath(this.speedEx, this.speedEx < 7 ? 1.08 : 1);
    this.jumpEx = speedExMath(jump ? 30 : this.jumpEx, 0.96);
    this.speed = this.speedEx - this.jumpEx;
    this.yPos += this.fps ? this.speed / (16 / this.fps) : this.speed;

    this.setBirdPosition();

    // refresh
    jump = false;
    return { yPos: this.yPos };
  },

  setBirdPosition() {
    bird.style.transform = `translateY(${this.yPos}px) rotate(${this.speed * 3 - 5}deg)`;
  },

  resetState() {
    this.yPos = 0;
    this.speedEx = 1.1;
    this.jumpEx = 16;
  },
};
