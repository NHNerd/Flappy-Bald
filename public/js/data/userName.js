import { indexDBAdd } from './indexDB.js';
import { userNameDOM, restartDOM } from '../DOM.js';

// Cancel button start if input field is empty
restartDOM.style.pointerEvents = 'none';
userNameDOM.addEventListener('input', chechNameInpur);
function chechNameInpur() {
  userNameDOM.value === ''
    ? (restartDOM.style.pointerEvents = 'none')
    : (restartDOM.style.pointerEvents = 'all');
}

export function updateUser(score) {
  const name = userNameDOM.value;
  indexDBAdd(name, score);
}
