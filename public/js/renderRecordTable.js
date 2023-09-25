// import { getAllUsers, topUsersIDB } from './data/indexDB.js';
import { recordTableNamesDOM, recordTableScoreDOM } from './DOM.js';
import { topUsersMDB, fetchGetUsers } from './data/fetch.js';

async function renerRecordTable() {
  // Remove old DOM elements
  recordTableNamesDOM.innerHTML = '';
  recordTableScoreDOM.innerHTML = '';
  await fetchGetUsers();

  topUsersMDB.forEach((user) => {
    const userName = document.createElement('li');
    const userScore = document.createElement('li');

    userName.textContent = user.name;
    userScore.textContent = user.score;

    userName.classList.add('record-table-name');
    userScore.classList.add('record-table-score');

    recordTableNamesDOM.appendChild(userName);
    recordTableScoreDOM.appendChild(userScore);
  });
}

export { renerRecordTable };

//first render
renerRecordTable();
