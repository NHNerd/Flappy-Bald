import { zeroscoreAlertDOM, scoreDOM } from './DOM.js';

export function zeroScoreAlert(score) {
  if (score === 0) {
    zeroscoreAlertDOM.style.animation = 'ZeroscoreAlertAlert 3.6s ease-out';
    scoreDOM.style.zIndex = 1;
    setTimeout(() => {
      // clear
      scoreDOM.style.zIndex = 2;
      zeroscoreAlertDOM.style.animation = '';
    }, 4500);
  }
}
