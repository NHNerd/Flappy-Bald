import { getAllUsers } from './indexDB.js';
import { recordTableNamesDOM, recordTableScoreDOM } from '../DOM.js';

export function renerRecordTable() {
  // Remove old DOM elements
  recordTableNamesDOM.innerHTML = '';
  recordTableScoreDOM.innerHTML = '';

  getAllUsers((users) => {
    users.forEach((user) => {
      const userName = document.createElement('li');
      const userScore = document.createElement('li');

      userName.textContent = user.name;
      userScore.textContent = user.score;

      userName.classList.add('record-table-name');
      userScore.classList.add('record-table-score');

      recordTableNamesDOM.appendChild(userName);
      recordTableScoreDOM.appendChild(userScore);
    });
  });
}

renerRecordTable();
