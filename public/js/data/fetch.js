import { disconectHandelr } from './handlers/disconnect.js';

// MDB - mongoDB
let topUsersMDB = null;
disconectHandelr(true);

function fetchGetUsers() {
  return fetch('http://localhost:3000/users', {
    method: 'GET', // HTTP-метод GET для получения данных
    headers: {
      'Content-Type': 'application/json', // set content type like JSON
    },
  })
    .then((response) => {
      if (!response.ok) {
        disconectHandelr(true);
        throw new Error('Network response was not ok');
      }
      disconectHandelr(false);
      return response.json(); // parsing to JSON
    })
    .then((users) => {
      topUsersMDB = users;
    })
    .catch((error) => {
      console.error('Error: S E R V E R: GET all users: ' + error);
    });
}

function fetchAddUser(newUser) {
  return fetch('http://localhost:3000/newUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      return response.json();
    })
    .then((user) => {
      console.log(`S E R V E R: POST new user: ${user.name}`);
    })
    .catch((error) => {
      console.error('Error: S E R V E R: POST new user: ' + error);
    });
}

function fetchRemoveUser(userId) {
  return fetch(`http://localhost:3000/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error('Error: S E R V E R: DELETE: ' + error);
    });
}

export { topUsersMDB, fetchGetUsers, fetchAddUser, fetchRemoveUser };
