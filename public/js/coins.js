import { coinsDOM } from './DOM.js';
import collision from './collision.js';

coinsDOM.textContent = 'x 200';
export default {
  coinsCount: 200,
  coffeeScoreChange: 0,

  coinsCounter() {
    if (collision.coffeeScore > this.coffeeScoreChange) {
      this.coffeeScoreChange += 1;

      this.coinsCount -= 27;
      coinsDOM.textContent = `x ${this.coinsCount}`;
    }
  },

  resetState() {
    this.coinsCount = 200;
    this.coffeeScoreChange = 0;
    coinsDOM.textContent = `x ${this.coinsCount}`;
  },
  resetCoffeeScoreChange() {
    this.coffeeScoreChange = 0;
  },
};
