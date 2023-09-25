// import { indexDBAdd } from './indexDB.js';
import { userNameDOM, restartDOM } from '../../DOM.js';
import { fetchAddUser } from '../fetch.js';

// Cancel button start if input field is empty
restartDOM.style.pointerEvents = 'none';
userNameDOM.addEventListener('input', chechNameInpur);
function chechNameInpur() {
  userNameDOM.value === ''
    ? (restartDOM.style.pointerEvents = 'none')
    : (restartDOM.style.pointerEvents = 'all');
}

export async function updateUser(score) {
  const name = userNameDOM.value;
  const newUser = { name, score };
  return fetchAddUser(newUser);
}
