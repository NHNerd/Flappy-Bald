import { recordTableNamesDOM, recordTableScoreDOM } from './DOM.js';
import { topUsersMDB, fetchGetUsers, fetchRemoveUser } from './data/fetch.js';
import { updateUser } from './data/handlers/addUser.js';

async function renerRecordTable(score) {
  // Remove old DOM elements
  recordTableNamesDOM.innerHTML = '';
  recordTableScoreDOM.innerHTML = '';

  // Get users
  await fetchGetUsers();

  const lastElement = topUsersMDB[topUsersMDB.length - 1];
  const userId = lastElement._id;

  if (score > lastElement.score || (topUsersMDB.length != 10 && score > 0)) {
    // Add user with new record scoreq
    await updateUser(score);

    // Get users
    await fetchGetUsers();

    if (topUsersMDB.length > 10) {
      // Remove user from DB with min score
      await fetchRemoveUser(userId);

      // Get users
      await fetchGetUsers();
    }
  }

  // render
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
