// import { indexDBAdd } from './indexDB.js';
import { userNameDOM, restartDOM, menuDOM } from '../../DOM.js';
import { fetchAddUser } from '../fetch.js';

//WORKAROUND: cancel sent form on enter
menuDOM.addEventListener('submit', function (e) {
  e.preventDefault();
});

// Cancel button start if input field is empty
restartDOM.style.pointerEvents = 'none';
restartDOM.style.opacity = 0.4;

userNameDOM.addEventListener('input', chechNameInpur);
function chechNameInpur() {
  if (userNameDOM.value === '') {
    restartDOM.style.pointerEvents = 'none';
    restartDOM.style.opacity = 0.4;
    restartDOM.style.animation = '';
  } else {
    restartDOM.style.pointerEvents = 'all';
    restartDOM.style.opacity = 1;
    restartDOM.style.animation = 'blinking-animation 0.5s infinite alternate';
  }
}

export async function updateUser(score) {
  const name = userNameDOM.value;
  const newUser = { name, score };
  return fetchAddUser(newUser);
}
