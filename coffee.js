import { coffeeButtonDOM, birdDOM, coffeeCountDOM } from './DOM.js';
import bird from './bird.js';
import collision from './collision.js';
import fpsHandler from './fps.js';

let animationId = undefined;

export default {
  isCoffeeClick: false,
  coffeeScore: 0,
  birdYPoseOld: 0,
  birdYPoseAdd: 0,
  birdYPoseCurrent: -6,
  coffeeDrinkDelay: 0,
  changeAnimation: 0,
  coffeeIsOver: false,

  clickListner() {
    coffeeButtonDOM.addEventListener('click', () => {
      if (!this.isCoffeeClick) {
        this.startloop();
        this.isCoffeeClick = true;
      }
    });
    document.addEventListener('keydown', (event) => {
      if (coffeeButtonDOM.style.display === 'block') {
        if (event.code === 'KeyC') {
          if (!this.isCoffeeClick) {
            this.startloop();
            this.isCoffeeClick = true;
          }
        }
      }
    });
  },
  animationListner() {
    birdDOM.addEventListener('animationend', () => {
      if (event.animationName === 'fly-coffee') {
        birdDOM.style.animation = 'coffee-cigarette 1s steps(5) 1';
      }
      if (
        event.animationName === 'coffee-cigarette' ||
        event.animationName === 'coffee' ||
        event.animationName === 'cigarette'
      ) {
        birdDOM.style.animation =
          collision.coffeeScore == 0
            ? 'coffee-fly 0.55s steps(8) 1'
            : (birdDOM.style.animation = 'relax 1s steps(9) 1');
      }
      if (event.animationName === 'relax') {
        if (Math.random(2) * 2 > 1) {
          birdDOM.style.animation = 'coffee 2.2s steps(9) 1';

          collision.coffeeScore -= 1;
          coffeeCountDOM.textContent = `x ${collision.coffeeScore}`;
        } else {
          birdDOM.style.animation = 'cigarette 2.2s steps(9) 1';
        }
      }
      if (event.animationName === 'coffee-fly') {
        birdDOM.style.animation = 'fly 0.4s steps(6) infinite';
        this.coffeeIsOver = true;
      }
    });
  },
  coffeeDisplay() {
    if (collision.coffeeScore > 0) {
      if (collision.value) {
        coffeeButtonDOM.style.display = 'none';
      } else {
        coffeeButtonDOM.style.display = 'block';
      }
    } else {
      coffeeButtonDOM.style.display = 'none';
    }
  },

  // animation handler
  coffeeLoop() {
    console.log(1);
    if (this.birdYPoseCurrent <= -5) {
      this.birdYPoseAdd += 200 * fpsHandler.secondsPassed;
    } else {
      // Sprite animation
      if (this.changeAnimation == 0) {
        birdDOM.style.animation = 'fly-coffee 0.9s steps(9) 1';
        this.changeAnimation += 1;
      }
    }

    if (this.coffeeIsOver) {
      this.birdYPoseCurrent -= 200 * fpsHandler.secondsPassed;
    } else {
      this.birdYPoseOld = bird.yPos;
      this.birdYPoseCurrent = this.birdYPoseOld + this.birdYPoseAdd;
    }

    this.setBirdPosition();

    if (this.birdYPoseCurrent >= this.birdYPoseOld) {
      animationId = requestAnimationFrame(this.coffeeLoop.bind(this));
    } else {
      coffeeButtonDOM.style.display = 'block';
    }
  },

  // Start loop
  startloop() {
    animationId = requestAnimationFrame(this.coffeeLoop.bind(this));
  },
  // // Stop loop
  // stopLoop() {
  //   this.isCoffeeClick = false;
  //   cancelAnimationFrame(animationId);
  // },

  setBirdPosition() {
    birdDOM.style.transform = `translateY(${this.birdYPoseCurrent}px)`;
  },
  resetState() {
    this.isCoffeeClick = false;
    this.coffeeScore = 0;
    this.birdYPoseOld = 0;
    this.birdYPoseAdd = 0;
    this.birdYPoseCurrent = -6;
    this.coffeeDrinkDelay = 0;
    this.changeAnimation = 0;
    this.coffeeIsOver = false;
  },
};
