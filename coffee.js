import { coffeeButtonDOM, birdDOM, coffeeCountDOM } from './DOM.js';
import bird from './bird.js';
import collision from './collision.js';

let animationId = undefined;

export default {
  isCoffeeClick: false,
  coffeeScore: 0,
  birdYPoseOld: 0,
  birdYPoseAdd: 0,
  birdYPoseCurrent: 0,

  clickListner() {
    coffeeButtonDOM.addEventListener('click', () => {
      if (!this.isCoffeeClick) {
        this.startloop();
        this.isCoffeeClick = true;
      }
    });
  },

  coffeeDisplay() {
    if (collision.coffeeScore > 0) {
      coffeeButtonDOM.style.display = 'block';
    } else {
      coffeeButtonDOM.style.display = 'none';
    }
  },

  // animation handler
  coffeeLoop() {
    console.log('W A R N I N G   cofee loop   W A R N I N G ');

    if (this.birdYPoseCurrent <= 0) {
      this.birdYPoseAdd += 3;
    } else {
      if (collision.coffeeScore > 0) {
        collision.coffeeScore -= 1;
        coffeeCountDOM.textContent = `x ${collision.coffeeScore}`;
      }
    }

    this.birdYPoseOld = bird.yPos;
    this.birdYPoseCurrent = this.birdYPoseOld + this.birdYPoseAdd;

    this.setBirdPosition();

    if (collision.coffeeScore != 0) {
      animationId = requestAnimationFrame(this.coffeeLoop.bind(this));
    }
  },

  // Start loop
  startloop() {
    animationId = requestAnimationFrame(this.coffeeLoop.bind(this));
  },
  // Stop loop
  stopLoop() {
    console.log('COFFEE');
    this.isCoffeeClick = false;
    cancelAnimationFrame(animationId);
  },

  setBirdPosition() {
    // ${this.speed * 3 - 5}
    birdDOM.style.transform = `translateY(${this.birdYPoseCurrent}px)`;
  },
  resetState() {
    this.isCoffeeClick = false;
    this.coffeeScore = 0;
  },
};
