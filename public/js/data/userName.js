import { indexDBAdd } from './indexDB.js';
import pipeHandler from '../pipes.js';
import { userNameDOM, restartDOM } from '../DOM.js';

export function updateUser(score) {
  const name = userNameDOM.value;
  indexDBAdd(name, score);
}
