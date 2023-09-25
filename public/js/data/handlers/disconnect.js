import { containerMongoDBFalseDOM } from '../../DOM.js';

export function disconectHandelr(is) {
  if (is === true) {
    containerMongoDBFalseDOM.style.opacity = 1;
  } else {
    containerMongoDBFalseDOM.style.opacity = 0;
  }
}
